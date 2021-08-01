import datetime

from mongoengine import *
import json




# class Recipes(Document):
#     from Modules.Users import Users
#     name = StringField(required=True, unique=True)
#     user_id = ReferenceField(Users, reverse_delete_rule=CASCADE)
#     image = StringField(required=True)
#     description = StringField(required=True)
#     views = IntField(required=True)
#     date = StringField(required=True, default=datetime.utcnow()) #x.strftime("%d-%m-%Y") export the date from this
#     level = StringField(required=True)
#     Servings = IntField(required=True)
#     prepTimeMins = IntField(required=True)
#     CookingTime = IntField(required=True)
#     isPrivate = IntField(required=True)
#     allCategories = ListField(StringField(max_length=90))
#     alldiets = ListField(StringField(max_length=90))
#     allIngredients = ListField(StringField(max_length=90))
#

# first = Recipes(
#     name= "Fluffy Pancakes",
#     user_id = "61029ea591aa709eb19c49bd",
#     image = "http://localhost:3100/images/1626942524010.jpg",
#     description = "mashu mashu",
#     views = 0,
#     date = "10.10.20",
#     level = "easy",
#     Servings = 10,
#     prepTimeMins = 10,
#     CookingTime = 10,
#     isPrivate = 0,
#     allCategories = ["6102ae3f6b352fe8e03130c0","6102ae3f6b352fe8e03130c1"],
#     alldiets = ["6102af5cf67276dfaf81a837","6102af80f67276dfaf81a838"],
#     allIngredients = ["6102b073f67276dfaf81a83a","6102b093f67276dfaf81a83b"])