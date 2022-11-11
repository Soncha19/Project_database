from waitress import serve
from flask import Flask
from flask_jwt_extended import JWTManager

app = Flask(__name__)
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = "procadd"
with app.app_context():
    import routes

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
    serve(app)
