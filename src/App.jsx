import "./App.css";

function App() {
  const todoList = [
    { id: 1, title: "Review resources" },
    { id: 2, title: "Take notes" },
    { id: 3, title: "Code out app" },
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList &&
          todoList.map((todo) => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
