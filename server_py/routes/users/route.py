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
                       }, 401
        else:
            return {
                       "error": 'user not exist'
                   }, 401

    except Exception as e:
        return {"error": "user not found"}, 400


@users.route('/recipes/MyRecipes/<_id>')
def my_recipes(_id):
    # res = requests.get(f"http://localhost:3100/recipes/myRecipes/{id}")
    # print("enter fun", _id)
    recipes = Recipes.objects(user_id=_id)
    # print("recipes", recipes)
    filter_data = [{"id": str(recipe.id), "image": recipe.image, "name": recipe.name} for recipe in recipes]
    return json.dumps(filter_data)
