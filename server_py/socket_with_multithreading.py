import socket
import json
from concurrent.futures.thread import ThreadPoolExecutor

HOST = '192.168.3.149'
PORT = 2021  # Port to listen on (non-privileged ports are > 1023)
SERVER_PORT = 2000
SERVER_ADDRESS = '192.168.0.114'


def sender(name_from_ip):
    ip_from_name = {}
    while True:
        command = input('''Enter 'update' or '<name>: <massage>': ''')
        if command == 'update':
            request = {
                'command': 'list'
            }
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
                s.bind((HOST, 0))
                s.sendto(json.dumps(request).encode(), (SERVER_ADDRESS, SERVER_PORT))
                data = s.recv(1000)
                name_from_ip.update(json.loads(data.decode()))
                ip_from_name = {v: k for (k,v) in name_from_ip.items()}
                print(*list(ip_from_name.keys()), sep=', ')
                continue

        if len(command.split(':')) < 2:
            print('Invalid command')
            continue
        tokens = command.split(':')
        name = tokens[0]
        message = ':'.join(tokens[1:]).strip()
        if name not in ip_from_name:
            print(f'Error: {name} does not exist')
            continue
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.bind((HOST, 0))
            s.sendto(message.encode(), (ip_from_name[name], PORT))


def receiver(name_from_ip):
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.bind((HOST, PORT))
        while True:
            data, addr = s.recvfrom(1000)
            name = name_from_ip.get(addr[0], addr[0])
            print(f'{name}: {data.decode()}')



def main():
    name_from_ip = {}
    with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
        s.bind((HOST, 0))
        request = {
            'command': 'register',
            'name': 'Israela'
        }
        s.sendto(json.dumps(request).encode(), (SERVER_ADDRESS, SERVER_PORT))
        pool = ThreadPoolExecutor(2)
        t2 = pool.submit(sender, name_from_ip)
        t1 = pool.submit(receiver, name_from_ip)
        t1.result()
        t2.result()


if __name__ == '__main__':
    main()

