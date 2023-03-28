from mysql.connector import connect, Error
import os
from nanoid import generate
import json
import math
import time
from dotenv import load_dotenv

def get_password():
    load_dotenv()
    return os.environ['SQL_PASSWORD']

def check_if_email_exists(email, connection):
    query = f"SELECT * FROM users WHERE email = '{email}'"
    print(query)
    with connection.cursor() as cursor:
        cursor.execute(query)
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
                query = f"SELECT * FROM users WHERE userId = '{userId}'"
            else:
                query = f"SELECT * FROM users WHERE email = '{email}' AND encryptedPassword = '{password}'"
            with connection.cursor() as cursor:
                cursor.execute(query)
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

def check_for_activity(userId, date, group, connection):
    string_date = date.strftime('%Y-%m-%d')
    print(date.strftime('%Y-%m-%d'))
    print(type(string_date))
    query = f"SELECT * FROM activities WHERE userId = '{userId}' AND activityDate='{date.strftime('%Y-%m-%d')}' AND groupName='{group}'"
    with connection.cursor() as cursor:
        cursor.execute(query)
        result = cursor.fetchall()
        print(result)
        if len(result) > 0:
            return True
    return False
    
def db_add_activity(userId, name, date, group, description):
    # add to db
    # activity id?
    try:
        with connect(
            host='localhost',
            user='root',
            password = get_password(),
            database='Achieve'
        ) as connection:
            if check_for_activity(userId, date, group, connection):
                return 'You have already logged an achievement for this date!'
            query = """INSERT INTO activities
                (userId, activityName, activityDate, groupName, activityDescription)
                VALUES (%s, %s, %s, %s, %s)"""
            val_tuple = (userId, name, date.strftime('%Y-%m-%d'), group, description)
            with connection.cursor() as cursor:
                cursor.execute(query, val_tuple)
                connection.commit()
                return 'success'

    except Error as e:
        print(e)


if __name__ == "__main__":
    print(check_login('scottandermann@gmail.com', '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8', 'dmk8kGtYv3U2VAig9QGU-'))
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
