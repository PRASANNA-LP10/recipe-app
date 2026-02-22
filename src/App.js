import { useEffect, useState } from "react";
import RecipeTable from "./components/RecipeTable";
import RecipeDrawer from "./components/RecipeDrawer";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import "./App.css";

/* 🔴 IMPORTANT: backend base URL */
const API_BASE = "http://127.0.0.1:5000";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 🔁 Fetch recipes when page or limit changes */
  useEffect(() => {
    fetchRecipes();
  }, [page, limit]);

  /* 📥 Get paginated recipes */
  async function fetchRecipes() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE}/api/recipes?page=${page}&limit=${limit}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await res.json();
      setRecipes(data.data || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error(err);
      setError("Unable to load recipes");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  /* 🔍 Search recipes */
  async function searchRecipes(filters) {
    setLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams(filters).toString();
      const res = await fetch(
        `${API_BASE}/api/recipes/search?${query}`
      );

      if (!res.ok) {
        throw new Error("Search failed");
      }

      const data = await res.json();
      setRecipes(data.data || []);
      setTotal(data.data?.length || 0);
      setPage(1); // reset page after search
    } catch (err) {
      console.error(err);
      setError("Search failed");
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <h1>🍽 Recipe Explorer</h1>

      {/* Filters */}
      <Filters onSearch={searchRecipes} />

      {/* Loading */}
      {loading && <div className="loading">Loading recipes...</div>}

      {/* Error */}
      {error && <div className="error">{error}</div>}

      {/* Table / Empty State */}
      {!loading && recipes.length === 0 ? (
        <div className="empty">No recipes found</div>
      ) : (
        <RecipeTable recipes={recipes} onSelect={setSelected} />
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        limit={limit}
        total={total}
        setPage={setPage}
        setLimit={setLimit}
      />

      {/* Drawer */}
      {selected && (
        <RecipeDrawer
          recipe={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}