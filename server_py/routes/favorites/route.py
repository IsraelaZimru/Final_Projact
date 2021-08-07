import json
import os
from datetime import time
from werkzeug.utils import secure_filename
import requests
from flask import Blueprint, request
from Modules.classes import Diets, Categories, Ingredients, Measuring_Units, Recipes, Users
from utils.helper_functions import organize_ings_for_db

favorites = Blueprint('favorites', __name__)


@favorites.route("/recipes/MyFavorites/ids/<_user_id>")
def favorites_recipes_ids(_user_id):
    recipes_id = [{"recipeID": recipe} for recipe in Users.objects(id=_user_id).first().my_favorites]
    # print(recipes_id)
    return json.dumps(recipes_id, default=str)


@favorites.route('/recipes/MyFavorites/<_user_id>')
def my_favorites_recipes(_user_id):
    user = Users.objects(id=_user_id).get()
    recipes = [Recipes.objects(id=recipe_id, isPrivate=0).first().data() for recipe_id in user.my_favorites]
    return json.dumps(recipes, default=str)


@favorites.route('/recipes/MyFavorites/<user_id>/<recipe_id>', methods=["DELETE"])
def new_favorites_recipes(user_id, recipe_id):
    Users.objects(id=user_id).update(pull__my_favorites=recipe_id)
    recipes = [Recipes.objects(id=recipe_id).first().data()
               for recipe_id in Users.objects(id=user_id).first().my_favorites]
    return json.dumps(recipes, default=str)


@favorites.route('/recipes/MyFavorites/<user_id>/<recipe_id>', methods=["PUT"])
def add_to_favorites_list(user_id, recipe_id):
    Users.objects(id=user_id).update(add_to_set__my_favorites=recipe_id)
    recipes_id = [{"recipeID": recipe} for recipe in Users.objects(id=user_id).first().my_favorites]
    return json.dumps(recipes_id, default=str)


@favorites.route("/recipes/MyFavorites/ids/<user_id>/<recipe_id>", methods=["DELETE"])
def delete_from_favorites_list(user_id, recipe_id):
    Users.objects(id=user_id).update(pull__my_favorites=recipe_id)
    recipes_id = [{"recipeID": recipe} for recipe in Users.objects(id=user_id).first().my_favorites]
    return json.dumps(recipes_id, default=str)
