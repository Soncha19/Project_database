from waitress import serve
from routes import app
from flask import Flask


if __name__ == '__main__':
    app.run(debug=True)
    serve(app)
