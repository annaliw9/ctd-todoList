import { useState } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import { isValidTodoTitle } from "../../utils/todoValidation";

function TodoForm({ onAddTodo }) {
  // const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    // Explore the event object (we'll remove this later)
    // console.log("Event object:", event);
    // console.log("Event target:", event.target);
    // console.log("Input value:", event.target.todoTitle.value);
    onAddTodo(workingTodoTitle);

    // console.log(workingTodoTitle);

    setWorkingTodoTitle("");
  };

  // console.log(workingTodoTitle);

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
      />
      <button type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
