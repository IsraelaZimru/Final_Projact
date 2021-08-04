
@auth.verify_password
# def verify_password(username, password):
#     if username in users and \
#             check_password_hash(users.get(username), password):
#         return username
def verify_password(user_email, password):
    print("inputs", user_email, password)
    if Users.objects(email=user_email):
        user = Users.objects(email=user_email).get()
        if check_password_hash(user.password, password):
            return user



@app.route('/')
@auth.login_required
def index():
    user = auth.current_user()
    print("user-", user)
    return "Hello, {}!".format(auth.current_user())


#
# @app.route('/users/login', methods=['POST'])
# def login():
#     try:
#         info = request.get_json() #making it as dictionary
#         _email = info["email"]
#         _password = info["password"]
#         # print("info", info["email)
#         if Users.objects(email=_email):
#             user = Users.objects(email=_email).get()
#             if check_password_hash(user.password, _password):
#                 return user.json()
#             else:
#                 return {
#                            "error": "incorrect password"
#                        }, 403
#         else:
#             return {
#                        "error": 'user not exist'
#                    }, 403
#
#     except Exception as e:
#         return {"error": "user not found"}, 400
#
    # return auth.current_user().json()
    # return "lalala"




# @app.route('/information/MostRecipes')
# def get_most_recipes():
#     res = requests.get("http://localhost:3100/information/MostRecipes")
#     return json.dumps(res.json())

# @app.route('/getMyRecipes/<id>')
# def hello_user(id):
#     res = requests.get(f"http://localhost:3100/recipes/myRecipes/{id}")
#     return json.dumps(res.json())
#


# @app.route('/information')
# def get_diets_cats():
#     diets = []
#     cats = []
#     for diet in Diets.objects:
#         diets.append({"id": diet.id, "name": diet.name})
#
#     for cat in Categories.objects:
#         cats.append({"id": cat.id, "name": cat.name})
#
#     return json.dumps([diets, cats], default=str)


# @app.route('/ingredientsName')
# def get_ings():
#     ings = []
#     for ing in Ingredients.objects:
#         ings.append({"id": ing.id, "name": ing.name})
#     return json.dumps(ings, default=str)
#
# @app.route('/recipes')
# def get_all_recipes():
#     recipes = []
#     for recipe in Recipes.objects:
#         recipes.append(recipe.data())
#     return json.dumps(recipes, default=str)
#     # return recipes
#
#
# @app.route('/recipeInfo', methods=['POST'])
# def get_single_recipe():
#     info = request.get_json()  # making it as dictionary
#     _id = info["id"]
#     recipe = Recipes.objects(id=_id).get().all_data()
#     return json.dumps([recipe], default=str)

# @app.route('/information/unitsAndIngs')
# def get_unitsAndIngs():
#     ings = []
#     units = []
#     for ing in Ingredients.objects:
#         ings.append({"id": ing.id, "name": ing.name})
#
#     for unit in Measuring_Units.objects:
#         units.append({"id": unit.id, "name": unit.name})
#
#     return json.dumps([ings, units], default=str)


# @app.route('/addNewRecipe', methods=['POST'])
# def add_recipe():
#     recipe, ings, insts = request.get_json()
#     print("lllll", recipe, ings, insts)
#     return json.dumps([recipe, ings, insts], default=str)
