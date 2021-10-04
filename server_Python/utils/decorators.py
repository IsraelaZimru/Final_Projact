import json

from flask import request


def validate_cookie(func):
    def wrapper(*args, **kwargs):
        cookies = request.cookies
        data = cookies.get("user")
        print("data", data, "request -cookies", request.cookies)
        if data:
            print("it worksss")
            return func(*args, **kwargs)
        else:
            print("not work")
            return json.dumps({"error": "details are incorrect"}), 401

    return wrapper