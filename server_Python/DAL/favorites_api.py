import json

from Database.classes import Users, Recipes


def get_favorites_id_lst(_user_id):
    recipes_id = [{"recipeID": recipe} for recipe in Users.objects(id=_user_id).first().my_favorites]
    return recipes_id


def get_favorites(_user_id):
    user = Users.objects(id=_user_id).get()
    recipes = [Recipes.objects(id=recipe_id, isPrivate=0).first().data() for recipe_id in user.my_favorites]
    return recipes


def delete_return_update_lst(user_id, recipe_id):
    Users.objects(id=user_id).update(pull__my_favorites=recipe_id)
    recipes = [Recipes.objects(id=recipe_id).first().data()
               for recipe_id in Users.objects(id=user_id).first().my_favorites]
    return recipes


def add_recipe_to_user_favorites(user_id, recipe_id):
    Users.objects(id=user_id).update(add_to_set__my_favorites=recipe_id)
    recipes_id = [{"recipeID": recipe} for recipe in Users.objects(id=user_id).first().my_favorites]
    return recipes_id


def delete_and_return_update_lst(user_id, recipe_id):
    Users.objects(id=user_id).update(pull__my_favorites=recipe_id)
    recipes_id = [{"recipeID": recipe} for recipe in Users.objects(id=user_id).first().my_favorites]
    return recipes_id