import json
from flask import Blueprint, request, make_response
from DAL.users_api import add_new_user, update_user, data_for_update_user, get_my_recipes, login_user, \
    detele_user_cookie
from utils.decorators import validate_cookie

roro = Blueprint('roro', __name__)


@roro.route('/users/login', methods=['POST'])
def login():
    try:
        info = request.get_json()
        response = login_user(info)
        return response
    except Exception as e:
        print(e)
        return {"error": "user not found"}, 400

