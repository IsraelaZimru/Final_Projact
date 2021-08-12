import json
import requests
from flask import Blueprint, request, jsonify, make_response

from DAL.users_api import login_user, data_for_update_user
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
@validate_cookie
def update_user_details():
    try:
        register_data = dict(request.get_json())
        response = data_for_update_user(register_data)
        return response
    except Exception as e:
        print(e)
        return json.dumps({"error": "Problem connecting to server"}), 400


@users.route('/users/<_id>', methods=["PUT"])
def update_details(_id):
    try:
        user_data = dict(request.get_json())
        user = Users.objects(id=_id).first()
        if user:
            user.update(
            first_name=user_data["firstName"],
            email=user_data["email"],
            last_name=user_data["lastName"])
            # return json.dumps([{"id": str(user.id)}]), 200
            user.reload()
            return json.dumps(user.json(), default=str), 200
        return json.dumps({"error": "Email address already in use"}), 400
    except Exception as e:
        print(e)
        return json.dumps({"error": "Problem connecting to server"}), 400


@users.route('/recipes/MyRecipes/<_id>')
def my_recipes(_id):
    recipes = Recipes.objects(user_id=_id, isPrivate=0)
    filter_data = [{"id": str(recipe.id), "image": recipe.image, "name": recipe.name} for recipe in recipes]
    return json.dumps(filter_data), 200
