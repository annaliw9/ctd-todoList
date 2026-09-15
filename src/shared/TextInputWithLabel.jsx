import styles from "./FormField.module.css";

const TextInputWithLabel = ({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  required = false,
  maxLength,
}) => {
  return (
    <div className={styles.field}>
      <label htmlFor={elementId} className={styles.label}>
        {labelText}
        {required && <span className={styles.required}> *</span>}
      </label>

      <input
        className={styles.input}
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
      />
    </div>
  );
};

export default TextInputWithLabel;
