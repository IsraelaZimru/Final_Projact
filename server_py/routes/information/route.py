import json
import requests
from flask import Blueprint
from Modules.classes import Diets, Categories, Ingredients, Measuring_Units, Recipes

information = Blueprint('information', __name__)


@information.route('/information')
def get_diets_cats():
    diets = []
    cats = []
    for diet in Diets.objects:
        diets.append({"id": diet.id, "name": diet.name})

    for cat in Categories.objects:
        cats.append({"id": cat.id, "name": cat.name})

    return json.dumps([diets, cats], default=str)


@information.route('/information/MostRecipes')
def get_most_recipes():
    # res = requests.get("http://localhost:3100/information/MostRecipes")
    quickest = [{"id": str(recipe.id), "name": recipe.name, "image": recipe.image, "CookingTime": recipe.CookingTime}
                for recipe in Recipes.objects.order_by('+CookingTime')[:5]]
    popular = [{"id": str(recipe.id), "name": recipe.name, "image": recipe.image, "views": recipe.views} for recipe in Recipes.objects.order_by('-views')[:1]]
    recent = [{"id": str(recipe.id), "name": recipe.name, "image": recipe.image, "date": recipe.date} for recipe in Recipes.objects.order_by('-date')[:1]]
    # print("quickest", [quickest])
    return json.dumps([quickest,recent, popular], default=str)
    # return json.dumps(res.json())


@information.route('/ingredientsName')
def get_ings():
    ings = []
    for ing in Ingredients.objects:
        ings.append({"id": ing.id, "name": ing.name})
    return json.dumps(ings, default=str)


@information.route('/information/unitsAndIngs')
def get_unitsAndIngs():
    ings = []
    units = []
    for ing in Ingredients.objects:
        ings.append({"id": ing.id, "name": ing.name})

    for unit in Measuring_Units.objects:
        units.append({"id": unit.id, "name": unit.name})

    return json.dumps([ings, units], default=str)


@information.route('/information/RecipeNameAvailable/<_name>')
def is_recipe_name_available(_name):
    if Recipes.objects(name=_name):
        name_exist = Recipes.objects(name=_name).get()
        print("name:", name_exist.name, True)
        return json.dumps(False), 200
    print(False)
    return json.dumps(True), 200


@information.route('/recipeNames')
def only_recipe_names():
    names = [{"id": str(recipe.id), "name": recipe.name} for recipe in Recipes.objects]
    return json.dumps(names), 200
