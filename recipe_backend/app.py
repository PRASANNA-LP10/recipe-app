from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Recipe

app = Flask(__name__)   # 👈 THIS MUST EXIST
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = \
    "postgresql://postgres:Prasanna10@localhost/recipesdb"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

@app.route("/")
def home():
    return "Recipe API Running"


from flask import jsonify, request

@app.route("/api/recipes", methods=["GET"])
def get_recipes():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    offset = (page - 1) * limit

    query = Recipe.query.order_by(Recipe.rating.desc().nullslast())
    total = query.count()

    recipes = query.offset(offset).limit(limit).all()

    return jsonify({
        "page": page,
        "limit": limit,
        "total": total,
        "data": [
            {
                "id": r.id,
                "title": r.title,
                "cuisine": r.cuisine,
                "rating": r.rating,
                "prep_time": r.prep_time,
                "cook_time": r.cook_time,
                "total_time": r.total_time,
                "description": r.description,
                "nutrients": r.nutrients,
                "serves": r.serves
            }
            for r in recipes
        ]
    })






@app.route("/api/recipes/search", methods=["GET"])
def search_recipes():
    query = Recipe.query

    title = request.args.get("title")
    cuisine = request.args.get("cuisine")
    rating = request.args.get("rating")
    total_time = request.args.get("total_time")

    if title:
        query = query.filter(Recipe.title.ilike(f"%{title}%"))

    if cuisine:
        query = query.filter(Recipe.cuisine.ilike(f"%{cuisine}%"))

    if rating:
        query = query.filter(Recipe.rating >= float(rating.replace(">=", "")))

    if total_time:
        query = query.filter(Recipe.total_time <= int(total_time.replace("<=", "")))

    results = query.all()

    return jsonify({
        "data": [
            {
                "id": r.id,
                "title": r.title,
                "cuisine": r.cuisine,
                "rating": r.rating,
                "total_time": r.total_time,
                "nutrients": r.nutrients,
                "serves": r.serves
            }
            for r in results
        ]
    })


if __name__ == "__main__":
    app.run(debug=True)
