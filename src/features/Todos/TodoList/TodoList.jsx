import { useMemo } from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList, onCompleteTodo, onUpdateTodo, dataVersion }) {
  const filteredTodos = todoList.filter((todo) => !todo.isCompleted);

  const filteredTodoList = useMemo(() => {
    // console.log(`Recalculating filtered todos (v${dataVersion})`);
    return { version: dataVersion, todos: filteredTodos };
  }, [dataVersion, todoList]);

  return (
    <>
      {filteredTodoList.todos.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        <ul>
          {filteredTodoList.todos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
