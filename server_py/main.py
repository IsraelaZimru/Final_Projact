from flask import Flask
from flask_cors import CORS
import requests
import json
import os
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash


auth = HTTPBasicAuth()
users = {
    "john": generate_password_hash("hello"),
    "susan": generate_password_hash("bye")
}


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'content-type'

@auth.verify_password
def verify_password(username, password):
    if username in users and \
            check_password_hash(users.get(username), password):
        return username

@app.route('/')
@auth.login_required
def index():
    return "Hello, {}!".format(auth.current_user())


@app.route('/MostRecipes')
def get_most_recipes():
    res = requests.get("http://localhost:3100/information/MostRecipes")
    return json.dumps(res.json())

@app.route('/getMyRecipes/<id>')
def hello_user(id):
    res = requests.get(f"http://localhost:3100/recipes/myRecipes/{id}")
    return json.dumps(res.json())


app.run(debug=True)