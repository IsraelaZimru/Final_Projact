from datetime import datetime
from mongoengine import *
import json
import os
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash

connect(host="mongodb+srv://IsraelaZimru:7qGPRky0r5lbdUir@cluster0.zr2d0.mongodb.net/RecipesFullstack")

class Users(Document):
    # from Modules.Recipes import Recipes
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    email = StringField(required=True, unique=True)
    my_favorites = ListField()
    is_admin = IntField(required=True)

    def json(self):
        user_dict = {
            "name": self.first_name,
            "id": self.id,
            "email": self.email
        }
        print("id-", self.id)
        return json.dumps(user_dict, default=str)

    meta = {  # help with searching faster in mongodb
        "indexes": ["email"],
        "ordering": ["-date_created"]
    }


class Recipes(Document):
    # from Modules.Users import Users
    name = StringField(required=True, unique=True)
    user_id = ReferenceField(Users, reverse_delete_rule=CASCADE)
    image = StringField(required=True)
    description = StringField(required=True)
    views = IntField(required=True)
    date = StringField(required=True, default=datetime.utcnow()) #x.strftime("%d-%m-%Y") export the date from this
    level = StringField(required=True)
    Servings = IntField(required=True)
    prepTimeMins = IntField(required=True)
    CookingTime = IntField(required=True)
    isPrivate = IntField(required=True)
    allCategories = ListField(StringField(max_length=90))
    alldiets = ListField(StringField(max_length=90))
    allIngredients = ListField(StringField(max_length=90))


class Measuring_Units(Document):
    name = StringField(required=True, unique=True)

class Ingredients(Document):
    name = StringField(required=True, unique=True)

class Diets(Document):
    name = StringField(required=True, unique=True)

class Categories(Document):
    name = StringField(required=True, unique=True)













# --------------------------------------------------------------
# class Favorites(Document):
#     user_id = ReferenceField(Users, reverse_delete_rule=CASCADE)
#     recipes_id = ReferenceField(Recipes, reverse_delete_rule=CASCADE)

# for user in Users.objects:
#     print(user.first_name)

# syntex to add new data
# ross = Users(email='wawa@wawa.com', first_name='wawa', last_name='wawa',password="123456",is_admin=0).save()
# ross = Users.objects(email='slzimro@example.com').get.save()


# for user in Users.objects:
#     user.update(set__password=generate_password_hash("123456"))
#     print(user.first_name, user.password)
