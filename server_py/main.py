from flask import Flask
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'content-type'


@app.route('/MostRecipes')
def get_most_recipes():
    res = requests.get("http://localhost:3100/information/MostRecipes")
    return json.dumps(res.json())

@app.route('/getMyRecipes/<id>')
def hello_user(id):
    res = requests.get(f"http://localhost:3100/recipes/myRecipes/{id}")
    return json.dumps(res.json())

app.run(debug=True)