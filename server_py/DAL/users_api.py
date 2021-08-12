import json
from flask import jsonify, make_response
from werkzeug.security import generate_password_hash, check_password_hash

from Database.classes import Users, Recipes


def add_new_user(register_data):
    if not Users.objects(email=register_data["email"]).first():
        user = Users(
            email=register_data["email"],
            first_name=register_data["firstName"],
            last_name=register_data["lastName"],
            password=generate_password_hash(register_data["password"])).save()
        return json.dumps(user.json(), default=str), 200
    return jsonify({"error": "Email address already in use"}), 400


def data_for_update_user(register_data):
    user = Users.objects(id=register_data["id"]).first()
    if user:
        return user.json_for_update(), 200
    return json.dumps({"error": "User not found"}), 400


def update_user(user_data, _id):
    user = Users.objects(id=_id).first()
    if user:
        user.update(
            first_name=user_data["firstName"],
            email=user_data["email"],
            last_name=user_data["lastName"])
        user.reload()
        return json.dumps(user.json(), default=str), 200
    return json.dumps({"error": "Email address already in use"}), 400


def get_my_recipes(_id):
    recipes = Recipes.objects(user_id=_id, isPrivate=0)
    filter_data = [{"id": str(recipe.id), "image": recipe.image, "name": recipe.name} for recipe in recipes]
    return filter_data


def login_user(info):
    _email = info["email"]
    _password = info["password"]
    if Users.objects(email=_email):
        user = Users.objects(email=_email).get()
        if check_password_hash(user.password, _password):
            res = make_response(json.dumps(user.json(), default=str), 200)
            res.set_cookie("user", json.dumps(user["id"], default=str))
            return res
        else:
            return {
                       "error": "incorrect password"
                   }, 401
    else:
        return {
                   "error": 'user not exist'
               }, 401


def detele_user_cookie():
    res = make_response("deleted cookie successfully", 200)
    res.set_cookie("user", "", expires=0)
    print("delete cookie")
    return res

