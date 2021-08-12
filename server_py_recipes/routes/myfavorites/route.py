import json
from flask import Blueprint
from DAL.favorites_api import get_favorites, get_favorites_id_lst, delete_return_update_lst, \
    add_recipe_to_user_favorites, delete_and_return_update_lst
from utils.decorators import validate_cookie

myfavorites = Blueprint('myfavorites', __name__)


@myfavorites.route("/recipes/MyFavorites/ids/<_user_id>")
@validate_cookie
def favorites_recipes_ids(_user_id):
    response = get_favorites_id_lst(_user_id)
    return json.dumps(response, default=str)


@myfavorites.route('/recipes/MyFavorites/<_user_id>')
@validate_cookie
def my_favorites_recipes(_user_id):
    response = get_favorites(_user_id)
    return json.dumps(response, default=str)


@myfavorites.route('/recipes/MyFavorites/<user_id>/<recipe_id>', methods=["DELETE"])
@validate_cookie
def new_favorites_recipes_list(user_id, recipe_id):
    response = delete_return_update_lst(user_id, recipe_id)
    return json.dumps(response, default=str)


@myfavorites.route('/recipes/MyFavorites/<user_id>/<recipe_id>', methods=["PUT"])
@validate_cookie
def add_to_favorites_list(user_id, recipe_id):
    response = add_recipe_to_user_favorites(user_id, recipe_id)
    return json.dumps(response, default=str)


@myfavorites.route("/recipes/MyFavorites/ids/<user_id>/<recipe_id>", methods=["DELETE"])
@validate_cookie
def delete_from_favorites_list(user_id, recipe_id):
    response = delete_and_return_update_lst(user_id, recipe_id)
    return json.dumps(response, default=str)
