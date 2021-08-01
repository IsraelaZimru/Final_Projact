from flask import Flask, request, jsonify, abort
from flask_cors import CORS
# from flask_restplus import abort
import requests
import json
import os
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
# import pymongo
from mongoengine import *
from Modules.classes import *
from datetime import datetime






# creating server
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'content-type'



# auth and hash password
auth = HTTPBasicAuth()
#users = {
#    "john": generate_password_hash("hello"), #Encrypt a password. revesre-> check_password_hash(users.get(username))
#    "susan": generate_password_hash("bye")
#}



@auth.verify_password
# def verify_password(username, password):
#     if username in users and \
#             check_password_hash(users.get(username), password):
#         return username
def verify_password(user_email, password):
    print("inputs", user_email, password)
    if Users.objects(email=user_email):
        user = Users.objects(email=user_email).get()
        if check_password_hash(user.password, password):
            return user



@app.route('/')
@auth.login_required
def index():
    user = auth.current_user()
    print("user-", user)
    return "Hello, {}!".format(auth.current_user())



@app.route('/users/login', methods=['POST'])
def login():
    try:
        info = request.get_json() #making it as dictionary
        _email = info["email"]
        _password = info["password"]
        # print("info", info["email)
        if Users.objects(email=_email):
            user = Users.objects(email=_email).get()
            if check_password_hash(user.password, _password):
                return user.json()
            else:
                return {
                           "error": "incorrect password"
                       }, 403
        else:
            return {
                       "error": 'user not exist'
                   }, 403

    except Exception as e:
        return {"error": "user not found"}, 400

    # return auth.current_user().json()
    # return "lalala"




@app.route('/MostRecipes')
def get_most_recipes():
    res = requests.get("http://localhost:3100/information/MostRecipes")
    return json.dumps(res.json())

@app.route('/getMyRecipes/<id>')
def hello_user(id):
    res = requests.get(f"http://localhost:3100/recipes/myRecipes/{id}")
    return json.dumps(res.json())


app.run(debug=True)