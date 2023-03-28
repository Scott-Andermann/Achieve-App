from flask import Flask, request
from flask_cors import cross_origin
import json
from nanoid import generate
from db_functions import add_user, check_login, db_add_activity
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
    if request.method == 'POST':
        data = json.loads(request.data)
        print(data)
        email = data['email']
        password = data['password']
        userId = data['userId']
        response = check_login(email, password, userId)
        print(response)
        return response
    
    return 'POST request required', 400
    # response_body = 
    # return response_body

@app.route('/add_activity', methods=['POST'])
@cross_origin()
def add_activity():
    if request.method == 'POST':
        data = json.loads(request.data)
        # print(data)
        date = datetime.strptime(data['date'], '%m/%d/%Y').date()
        description = data['description']
        group = data['group']
        name = data['name']
        userId = data['userId']
        response = db_add_activity(userId, name, date, group, description)
        print(response)
        if response == 'success':
            response_body = {
                "status": "success",
            }
        else:
            response_body = {
                "status": "failed",
                "message": response
            }
    
    return response_body