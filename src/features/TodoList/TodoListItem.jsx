// import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import isValidTodoTitle from "../../utils/todoValidation";
import useEditableTitle from "../../hooks/useEditableTitle";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  // const [isEditing, setIsEditing] = useState(false);
  // const [workingTitle, setWorkingTitle] = useState(todo.title);
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit,
  } = useEditableTitle(todo.title);

  // const handleCancel = () => {
  //   setWorkingTitle(todo.title);
  //   setIsEditing(false);
  // };

  // const handleEdit = (event) => {
  //   setWorkingTitle(event.target.value);
  // };

  // const handleUpdate = (event) => {
  //   if (!isEditing) return;
  //   event.preventDefault();
  //   onUpdateTodo({ ...todo, title: workingTitle });
  //   setIsEditing(false);
  // };

  const handleEdit = (event) => {
    updateTitle(event.target.value);
  };

  const handleCancel = () => {
    cancelEdit();
  };

  const handleUpdate = (event) => {
    if (!isEditing) return;
    event.preventDefault();
    const finalTitle = finishEdit();
    onUpdateTodo({ ...todo, title: finalTitle });
  };

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`todoTitle${todo.id}`}
              labelText="Todo"
              onChange={handleEdit}
              ref={null}
              value={workingTitle}
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            {/* <span onClick={() => setIsEditing(true)}>{todo.title}</span> */}
            <span onClick={startEditing}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
