function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div>
      <div>
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div>
        <label htmlFor="order">Order</label>
        <select
          id="order"
          value={sortDirection}
          onChange={(e) => onSortDirectionChange(e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
}

export default SortBy;
