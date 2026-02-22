import { useState } from "react";

export default function Filters({ onSearch }) {
  const [filters, setFilters] = useState({});

  return (
    <div className="filters">
      <input placeholder="Title"
        onChange={e => setFilters({ ...filters, title: e.target.value })} />

      <input placeholder="Cuisine"
        onChange={e => setFilters({ ...filters, cuisine: e.target.value })} />

      <input placeholder="Rating >= 4.5"
        onChange={e => setFilters({ ...filters, rating: e.target.value })} />

      <input placeholder="Calories <= 400"
        onChange={e => setFilters({ ...filters, calories: e.target.value })} />

      <button  className="search-btn" onClick={() => onSearch(filters)}>Search</button>
    </div>
  );
}
