import re


def validationFun(input):
    validationObj = {
        "email": '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$',
        "password": "[\S]{2}",
        "firstName": "[\w]{2}",
        "lastName": "[\w]{2}",
    }

    for k in input:
        if k in ValidationObj:
            pat = re.compile(input[k])

            # searching regex
            mat = re.search(pat, ValidationObj[k])

            # validating conditions
            if mat:
                print("Password is valid.")
            else:
                print("Password invalid !!")

