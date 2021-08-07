

def return_organize_list(obj, db):
    new_lst = []
    for element in obj:
        temp = db(id=element).get()
        # print("temp", temp.name)
        new_lst.append(temp.name)
        # print(new_lst)
    return new_lst


def return_organize_ings_list(obj, units_db, ings_db):
    new_lst = []

    for element in obj:
        quantity, unit_id, ing_id = element
        unit = units_db(id=unit_id).get().name
        ing = ings_db(id=ing_id).get().name

        result = f"{quantity} {unit} {ing}"
        new_lst.append(result)
        # print(result)
    return new_lst


def return_only_ings(obj, db):
    new_lst = []
    for element in obj:
        temp = db(id=element[2]).get()
        # print("temp", temp.name)
        new_lst.append(temp.name)
        # print(new_lst)
    return new_lst


def organize_ings_for_db(arr):
    new_lst = [[el["quantity"], el["unit"]["id"], el["ingredient"]["id"]] for el in arr]
    return new_lst


def ingredients_for_client(ingredients, unit_db, ings_db):
    def get_name(db,item_id):
        item_name = db(id=item_id).only("name").first()
        return item_name.name

    new_lst = [{"quantity": el[0],
                "unit": {
                    "id": el[1],
                    "name": get_name(unit_db, el[1])
                },
                "ingredient": {
                    "id": el[2],
                    "name": get_name(ings_db, el[2])
                }
                } for el in ingredients]
    print("new_lst", new_lst)
    return new_lst


def organizedIngredients(ingredients):
    new_lst = [[el["quantity"], el["unit"], el["ingredient"]] for el in ingredients]
    print("ings fix-", new_lst)
    return new_lst