import styles from "./FormField.module.css";

function FilterInput({ filterTerm, onFilterChange }) {
  return (
    <div className={styles.field}>
      <label htmlFor="filterInput" className={styles.label}>
        Search todos
      </label>

      <input
        className={styles.input}
        id="filterInput"
        type="text"
        value={filterTerm}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="Search by title..."
        maxLength={100}
      />
    </div>
  );
}

export default FilterInput;
