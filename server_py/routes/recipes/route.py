import json
import os
from datetime import time
from werkzeug.utils import secure_filename
import requests
from flask import Blueprint, request
from Modules.classes import Diets, Categories, Ingredients, Measuring_Units, Recipes
from utils.helper_functions import organize_ings_for_db, organizedIngredients

recipe = Blueprint('recipe', __name__)


@recipe.route('/getMyRecipes/<id>')
def hello_user(id):
    res = requests.get(f"http://localhost:3100/recipes/myRecipes/{id}")
    return json.dumps(res.json())


@recipe.route('/recipes')
def get_all_recipes():
    recipes = []
    for recipe in Recipes.objects:
        recipes.append(recipe.data())
    return json.dumps(recipes, default=str)
    # return recipes


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
        _recipe = info["recipe"]
        _ings = info["ingredients"]
        _insts = info["instructions"]
        print("lllll", _ings)
        new_recipe = Recipes(
            name=_recipe["recipeName"],
            user_id=_recipe["userId"],
            description=_recipe["description"],
            level=_recipe["level"],
            Servings=_recipe["Servings"],
            prepTimeMins=_recipe["prepTimeMins"],
            CookingTime=_recipe["CookingTime"],
            allCategories=_recipe["categories"],
            alldiets=_recipe["diets"],
            allIngredients=organize_ings_for_db(_ings),
            instructions=_insts).save()
        return json.dumps(new_recipe.id, default=str)


    # return {"error": "err"}, 400


# def upload_image(file):
#     filename = str(round(time.time()*1000)) + secure_filename(file.filename)
#     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#     return filename




