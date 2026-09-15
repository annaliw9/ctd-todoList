import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import {
  isValidTodoTitle,
  validateTodoTitle,
} from "../../utils/todoValidation";
import styles from "./TodoForm.module.css";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleTitleChange = (event) => {
    const value = event.target.value;

    setWorkingTodoTitle(value);

    if (validationError) {
      setValidationError("");
    }
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    const error = validateTodoTitle(workingTodoTitle);

    if (error) {
      setValidationError(error);
      return;
    }

    onAddTodo(workingTodoTitle.trim());
    setWorkingTodoTitle("");
    setValidationError("");
  };

  return (
    <form className={styles.form} onSubmit={handleAddTodo} noValidate>
      <div className={styles.inputWrapper}>
        <TextInputWithLabel
          elementId="todoTitle"
          labelText="Todo"
          value={workingTodoTitle}
          onChange={handleTitleChange}
          maxLength={100}
          required
        />

        {validationError && (
          <p className={styles.error} role="alert">
            {validationError}
          </p>
        )}
      </div>

      <button
        className={styles.button}
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
