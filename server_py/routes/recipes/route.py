import json
from flask import Blueprint, request
from DAL.recipe_api import new_recipe, update_recipe
from Database.classes import Recipes
from utils.helper_functions import upload_image

recipe = Blueprint('recipe', __name__)


@recipe.route('/recipes')
def get_all_recipes():
    recipes = [recipe.data() for recipe in Recipes.objects(isPrivate=0).order_by('-date')]
    return json.dumps(recipes, default=str)


@recipe.route('/recipes/reset', methods=['PUT'])
def reset_recipes():
    for recipe in Recipes.objects(isPrivate=1):
        recipe.update(isPrivate=0)
    return json.dumps("All recipes are visible in the site", default=str)


@recipe.route('/recipeInfo', methods=['POST'])
def get_single_recipe():
    info = request.get_json()
    _id = info["id"]
    recipe = Recipes.objects(id=_id).get().all_data()
    return json.dumps([recipe], default=str)


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
    return json.dumps({'status': "No image attached"})



