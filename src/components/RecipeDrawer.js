export default function RecipeDrawer({ recipe, onClose }) {
  return (
    <div className="drawer">
      <div className="drawer-header">
        <h2>{recipe.title}</h2>
        <span>{recipe.cuisine}</span>
        <button onClick={onClose}>✕</button>
      </div>

      <p><b>Description:</b> {recipe.description}</p>

      <details>
        <summary>Total Time: {recipe.total_time} mins</summary>
        <p>Prep Time: {recipe.prep_time}</p>
        <p>Cook Time: {recipe.cook_time}</p>
      </details>

      <h3>Nutrition</h3>
      <table className="nutrition">
        {Object.entries(recipe.nutrients || {}).map(([k, v]) => (
          <tr key={k}>
            <td>{k}</td>
            <td>{v}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}
