import json
import math
from app import app
from models import db, Recipe


def clean_number(value):
    if value in ["NaN", None]:
        return None
    try:
        value = float(value)
        return None if math.isnan(value) else value
    except:
        return None


with app.app_context():
    print("Creating tables...")
    db.create_all()

    print("Loading JSON file...")
    with open("recipes.json", "r", encoding="utf-8") as file:
        raw = json.load(file)

    print("Total recipes found:", len(raw))

    count = 0
    for r in raw.values():

        # 🔴 CRITICAL FIX: parse JSON string → dict
        if isinstance(r, str):
            r = json.loads(r)

        recipe = Recipe(
            cuisine=r.get("cuisine"),
            title=r.get("title"),
            rating=clean_number(r.get("rating")),
            prep_time=clean_number(r.get("prep_time")),
            cook_time=clean_number(r.get("cook_time")),
            total_time=clean_number(r.get("total_time")),
            description=r.get("description"),
            nutrients=r.get("nutrients"),
            serves=r.get("serves")
        )

        db.session.add(recipe)
        count += 1

    db.session.commit()
    print(f"{count} recipes inserted successfully")
