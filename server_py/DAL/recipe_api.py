import json

from Database.classes import Recipes
from utils.helper_functions import organize_ings_for_db


def all_recipes():
    return [recipe.data() for recipe in Recipes.objects(isPrivate=0).order_by('-date')]


def recipe_details(info):
    _id = info["id"]
    return [Recipes.objects(id=_id).get().all_data()]


def hide(_id):
    print("recipe id:", _id)
    if Recipes.objects(id=_id):
        Recipes.objects(id=_id).update(isPrivate=1)
        return json.dumps(_id), 200
    return json.dumps({"error": "Recipe not found"}), 400


def new_recipe(info):
    _recipe = info["recipe"]
    _ings = info["ingredients"]
    _insts = info["instructions"]
    new_recipe_info = Recipes(
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
    return new_recipe_info.id


def update_recipe(info,_id):
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
    return recipe_to_update.id

