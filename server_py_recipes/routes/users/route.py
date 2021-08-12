import json
from flask import Blueprint, request, make_response
from DAL.users_api import add_new_user, update_user, data_for_update_user, get_my_recipes, login_user, \
    detele_user_cookie
from utils.decorators import validate_cookie

pyusers = Blueprint('pyusers', __name__)


@pyusers.route('/users/login', methods=['POST'])
def login():
    try:
        info = request.get_json()
        response = login_user(info)
        return response
    except Exception as e:
        print(e)
        return {"error": "user not found"}, 400


@pyusers.route('/addUser', methods=['POST'])
def add_user():
    try:
        register_data = dict(request.get_json())
        response = add_new_user(register_data)
        return response
    except Exception as e:
        print(e)
        return json.dumps({"error": "Signup failed"}), 400


@pyusers.route("/users/getUserInfo", methods=['POST'])
@validate_cookie
def update_user_details():
    try:
        register_data = dict(request.get_json())
        response = data_for_update_user(register_data)
        return response
    except Exception as e:
        print(e)
        return json.dumps({"error": "Problem connecting to server"}), 400


@pyusers.route('/users/<_id>', methods=["PUT"])
@validate_cookie
def update_details(_id):
    try:
        user_data = dict(request.get_json())
        response = update_user(user_data, _id)
        return response
    except Exception as e:
        print(e)
        return json.dumps({"error": "Problem connecting to server"}), 400


@pyusers.route('/recipes/MyRecipes/<_id>')
def my_recipes(_id):
    response = get_my_recipes(_id)
    return json.dumps(response), 200


@pyusers.route('/users/logout')
def logout():
    response = detele_user_cookie()
    return response

