import json
from flask import Blueprint
from DAL.favorites_api import get_favorites_id_lst, get_favorites, delete_return_update_lst, \
    add_recipe_to_user_favorites, delete_and_return_update_lst
from utils.decorators import validate_cookie

favorites = Blueprint('favorites', __name__)


@favorites.route("/recipes/MyFavorites/ids/<_user_id>")
# @validate_cookie
def favorites_recipes_ids(_user_id):
    response = get_favorites_id_lst(_user_id)
    return json.dumps(response, default=str)


@favorites.route('/recipes/MyFavorites/<_user_id>')
def my_favorites_recipes(_user_id):
    response = get_favorites(_user_id)
    return json.dumps(response, default=str)


@favorites.route('/recipes/MyFavorites/<user_id>/<recipe_id>', methods=["DELETE"])
def new_favorites_recipes_list(user_id, recipe_id):
    response = delete_return_update_lst(user_id, recipe_id)
    return json.dumps(response, default=str)


@favorites.route('/recipes/MyFavorites/<user_id>/<recipe_id>', methods=["PUT"])
def add_to_favorites_list(user_id, recipe_id):
    response = add_recipe_to_user_favorites(user_id, recipe_id)
    return json.dumps(response, default=str)


@favorites.route("/recipes/MyFavorites/ids/<user_id>/<recipe_id>", methods=["DELETE"])
def delete_from_favorites_list(user_id, recipe_id):
    response = delete_and_return_update_lst(user_id, recipe_id)
    return json.dumps(response, default=str)