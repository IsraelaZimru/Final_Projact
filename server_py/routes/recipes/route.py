import json
from flask import Blueprint, request
from DAL.recipe_api import new_recipe, update_recipe, all_recipes, recipe_details, hide, add_image_to_recipe
from Database.classes import Recipes
from utils.decorators import validate_cookie

recipe = Blueprint('recipe', __name__)


@recipe.route('/recipeInfo/unSeenRecipe/<_id>', methods=['PUT'])
def hide_recipe(_id):
    response = hide(_id)
    return response


@recipe.route('/recipes')
def get_all_recipes():
    response = all_recipes()
    return json.dumps(response, default=str)


@recipe.route('/recipeInfo', methods=['POST'])
def get_single_recipe():
    info = request.get_json()
    response = recipe_details(info)
    return json.dumps(response, default=str)


@recipe.route('/recipeInfo/<_id>', methods=["GET", "PUT"])
def recipe_raw_data(_id):
    if request.method == 'GET':
        result = Recipes.objects(id=_id).first().raw_data_for_update()
        return result
    elif request.method == 'PUT':
        info = request.get_json()
        response = update_recipe(info, _id)
        return json.dumps(response, default=str)


@recipe.route('/addNewRecipe', methods=['POST'])
@validate_cookie
def add_recipe():
        info = request.get_json()
        response = new_recipe(info)
        return json.dumps(response, default=str)


@recipe.route('/recipes/upload/<_id>', methods=["POST"])
def load_recipe_image(_id):
    get_image = request.files["image"]
    response = add_image_to_recipe(_id, get_image)
    return json.dumps(response, default=str)


@recipe.route('/recipes/reset', methods=['PUT'])
def reset_recipes():
    for recipe in Recipes.objects(isPrivate=1):
        recipe.update(isPrivate=0)
    return json.dumps("All recipes are visible in the site", default=str)

