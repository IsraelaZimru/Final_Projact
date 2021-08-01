# from datetime import datetime
# from mongoengine import *
# import json
# import os
# from flask_httpauth import HTTPBasicAuth
# from werkzeug.security import generate_password_hash, check_password_hash
#
# connect(host="mongodb+srv://IsraelaZimru:7qGPRky0r5lbdUir@cluster0.zr2d0.mongodb.net/RecipesFullstack")
#
#
# class Users(Document):
#     from Modules.Recipes import Recipes
#     first_name = StringField(required=True)
#     last_name = StringField(required=True)
#     password = StringField(required=True)
#     email = StringField(required=True, unique=True)
#     my_favorites = ListField(ReferenceField(Recipes, reverse_delete_rule=CASCADE))
#     is_admin = IntField(required=True)
#
#     def json(self):
#         user_dict = {
#             "name": self.first_name,
#             "id": self.id,
#             "email": self.email
#         }
#         print("id-", self.id)
#         return json.dumps(user_dict, default=str)
#
#     meta = {  # help with searching faster in mongodb
#         "indexes": ["email"],
#         "ordering": ["-date_created"]
#     }
#
#
# # class Favorites(Document):
# #     user_id = ReferenceField(Users, reverse_delete_rule=CASCADE)
# #     recipes_id = ReferenceField(Recipes, reverse_delete_rule=CASCADE)
#
# # for user in Users.objects:
# #     print(user.first_name)
#
# # syntex to add new data
# # ross = Users(email='wawa@wawa.com', first_name='wawa', last_name='wawa',password="123456",is_admin=0).save()
# # ross = Users.objects(email='slzimro@example.com').get.save()
#
#
# # for user in Users.objects:
# #     user.update(set__password=generate_password_hash("123456"))
# #     print(user.first_name, user.password)
