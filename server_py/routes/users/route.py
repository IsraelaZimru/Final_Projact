import json
import requests
from flask import Blueprint, request, jsonify, make_response
from DAL.users_api import login_user, data_for_update_user, update_user, add_new_user, get_my_recipes, \
    detele_user_cookie
from Database.classes import Diets, Categories, Users, Ingredients, Measuring_Units, Recipes
from werkzeug.security import generate_password_hash, check_password_hash
from utils.decorators import validate_cookie

users = Blueprint('users', __name__)


@users.route('/users/login', methods=['POST'])
def login():
    try:
        info = request.get_json()
        response = login_user(info)
        return response
    except Exception as e:
        print(e)
        return {"error": "user not found"}, 400


@users.route('/addUser', methods=['POST'])
def add_user():
    try:
        register_data = dict(request.get_json())
        response = add_new_user(register_data)
        return response
    except Exception as e:
        print(e)
        return json.dumps({"error": "Signup failed"}), 400


@users.route("/users/getUserInfo", methods=['POST'])
# @validate_cookie
def update_user_details():
    try:
        register_data = dict(request.get_json())
        response = data_for_update_user(register_data)
        return response
    except Exception as e:
        print(e)
        return json.dumps({"error": "Problem connecting to server"}), 400


@users.route('/users/<_id>', methods=["PUT"])
@validate_cookie
def update_details(_id):
    try:
        user_data = dict(request.get_json())
        response = update_user(user_data, _id)
        return response
    except Exception as e:
        print(e)
        return json.dumps({"error": "Problem connecting to server"}), 400


@users.route('/recipes/MyRecipes/<_id>')
def my_recipes(_id):
    response = get_my_recipes(_id)
    return json.dumps(response), 200


@users.route('/users/logout')
def logout():
    response = detele_user_cookie()
    return response

