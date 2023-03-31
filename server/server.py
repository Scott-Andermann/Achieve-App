from flask import Flask, request
from flask_cors import cross_origin
import json
from nanoid import generate
from db_functions import add_user, check_login, db_add_activity, db_points_in_last_week, db_get_stats
from datetime import datetime


app = Flask(__name__)

@app.route('/')
@cross_origin()
def home():
    response_body = {
        "name": "Scott Andermann",
        "about": "It's working so far! need to set up env variables"
    }
    return response_body

@app.route('/signup', methods=['POST'])
@cross_origin()
def signup():
    print('ping works')
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        email = data['email']
        password = data['password']
        first_name = data['firstName']
        last_name = data['lastName']
        location = data['location']
        userId = generate()
        # add user information to database
        response = add_user(first_name, last_name, userId, email, password, location)
        if response == 'success':
            response_body = {
                "status": "success",
                "userId": userId
                } 
        else:
            response_body = {
                "status": "failed",
                "error": response
            }

    return response_body

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    print('LOGGING IN')
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        email = data['email']
        password = data['password']
        userId = data['userId']
        response = check_login(email, password, userId)
        print(response)
        return response
    
    # return 'POST request required', 400
    # response_body = 
    # return response_body

@app.route('/add_activity', methods=['POST'])
@cross_origin()
def add_activity():
    if request.method == 'POST':
        data = json.loads(request.data)
        # print(data)
        activityDate = datetime.strptime(data['date'], '%m/%d/%Y').date()
        description = data['description']
        group = data['group']
        name = data['name']
        userId = data['userId']
        response = db_add_activity(userId, name, activityDate, group, description)
        # print(response)
        # if response['status'] == 'success':
        #     response_body = {
        #         "status": "success",
        #         "message": response['message']
        #     }
        # else:
        #     response_body = {
        #         "status": "failed",
        #         "message": response['message']
        #     }
    
        return response
    
@app.route('/leaderboard')
@cross_origin()
def leaderboard():
    response_data = db_points_in_last_week()
    return {
        "status": "ok",
        "data": response_data
    }

@app.route('/current_stats')
@cross_origin()
def curren_stats():
    args = request.args
    print(args['userId'])
    user_id = args['userId']
    streak, total_points = db_get_stats(user_id)

    return {"status": "success", "streak": streak, "totalPoints": total_points}