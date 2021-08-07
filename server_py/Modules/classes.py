from datetime import datetime
from mongoengine import *
import json
import os
from flask_httpauth import HTTPBasicAuth
from werkzeug.security import generate_password_hash, check_password_hash
from utils.helper_functions import return_organize_list, return_organize_ings_list, return_only_ings, \
    organizedIngredients, ingredients_for_client

UPLOAD_FOLDER = 'public/images'

# connect(host="mongodb+srv://IsraelaZimru:7qGPRky0r5lbdUir@cluster0.zr2d0.mongodb.net/RecipesFullstack") #old connection
connect(host="mongodb+srv://IsraelaZimru:W54mqTlPB7pfmiet@fullstackprojects.epp4t.mongodb.net/FullstackProjects")


class Users(Document):
    # from Modules.Recipes import Recipes
    first_name = StringField(required=True)
    last_name = StringField(required=True)
    password = StringField(required=True)
    email = StringField(required=True, unique=True)
    my_favorites = ListField()
    is_admin = IntField(required=True, default=0)

    def json(self):
        user_dict = {
            "name": self.first_name,
            "id": self.id,
            "email": self.email,
        }
        # print("id-", self.id)
        return json.dumps(user_dict, default=str)

    def json_for_update(self):
        user_dict = {
            "firstName": self.first_name,
            "lastName": self.last_name,
            "id": self.id,
            "email": self.email,
        }
        # print("id-", self.id)
        return json.dumps([user_dict], default=str)


    meta = {  # help with searching faster in mongodb
        "indexes": ["email"],
        "ordering": ["-date_created"]
    }


class Recipes(Document):
    # from Modules.Users import Users
    name = StringField(required=True, unique=True)
    user_id = ReferenceField(Users, reverse_delete_rule=CASCADE)
    image = StringField()
    description = StringField(required=True)
    views = IntField(required=True, default=0)
    date = StringField(required=True, default=str(datetime.utcnow()))
    level = StringField(choices=['easy', 'medium', 'hard'])
    Servings = IntField(required=True)
    prepTimeMins = IntField(required=True)
    CookingTime = IntField(required=True)
    isPrivate = IntField(required=True, default=0)
    instructions = ListField(StringField(max_length=900))
    allCategories = ListField(StringField(max_length=90))
    alldiets = ListField(StringField(max_length=90))
    allIngredients = ListField()

    def json(self):
        recipe_dict = {
            "name": self.name,
            # "user_id": str(self.user_id),
            "user_id": self.user_id,
            "image": self.image,
            "description": self.description,
            "views": self.views,
            "date": self.date,
            "level": self.level,
            "Servings": self.Servings,
            "prepTimeMins": self.prepTimeMins,
            "CookingTime": self.CookingTime,
            "isPrivate": self.isPrivate,
            "instructions": self.instructions,
            "allCategories": self.allCategories,
            "alldiets": self.alldiets,
            "allIngredients": self.allIngredients
        }
        return json.dumps(recipe_dict, default=str)
        # return recipe_dict

    def data(self):
        cats = return_organize_list(self.allCategories, Categories.objects)
        ings = return_only_ings(self.allIngredients, Ingredients.objects)
        diets = return_organize_list(self.alldiets, Diets.objects)

        recipe_dict = {
            "id": str(self.id),
            "name": self.name,
            "userID": self.user_id,
            "image": self.image,
            "description": self.description,
            "views": self.views,
            "CookingTime": self.CookingTime,
            "isPrivate": self.isPrivate,
            "allCategories": cats,
            "alldiets": diets,
            "allIngredients": ings
        }
        return recipe_dict

    def all_data(self):
        cats = return_organize_list(self.allCategories, Categories.objects)
        ings = return_organize_ings_list(self.allIngredients, Measuring_Units.objects, Ingredients.objects)
        diets = return_organize_list(self.alldiets, Diets.objects)
        recipe_user = Users.objects(id=str(self.user_id.id)).get()
        new_views = self.views + 1
        self.update(views=new_views)
        recipe_dict = {
            "id": str(self.id),
            "name": self.name,
            "username": recipe_user.first_name,
            "description": self.description,
            "userID": str(self.user_id.id),
            "image": self.image,
            "instructions": self.instructions,
            "views": self.views+1,
            "date": "-".join(self.date.split(" ")[0].split("-")[::-1]),
            "level": self.level,
            "Servings": self.Servings,
            "prepTimeMins": self.prepTimeMins,
            "CookingTime": self.CookingTime,
            "isPrivate": self.isPrivate,
            "categories": cats,
            "diets": diets,
            "ingredients": ings
        }
        # print("self.date", self.date, type(self.date))
        return recipe_dict

    def raw_data_for_update(self):
        step1 = {
            "id": str(self.id),
            "userId": str(self.user_id.id),
            "recipeName": self.name,
            "description": self.description,
            "level": self.level,
            "Servings": self.Servings,
            "prepTimeMins": self.prepTimeMins,
            "CookingTime": self.CookingTime,
            "categories": self.allCategories,
            "diets": self.alldiets
        }
        step2 = ingredients_for_client(self.allIngredients, Measuring_Units.objects, Ingredients.objects);
        step3 = self.instructions
        return json.dumps([step1, step2, step3])


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
# rona = Users(email='lala@lala.com', first_name='lala', last_name='lala', password=generate_password_hash("123456"),is_admin=1).save()
# ross = Users.objects(email='slzimro@example.com').get.save()

# rona = Users.objects(email='lala@lala.com').first()
# rona.update(password=generate_password_hash("123456"))
# print("rona.password", rona.password)

# for user in Users.objects:
#     user.update(set__password=generate_password_hash("123456"))
#     print(user.first_name, user.password)
