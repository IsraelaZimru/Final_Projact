#/recipes/MyFavorites/

import json
import os
from datetime import time
from werkzeug.utils import secure_filename
import requests
from flask import Blueprint, request
from Modules.classes import Diets, Categories, Ingredients, Measuring_Units, Recipes
from utils.helper_functions import organize_ings_for_db

favorites = Blueprint('favorites', __name__)


# @favorites.route('/recipes/MyRecipes/<_id>')
# def my_recipes(_id):
#     # res = requests.get(f"http://localhost:3100/recipes/myRecipes/{id}")
#     print("enter fun", _id)
#     recipes = Recipes.objects(user_id=_id)
#     print("recipes", recipes)
#     filter_data = [{"id": str(recipe.id), "image": recipe.image, "name": recipe.name} for recipe in recipes]
#     return json.dumps(filter_data)
