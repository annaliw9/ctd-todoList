import { useState } from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel";
import {
  isValidTodoTitle,
  validateTodoTitle,
} from "../../../utils/todoValidation";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);
  const [validationError, setValidationError] = useState("");

  const handleCancel = () => {
    setWorkingTitle(todo.title);
    setValidationError("");
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setWorkingTitle(event.target.value);

    if (validationError) {
      setValidationError("");
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const error = validateTodoTitle(workingTitle);

    if (error) {
      setValidationError(error);
      return;
    }

    onUpdateTodo({
      ...todo,
      title: workingTitle.trim(),
    });

    setValidationError("");
    setIsEditing(false);
  };

  return (
    <li className={styles.item}>
      <form className={styles.form} onSubmit={handleUpdate}>
        {isEditing ? (
          <div className={styles.editMode}>
            <div className={styles.inputWrapper}>
              <TextInputWithLabel
                elementId={`todoTitle${todo.id}`}
                labelText="Todo"
                onChange={handleEdit}
                ref={null}
                value={workingTitle}
                maxLength={100}
                required
              />

              {validationError && (
                <p className={styles.error} role="alert">
                  {validationError}
                </p>
              )}
            </div>

            <div className={styles.actions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                className={styles.updateButton}
                type="submit"
                disabled={!isValidTodoTitle(workingTitle)}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.todoContent}>
            <label
              className={styles.checkboxLabel}
              htmlFor={`checkbox${todo.id}`}
            >
              <input
                className={styles.checkbox}
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>

            <span
              className={`${styles.title} ${
                todo.isCompleted ? styles.completed : ""
              }`}
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
          </div>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
