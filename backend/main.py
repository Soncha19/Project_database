from waitress import serve
from routes import app


if __name__ == '__main__':
    app.run(debug=True)
    serve(app)
