import json
import requests
from flask import Blueprint, request, jsonify
from Modules.classes import Diets, Categories, Users, Ingredients, Measuring_Units, Recipes
from werkzeug.security import generate_password_hash, check_password_hash


users = Blueprint('users', __name__)


@users.route('/users/login', methods=['POST'])
def login():
    try:
        info = request.get_json()
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
                       }, 401
        else:
            return {
                       "error": 'user not exist'
                   }, 401

    except Exception as e:
        return {"error": "user not found"}, 400


@users.route('/addUser', methods=['POST'])
def add_user():
    try:
        register_data = dict(request.get_json())
        if not Users.objects(email=register_data["email"]).first():
            user = Users(
                email=register_data["email"],
                first_name=register_data["firstName"],
                last_name=register_data["lastName"],
                password=generate_password_hash(register_data["password"])).save()
            return user.json(), 200
        return jsonify({"error": "Email address already in use"}), 400
    except Exception as e:
        print(e)
        return json.dumps({"error": "Signup failed"}), 400


@users.route('/recipes/MyRecipes/<_id>')
def my_recipes(_id):
    recipes = Recipes.objects(user_id=_id)
    filter_data = [{"id": str(recipe.id), "image": recipe.image, "name": recipe.name} for recipe in recipes]
    return json.dumps(filter_data)
