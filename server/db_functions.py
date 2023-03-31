from mysql.connector import connect, Error
import os
from nanoid import generate
import json
import math
import time
from dotenv import load_dotenv
from datetime import datetime, date, timedelta

def get_password():
    load_dotenv()
    return os.environ['SQL_PASSWORD']

def check_if_email_exists(email, connection):
    query = """SELECT * FROM users WHERE email = %s"""
    val_tuple = [(email)]
    print(query)
    with connection.cursor() as cursor:
        cursor.execute(query, val_tuple)
        result = cursor.fetchall()
        print(result)
        if len(result) > 0:
            return False
    return True

def add_user(first_name, last_name, userId, email, encrypted_password, location):
    try:
        with connect(
            host='localhost',
            user='root',
            password = get_password(),
            database='Achieve'
        ) as connection:
            if check_if_email_exists(email, connection):
                query = """INSERT INTO users
                (firstName, lastName, userId, email, encryptedPassword, location)
                VALUES (%s, %s, %s, %s, %s, %s)"""
                val_tuple = (first_name, last_name, userId, email, encrypted_password, location)
                with connection.cursor() as cursor:
                    cursor.execute(query, val_tuple)
                    connection.commit()
                return 'success'
            return 'An account for that email already exists'
    except Error as e:
        print(e)

def check_login(email, password, userId):
    try:
        with connect(
            host='localhost',
            user='root',
            password = get_password(),
            database='Achieve'
        ) as connection:
            if len(userId) > 0:
                query = """SELECT * FROM users WHERE userId = %s"""
                val_tuple = [(userId)]
            else:
                query = """SELECT * FROM users WHERE email = %s AND encryptedPassword = %s"""
                val_tuple = (email, password)
            with connection.cursor() as cursor:
                cursor.execute(query, val_tuple)
                result = cursor.fetchall()
                if len(result) > 0:
                    response = {
                        "status": "success",
                        "firstName": result[0][0],
                        "lastName": result[0][1],
                        "userId": result[0][2],
                        "email": result[0][3],
                        "password": result[0][4],
                        "location": result[0][5]
                    }
                    return response
                else: 
                    return {
                        "status": "failed",
                        "message": "email and or password is incorrect"
                    }

    except Error as e:
        print(e)

def check_for_activity(userId, today, group, connection):
    string_date = today.strftime('%Y-%m-%d')
    print(today.strftime('%Y-%m-%d'))
    print(type(string_date))
    query = """SELECT * FROM activities WHERE userId = %s AND activityDate=%s AND groupName=%s"""
    val_tuple = (userId, today.strftime('%Y-%m-%d'), group)
    with connection.cursor() as cursor:
        cursor.execute(query, val_tuple)
        result = cursor.fetchall()
        print(result)
        if len(result) > 0:
            return True
    return False
    
def db_add_activity(userId, name, activityDate, group, description):
    # add to db
    # activity id?
    try:
        with connect(
            host='localhost',
            user='root',
            password = get_password(),
            database='Achieve'
        ) as connection:
            if check_for_activity(userId, activityDate, group, connection):
                return {"status": "failed", "message": 'You have already logged an achievement for today!'}
            query = """INSERT INTO activities
                (userId, activityName, activityDate, groupName, activityDescription)
                VALUES (%s, %s, %s, %s, %s)"""
            val_tuple = (userId, name, activityDate.strftime('%Y-%m-%d'), group, description)
            with connection.cursor() as cursor:
                cursor.execute(query, val_tuple)
                connection.commit()
                points, streak = get_activity_points(userId, activityDate, connection)
                return {"status": "success", "message": f"Congrats! You earned {points} points for this achievement! You are on a streak of {streak} days!"}
    except Error as e:
        print(e)

def get_activity_points(userId, activityDate, connection):
    today = date.today()
    print(activityDate)
    twelve_days = activityDate - timedelta(days=12)
    six_days = activityDate - timedelta(days=6)
    query = """SELECT * FROM activities WHERE userId = %s and activityDate > %s and activityDate <= %s ORDER BY activityDate DESC"""
    val_tuple = (userId, twelve_days.strftime('%Y-%m-%d'), activityDate.strftime('%Y-%m-%d'))
    points = 0
    streak = 1
    with connection.cursor() as cursor:
        cursor.execute(query, val_tuple)
        result = cursor.fetchall()
        if len(result) == 0:
            query = """UPDATE activities SET points = %s, streak = %s WHERE userId = %s and activityDate = %s"""
            val_tuple = (points, streak, userId, activityDate.strftime('%Y-%m-%d'))
            cursor.execute(query, val_tuple)
            connection.commit()
            return points, streak
        if result[0][2] == activityDate:
            # print(result)
            if len(result) > 1:
                    
                if result[1][2] == activityDate - timedelta(days=1):
                    # increase streak
                    if result[1][6] == None:
                        streak = 1
                    else: 
                        streak = result[1][6] + 1
            if len(result) >= 8:
                points = 3
            elif len(list(filter(lambda activity: activity[2] > six_days, result))) >= 4:
                points = 1
            query = """UPDATE activities SET points = %s, streak = %s WHERE userId = %s and activityDate = %s"""
            val_tuple = (points, streak, userId, activityDate.strftime('%Y-%m-%d'))
            cursor.execute(query, val_tuple)
            connection.commit()
            # return points
        else: 
            print('no activity ', activityDate)

    # call recursively to update if data is added out of order
    if activityDate != today:
        activityTomorrow = activityDate + timedelta(days=1) 
        get_activity_points(userId, activityTomorrow, connection)
    return points, streak

def db_points_in_last_week():
    try:
        with connect(
                host='localhost',
                user='root',
                password = get_password(),
                database='Achieve'
            ) as connection:
                today = date.today()
                seven_days = today - timedelta(days=7)
                query = """SELECT userId, SUM(points) AS totalPoints, streak FROM activities WHERE activityDate <= %s AND activityDate > %s GROUP BY userId ORDER BY totalPoints DESC LIMIT 10"""
                val_tuple = (today.strftime('%Y-%m-%d'), seven_days.strftime('%Y-%m-%d'))

                with connection.cursor() as cursor:
                    cursor.execute(query, val_tuple)
                    result = cursor.fetchall()
                    userIds = []
                    for item in result:
                        userIds.append(item[0])
                    userIds = tuple(userIds)
                    users = db_get_user_info_batch(userIds, connection)
                    # streaks = db_get_streaks_batch(userIds, connection)
                    print('users ', users)
                    users_with_points = []

                    for item in result:
                        for i, user in enumerate(users):
                            if user[0] in item:
                                print(user)
                                if item[1] == None:
                                    value = 0
                                else: value = item[1]
                                users_with_points.append({"userId": user[0],
                                                          "firstName": user[1],
                                                          "lastName": user[2],
                                                          "location": user[3],
                                                          "points": value,
                                                          "streak": user[4]})
                                break
                    return users_with_points
    except Error as e:
        print(e)

def db_get_user_info_batch(userIds, connection):
    #userIds should be passed as a tuple
    format_strings = ','.join(['%s'] * len(userIds))
    query = """SELECT userId, firstName, lastName, location from users where userId in (%s);"""
    streak_query = """SELECT activities.* from activities, 
                    (SELECT userId, max(activityDate) as activityDate from activities GROUP BY userId) max_user
                    WHERE activities.userId=max_user.userId and activities.activityDate = max_user.activityDate AND activities.userId in (%s)"""
    val_tuple = userIds
    with connection.cursor() as cursor:
        cursor.execute(query % format_strings, val_tuple)
        result = cursor.fetchall()
        cursor.execute(streak_query % format_strings, val_tuple)
        streak_result = cursor.fetchall()
        users_with_streak = []
        for user in result:
            for i, lst in enumerate(streak_result):
                if lst[0] in user:
                    users_with_streak.append((*user, lst[6]))
        return users_with_streak
    


def db_get_stats(user_id):
    today = date.today()
    try:
        with connect(
            host='localhost',
            user='root',
            password = get_password(),
            database='Achieve'
        ) as connection:
            query = """SELECT activityDate, streak, points FROM activities WHERE userId = %s
                        AND activityDate <= %s AND activityDate > %s ORDER BY activityDate DESC"""
            val_tuple = (user_id, today, today-timedelta(days=10))
            # print(query)
            with connection.cursor() as cursor:
                cursor.execute(query, val_tuple)
                result = cursor.fetchall()
                total_points = 0
                if result[0][0] < today - timedelta(days=1):
                    streak = 0
                else: streak = result[0][1]
                # lastDate = result[0][0]
                for item in result:
                    total_points += item[2]
                return streak, total_points

    except Error as e:
        print(e)


if __name__ == "__main__":

    try:
        with connect(
            host='localhost',
            user='root',
            password = get_password(),
            database='Achieve'
        ) as connection:
            userId = 'dmk8kGtYv3U2VAig9QGU-'
            activityDate = date.today() - timedelta(days=12)
            result = db_points_in_last_week()
            print(result)
            # print(result)
            # db_add_activity(userId, 'Test123', activityDate, 'firstGroup', '')
            # print(activityDate)
            # get_activity_points(userId, activityDate, connection)
    except Error as e:
        print(e)

    # print(check_login('scottandermann@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'dmk8kGtYv3U2VAig9QGU-'))
    # print(add_user('Scott', 'Andermann', 'abc123', 'scottandermann@gmail.com', 'password', 'charlotte'))
    # try:
    #     with connect(
    #         host='localhost',
    #         user='root',
    #         password = get_password(),
    #         database='Achieve'
    #     ) as connection:
    #         print(check_if_email_exists('scottandermann@gmail.com', connection))
    # except Error as e:
    #     print(e)
