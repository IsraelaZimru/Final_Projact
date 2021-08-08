from Modules.classes import Recipes
from utils.helper_functions import organize_ings_for_db


def new_recipe(info):
    _recipe = info["recipe"]
    _ings = info["ingredients"]
    _insts = info["instructions"]
    # print("lllll", _ings)
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

