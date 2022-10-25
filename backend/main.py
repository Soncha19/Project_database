from flask import Flask
from flask import request
from waitress import serve
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
    users = [user, user, user]
    return user.toJSON()


@app.route('/api/v1/show')
def show_number():
    return "4", 200


if __name__ == '__main__':
    app.run(debug=True)
    serve(app)
