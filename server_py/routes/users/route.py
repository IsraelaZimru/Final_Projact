import json
import requests
from flask import Blueprint, request, jsonify, make_response
from Database.classes import Diets, Categories, Users, Ingredients, Measuring_Units, Recipes
from werkzeug.security import generate_password_hash, check_password_hash


users = Blueprint('users', __name__)


@users.route('/users/login', methods=['POST'])
def login():
    try:
        info = request.get_json()
        _email = info["email"]
        _password = info["password"]
        if Users.objects(email=_email):
            user = Users.objects(email=_email).get()
            if check_password_hash(user.password, _password):
                print("enterrrr")
                res = make_response(json.dumps(user.json(), default=str), 200)
                res.set_cookie("user", json.dumps(user["id"], default=str))
                return res
                # return json.dumps(user.json(), default=str), 200
            else:
                return {
                           "error": "incorrect password"
                       }, 401
        else:
            return {
                       "error": 'user not exist'
                   }, 401

    except Exception as e:
        print(e)
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
            return json.dumps(user.json(), default=str), 200
        return jsonify({"error": "Email address already in use"}), 400
    except Exception as e:
        print(e)
        return json.dumps({"error": "Signup failed"}), 400


@users.route("/users/getUserInfo", methods=['POST'])
def update_user_details():
    try:
        register_data = dict(request.get_json())
        user = Users.objects(id=register_data["id"]).first()
        if user:
            return user.json_for_update(), 200
        return json.dumps({"error": "User not found"}), 400
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
