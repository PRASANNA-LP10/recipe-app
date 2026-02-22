export default function RecipeTable({ recipes, onSelect }) {
  return (
    <div className="recipe-cards">
      {recipes.map((r) => (
        <div
          key={r.id}
          className="recipe-card"
          onClick={() => onSelect(r)}
        >
          <h3 className="card-title" title={r.title}>
            {r.title}
          </h3>

          <p className="card-cuisine">{r.cuisine}</p>

          <div className="card-rating">
            <Stars value={r.rating} />
            <span className="rating-value">
              {r.rating ? r.rating.toFixed(1) : "N/A"}
            </span>
          </div>

          <div className="card-footer">
            <span>⏱ {r.total_time} mins</span>
            <span>🍽 {r.serves}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Stars({ value = 0 }) {
  const stars = Math.round(value);
  return (
    <span className="stars">
      {"★".repeat(stars)}
      {"☆".repeat(5 - stars)}
    </span>
  );
}

