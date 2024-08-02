from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_pyfile('config.py')
    CORS(app)

    from app.routes import register_routes
    register_routes(app)

    return app
