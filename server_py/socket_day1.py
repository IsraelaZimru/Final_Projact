# from socket import socket, AF_INET, SOCK_DGRAM
# import json
# # (SERVER, PORT) = ('127.0.0.1', 9999)
# s = socket(AF_INET, SOCK_DGRAM)
# #s.bind(("192.168.3.149", 0))
# server = ('192.168.0.114', 2000)
# data = {"command": "list"}
# # message = bytes("Israela is hereeeee")
# s.connect(server)
# s.send(json.dumps(data).encode())
# result = s.recvfrom(1024)
#
#
# print("recive",result)
#
#










import requests

print(requests.get("http://127.0.0.1:5000/Israelaa").text)

# mongoengine connection
# connect(host="mongodb+srv://IsraelaZimru:7qGPRky0r5lbdUir@cluster0.zr2d0.mongodb.net/RecipesFullstack")

#pymongo conection - still using?
# client = pymongo.MongoClient("mongodb+srv://IsraelaZimru:2ljt01MzCOyzGwpW@cluster0.zr2d0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
# mydb = client["RecipesFullstack"]

print(datetime.utcnow())

for user in Users.objects:
    print(user.first_name)
