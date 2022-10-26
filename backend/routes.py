from flask import request, Flask
import json

app = Flask(__name__)


class User:
    def __init__(self, name, id):
        self.name = name
        self.id = id


    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__,
                          sort_keys=True, indent=2)


@app.route('/propertySet', methods=['POST', 'GET'])
def hello_world():
    request_data = request.get_json()
    user = User(name=request_data['name'], id=1)
    return user.toJSON()


@app.route('/api/v1/show')
def show_number():
    return "4", 200