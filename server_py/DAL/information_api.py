import json

from Database.classes import Diets, Categories, Recipes, Ingredients, Measuring_Units


def organize_diets_cats():
    diets = []
    cats = []
    for diet in Diets.objects:
        diets.append({"id": diet.id, "name": diet.name})

    for cat in Categories.objects:
        cats.append({"id": cat.id, "name": cat.name})
    return [diets, cats]


def most_recipes():
    quickest = [{"id": str(recipe.id), "name": recipe.name, "image": recipe.image, "CookingTime": recipe.CookingTime}
                for recipe in Recipes.objects(isPrivate=0).order_by('+CookingTime')[:5]]
    popular = [{"id": str(recipe.id), "name": recipe.name, "image": recipe.image, "views": recipe.views} for recipe in
               Recipes.objects(isPrivate=0).order_by('-views')[:1]]
    recent = [{"id": str(recipe.id), "name": recipe.name, "image": recipe.image, "date": recipe.date} for recipe in
              Recipes.objects(isPrivate=0).order_by('-date')[:1]]
    return [quickest, recent, popular]

def units_and_ings():
    ings = []
    units = []
    for ing in Ingredients.objects:
        ings.append({"id": ing.id, "name": ing.name})

    for unit in Measuring_Units.objects:
        units.append({"id": unit.id, "name": unit.name})
    return [ings, units]


def is_available(_name):
    if Recipes.objects(name__iexact=_name):
        name_exist = Recipes.objects(name__iexact=_name).get()
        print("name:", name_exist.name, True)
        return json.dumps(False), 200
    print(False)
    return json.dumps(True), 200
