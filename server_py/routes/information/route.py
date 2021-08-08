import json
from flask import Blueprint
from DAL.information_api import organize_diets_cats, most_recipes, units_and_ings, is_available
from Modules.classes import Ingredients, Recipes

information = Blueprint('information', __name__)


@information.route('/information')
def get_diets_cats():
    response = organize_diets_cats()
    return json.dumps(response, default=str)


@information.route('/information/MostRecipes')
def get_most_recipes():
    response = most_recipes()
    return json.dumps(response, default=str)


@information.route('/information/unitsAndIngs')
def get_units_and_ings():
    response = units_and_ings()
    return json.dumps(response, default=str)


@information.route('/information/RecipeNameAvailable/<_name>')
def is_recipe_name_available(_name):
    response = is_available(_name)
    return response


@information.route('/recipeNames')
def only_recipe_names():
    names = [{"id": str(recipe.id), "name": recipe.name} for recipe in Recipes.objects(isPrivate=0)]
    return json.dumps(names), 200


@information.route('/ingredientsName')
def get_ings():
    ings = [{"id": ing.id, "name": ing.name} for ing in Ingredients.objects]
    return json.dumps(ings, default=str)
