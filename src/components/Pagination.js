export default function Pagination({ page, limit, total, setPage, setLimit }) {
  const pages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
      <span>{page} / {pages}</span>
      <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>

      <select value={limit} onChange={e => setLimit(+e.target.value)}>
        {[15, 20, 30, 50].map(v => (
          <option key={v} value={v}>{v}</option>
        ))}
      </select>
    </div>
  );
}
