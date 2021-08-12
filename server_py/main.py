from flask import Flask
from flask_cors import CORS
from routes.favorites.route import favorites
from routes.information.route import information
from routes.recipes.route import pythonrecipe
from routes.users.route import usersRecipes


def create_app():
    app = Flask(__name__, static_url_path="", static_folder="public")
    CORS(app, supports_credentials=True)
    app.config['CORS_HEADERS'] = 'content-type'
    app.register_blueprint(favorites)
    app.register_blueprint(information)

    # app.register_blueprint(pythonrecipe)
    # app.register_blueprint(usersRecipes)
    return app


create_app().run()
