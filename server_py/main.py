import time

from flask import Flask, request, jsonify, abort
from flask_cors import CORS
# from flask_restplus import abort
import requests
import json
import os
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
from mongoengine import *
from Modules.classes import Users, Diets, Categories, Ingredients, Recipes, Measuring_Units
from datetime import datetime
# from datetime import time
from werkzeug.utils import secure_filename

from routes.favorites.route import favorites
from routes.information.route import information
from routes.recipes.route import recipe
from routes.users.route import users





# creating server
app = Flask(__name__, static_url_path="", static_folder="public")
CORS(app)
app.config['CORS_HEADERS'] = 'content-type'



UPLOAD_FOLDER = 'public/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


app.register_blueprint(information)
app.register_blueprint(recipe)
app.register_blueprint(users)
app.register_blueprint(favorites)


def upload_image(file):
    filename = str(round(time.time()*1000)) + secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return filename


@app.route('/recipes/upload/<_id>', methods=["POST"])
def load_recipe_image(_id):
    get_image = request.files["image"]
    if get_image:
        get_recipe = Recipes.objects(id=_id).get()
        get_recipe.update(image='images/' + upload_image(get_image))
        return json.dumps(id, default=str)
    return jsonify({'status': "not ok"})


# auth and hash password
auth = HTTPBasicAuth()



























app.run(debug=True)