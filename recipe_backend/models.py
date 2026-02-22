from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Recipe(db.Model):
    __tablename__ = "recipes"

    id = db.Column(db.Integer, primary_key=True)
    cuisine = db.Column(db.String(255))
    title = db.Column(db.String(255))
    rating = db.Column(db.Float)
    prep_time = db.Column(db.Integer)
    cook_time = db.Column(db.Integer)
    total_time = db.Column(db.Integer)
    description = db.Column(db.Text)
    nutrients = db.Column(db.JSON)
    serves = db.Column(db.String(100))
