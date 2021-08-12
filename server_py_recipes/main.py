from flask import Flask
from flask_cors import CORS
from routes.myfavorites.route import myfavorites
# from routes.information.route import information
# from routes.recipes.route import recipe
from routes.roro.roro import roro
from routes.users.route import pyusers


def create_app():
    app = Flask(__name__, static_url_path="", static_folder="public")
    CORS(app, supports_credentials=True)
    app.config['CORS_HEADERS'] = 'content-type'
    # app.register_blueprint(information)
    # app.register_blueprint(recipe)
    # app.register_blueprint(pyusers)
    app.register_blueprint(myfavorites)
    app.register_blueprint(roro)

    return app


create_app().run()
