from flask import Flask
from flask_cors import CORS
from routes.favorites.route import favorites
from routes.information.route import information
from routes.recipes.route import recipe
from routes.users.route import users


def create_app():
    app = Flask(__name__, static_url_path="", static_folder="public")
    CORS(app, supports_credentials=True)#, resources={
    #     r"/api/*": {"origins": "http://localhost:3000"}})
    app.config['CORS_HEADERS'] = 'content-type'
    app.register_blueprint(information)
    app.register_blueprint(recipe)
    app.register_blueprint(users)
    app.register_blueprint(favorites)
    return app


create_app().run()
