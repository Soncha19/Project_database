from flask import Flask
from waitress import serve
app = Flask(__name__)

@app.route('/api/v1/hello-world-11')
# @app.route('/hello')
def hello_world():  # put application's code here
    return "<h1>Hello world! 11</h1>", 200


# @app.route('/second')
# def hello_world2():  # put application's code here
#     return "<h1>0 You are now in another page</h1>", 500


if __name__ == '__main__':
    app.run(debug=True)
    print("Server")
    serve(app)