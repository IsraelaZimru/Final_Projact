import json
import requests
from flask import Blueprint, request
from Modules.classes import Diets, Categories, Ingredients, Measuring_Units, Recipes

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
    recipe = Recipes.objects(id=_id).get().all_data()
    return json.dumps([recipe], default=str)


@recipe.route('/addNewRecipe', methods=['POST'])
def add_recipe():
    info = request.get_json()
    _recipe = info["recipe"]
    _ings = info["ings"]
    _insts = info["insts"]
    # print("lllll", _recipe, _ings, _insts)
    # return json.dumps([_recipe, _ings, _insts], default=str)
    return {"error": "err"}, 400
