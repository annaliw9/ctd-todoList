import { useEffect, useReducer } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList/TodoList";
import SortBy from "../../shared/SortBy";
import useDebounce from "../../utils/useDebounce";
import FilterInput from "../../shared/FilterInput";
import {
  initialTodoState,
  todoReducer,
  TODO_ACTIONS,
} from "../../reducers/todoReducer";

function TodosPage({ token }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    todoList,
    error,
    filterError,
    isTodoListLoading,
    sortBy,
    sortDirection,
    filterTerm,
    dataVersion,
  } = state;

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  // const invalidateCache = useCallback(() => {
  //   setDataVersion((prev) => prev + 1);
  //   // console.log("Invalidating memo cache after todo mutation");
  // }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      // setIsTodoListLoading(true);
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
        };

        //if debouncedFilterTerm has a value, add the find property to the object:
        if (debouncedFilterTerm) paramsObject.find = debouncedFilterTerm;

        const params = new URLSearchParams(paramsObject);
        // const resp = await fetch(`/api/tasks?${params}`, options);
        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });
        const todos = await response.json();
        // const todos = data.taks;
        // console.log("sortBy:", sortBy);
        // console.log("sortDirection:", sortDirection);
        // console.log("API response:", todos);
        console.log("RENDER STATE:", {
          sortBy,
          sortDirection,
          todoList,
        });

        if (response.status === 401) {
          throw new Error("unauthorized");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        dispatch({ type: TODO_ACTIONS.FETCH_SUCCESS, payload: todos.tasks });
        // setTodoList(data.tasks);
        // setFilterError("");
        // console.log("AFTER FETCH SUCCESS:", todos.tasks);
      } catch (error) {
        // if (
        //   debouncedFilterTerm ||
        //   sortBy !== "createdAt" ||
        //   sortDirection !== "desc"
        // ) {
        //   setFilterError(`Error filtering/sorting todos: ${error.message}`);
        // } else {
        //   setError(`Error fetching todos: ${error.message}`);
        // }
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: error.message,
            isFiltering:
              debouncedFilterTerm ||
              sortBy !== "createdAt" ||
              sortDirection !== "desc",
          },
        });
      }
      // finally {
      //   // setIsTodoListLoading(false);
      // }
    };
    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  const addTodo = async (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    // setTodoList((previous) => [newTodo, ...previous]);
    dispatch({ type: TODO_ACTIONS.ADD_TODO_START, payload: newTodo });

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: newTodo.title,
          isCompleted: newTodo.isCompleted,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const savedTodo = await response.json();

      // setTodoList((previous) =>
      //   previous.map((todo) => (todo.id === newTodo.id ? savedTodo : todo)),
      // );
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: newTodo.id,
          savedTodo,
        },
      });
      // invalidateCache();
    } catch (error) {
      // setTodoList((previous) =>
      //   previous.filter((todo) => todo.id !== newTodo.id),
      // );
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: newTodo.id,
          error: error.message,
        },
      });

      // setError(error.message);
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    // setTodoList((prev) =>
    //   prev.map((todo) =>
    //     todo.id === id ? { ...todo, isCompleted: true } : todo,
    //   ),
    // );

    dispatch({ type: TODO_ACTIONS.COMPLETE_TODO_START, payload: { id } });

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          isCompleted: true,
        }),
      });
      // invalidateCache();

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: {
          id,
        },
      });
    } catch (error) {
      // setTodoList((prev) =>
      //   prev.map((todo) => (todo.id === id ? originalTodo : todo)),
      // );
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          error: error.message,
        },
      });

      // setError(error.message);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    // setTodoList((prev) =>
    //   prev.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo)),
    // );
    dispatch({ type: TODO_ACTIONS.UPDATE_TODO_START, payload: { editedTodo } });

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token,
        },
        credentials: "include",
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
        }),
      });
      // invalidateCache();
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: { id: editedTodo.id },
      });
    } catch (error) {
      // setTodoList((previous) =>
      //   previous.map((todo) =>
      //     todo.id === editedTodo.id ? originalTodo : todo,
      //   ),
      // );

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          id: editedTodo.id,
          originalTodo,
          error: error.message,
        },
      });

      // setError(error.message);
    }
  };

  const handleFilterChange = (newTerm) => {
    // setFilterTerm(newTerm);
    dispatch({ type: TODO_ACTIONS.SET_FILTER, payload: newTerm });
  };

  const handleReset = () => {
    // setFilterTerm("");
    // setSortBy("createdAt");
    // setSortDirection("desc");
    // setFilterError("");
    dispatch({ type: TODO_ACTIONS.RESET_FILTERS });
  };

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          {/* <button type="button" onClick={() => setError("")}> */}
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
          >
            Clear Error
          </button>
        </div>
      )}
      {filterError && (
        <div>
          <p>{filterError}</p>
          {/* <button type="button" onClick={() => setFilterError("")}> */}
          <button
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_FILTER_ERROR })}
          >
            Clear Filter Error
          </button>
          <button type="button" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      )}
      {isTodoListLoading && <p>Loading todos...</p>}
      <SortBy
        sortBy={sortBy}
        sortDirection={sortDirection}
        // onSortByChange={setSortBy}
        onSortByChange={(newSortBy) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: { sortBy: newSortBy, sortDirection },
          })
        }
        // onSortDirectionChange={setSortDirection}
        onSortDirectionChange={(newSortDirection) =>
          dispatch({
            type: TODO_ACTIONS.SET_SORT,
            payload: {
              sortBy,
              sortDirection: newSortDirection,
            },
          })
        }
      />
      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        dataVersion={dataVersion}
      />
    </div>
  );
}

export default TodosPage;
