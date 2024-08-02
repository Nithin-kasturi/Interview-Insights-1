from flask import Blueprint

# Import and register Blueprints
from .main import main_bp

def register_routes(app):
    app.register_blueprint(main_bp, url_prefix='/api')
