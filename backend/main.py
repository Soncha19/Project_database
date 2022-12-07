from waitress import serve
from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS


app = Flask(__name__)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "procadd"
CORS(app)

with app.app_context():
    import routes

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
    serve(app)
