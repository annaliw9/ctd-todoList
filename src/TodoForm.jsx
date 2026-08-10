import { useState } from "react";

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
      <label htmlFor="todoTitle">Todo</label>
      <input
        type="text"
        id="todoTitle"
        name="todoTitle"
        value={workingTodoTitle}
        placeholder={"Todo text"}
        onChange={(event) => setWorkingTodoTitle(event.target.value)}
        required
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
