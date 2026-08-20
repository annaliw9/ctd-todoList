function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div>
      <label htmlFor="todo">Search todos:</label>
      <input
        id="todo"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
      />
    </div>
  );
}

export default FilterInput;
