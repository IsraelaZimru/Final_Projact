

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
        print(result)
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