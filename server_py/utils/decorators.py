import json
from flask import request


def validate_cookie(func):
        def wrapper(*args, **kwargs):
            cookies = request.cookies
            data = cookies.get("user")
            if data:
                return func(*args, **kwargs)
            else:
                return json.dumps({"error": "details are incorrect"}), 401
        return wrapper

