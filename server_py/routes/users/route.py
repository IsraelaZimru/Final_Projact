import json
import requests
from flask import Blueprint, request
from Modules.classes import Diets, Categories, Users, Ingredients, Measuring_Units, Recipes
from werkzeug.security import generate_password_hash, check_password_hash


users = Blueprint('users', __name__)


@users.route('/users/login', methods=['POST'])
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

