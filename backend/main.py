from flask import Flask
from waitress import serve


app = Flask(__name__)


@app.route('/api/v1/hello-world-11')
def hello_world():
    return "<h1>Hello world! 11</h1>", 200


@app.route('/api/v1/show')
def show_number():
    return "4", 200


if __name__ == '__main__':
    app.run(debug=True)
    serve(app)
