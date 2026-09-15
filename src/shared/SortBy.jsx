import formStyles from "./FormField.module.css";
import styles from "./SortBy.module.css";

function SortBy({
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionChange,
}) {
  return (
    <div className={styles.sortBy}>
      <div className={styles.field}>
        <label htmlFor="sort" className={styles.label}>
          Sort by
        </label>

        <select
          id="sort"
          className={formStyles.select}
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
        >
          <option value="createdAt">Created At</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="order" className={styles.label}>
          Order
        </label>

        <select
          id="order"
          className={formStyles.select}
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
