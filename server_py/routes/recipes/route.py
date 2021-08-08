import json
import os
from datetime import time
from werkzeug.utils import secure_filename
import requests
from flask import Blueprint, request

from DAL.recipe_api import new_recipe
from Modules.classes import Diets, Categories, Ingredients, Measuring_Units, Recipes
from utils.helper_functions import organize_ings_for_db, organizedIngredients, upload_image

recipe = Blueprint('recipe', __name__)




@recipe.route('/recipes')
def get_all_recipes():
    recipes = []
    for recipe in Recipes.objects(isPrivate=0).order_by('-date'):
        recipes.append(recipe.data())
    return json.dumps(recipes, default=str)


@recipe.route('/recipes/reset', methods=['PUT'])
def reset_recipes():
    for recipe in Recipes.objects(isPrivate=1):
        recipe.update(isPrivate=0)
    return json.dumps("All recipes are visible in the site", default=str)


@recipe.route('/recipeInfo', methods=['POST'])
def get_single_recipe():
    info = request.get_json()  # making it as dictionary
    _id = info["id"]
    recipe = Recipes.objects(id=_id).get()
    data = recipe.all_data()
    print("new views-", recipe.views)
    return json.dumps([data], default=str)


@recipe.route('/recipeInfo/<_id>', methods=["GET", "PUT"])
def recipe_raw_data(_id):
    if request.method == 'GET':
        recipe_info = Recipes.objects(id=_id).first()
        result = recipe_info.raw_data_for_update()
        return result
    elif request.method == 'PUT':
        print("enter put req")
        info = request.get_json()
        _recipe = info["recipe"]
        _ings = info["ingredients"]
        _insts = info["instructions"]
        recipe_to_update = Recipes.objects(id=_id).first()
        recipe_to_update.update(
            name=_recipe["recipeName"],
            description=_recipe["description"],
            level=_recipe["level"],
            Servings=_recipe["Servings"],
            prepTimeMins=_recipe["prepTimeMins"],
            CookingTime=_recipe["CookingTime"],
            allCategories=_recipe["categories"],
            alldiets=_recipe["diets"],
            allIngredients=organize_ings_for_db(_ings),
            instructions=_insts)
        return json.dumps(recipe_to_update.id, default=str)


@recipe.route('/addNewRecipe', methods=['POST'])
def add_recipe():
        info = request.get_json()
        response = new_recipe(info)
        return json.dumps(response, default=str)


@recipe.route('/recipeInfo/unSeenRecipe/<_id>', methods=['PUT'])
def hide_recipe(_id):
    if Recipes.objects(id=_id):
        Recipes.objects(id=_id).update(isPrivate=1)
        return json.dumps(_id), 200
    return json.dumps({"error": "Recipe not found"}), 400


@recipe.route('/recipes/upload/<_id>', methods=["POST"])
def load_recipe_image(_id):
    get_image = request.files["image"]
    if get_image:
        get_recipe = Recipes.objects(id=_id).get()
        get_recipe.update(image='images/' + upload_image(get_image))
        return json.dumps(id, default=str)
    return json.dumps({'status': "not ok"})



