import { useSearchParams } from "react-router";
import { useEffect, useReducer } from "react";
import StatusFilter from "../shared/StatusFilter";
import TodoForm from "../features/Todos/TodoForm";
import TodoList from "../features/Todos/TodoList/TodoList";
import SortBy from "../shared/SortBy";
import useDebounce from "../utils/useDebounce";
import FilterInput from "../shared/FilterInput";
import {
  initialTodoState,
  todoReducer,
  TODO_ACTIONS,
} from "../reducers/todoReducer";
import { useAuth } from "../contexts/AuthContext";
import styles from "./TodosPage.module.css";

function TodosPage() {
  const { token } = useAuth();

  const [searchParams] = useSearchParams();

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

  const statusFilter = searchParams.get("status") || "all";

  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: TODO_ACTIONS.FETCH_START });

      try {
        const paramsObject = {
          sortBy,
          sortDirection,
          limit: 50,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 401) {
          throw new Error("unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        dispatch({
          type: TODO_ACTIONS.FETCH_SUCCESS,
          payload: { todos: data.tasks },
        });
      } catch (error) {
        dispatch({
          type: TODO_ACTIONS.FETCH_ERROR,
          payload: {
            message: error.message,
            isFilterError:
              debouncedFilterTerm ||
              sortBy !== "createdAt" ||
              sortDirection !== "asc",
          },
        });
      }
    };

    fetchTodos();
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  const addTodo = async (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    dispatch({
      type: TODO_ACTIONS.ADD_TODO_START,
      payload: newTodo,
    });

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

      dispatch({
        type: TODO_ACTIONS.ADD_TODO_SUCCESS,
        payload: {
          tempId: newTodo.id,
          savedTodo,
        },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.ADD_TODO_ERROR,
        payload: {
          tempId: newTodo.id,
          error: error.message,
        },
      });
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    dispatch({
      type: TODO_ACTIONS.COMPLETE_TODO_START,
      payload: { id },
    });

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

      if (!response.ok) {
        throw new Error("Failed to complete todo");
      }

      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_SUCCESS,
        payload: { id },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.COMPLETE_TODO_ERROR,
        payload: {
          id,
          originalTodo,
          error: error.message,
        },
      });
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    dispatch({
      type: TODO_ACTIONS.UPDATE_TODO_START,
      payload: { editedTodo },
    });

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

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_SUCCESS,
        payload: { id: editedTodo.id },
      });
    } catch (error) {
      dispatch({
        type: TODO_ACTIONS.UPDATE_TODO_ERROR,
        payload: {
          id: editedTodo.id,
          originalTodo,
          error: error.message,
        },
      });
    }
  };

  const handleFilterChange = (newTerm) => {
    dispatch({
      type: TODO_ACTIONS.SET_FILTER,
      payload: newTerm,
    });
  };

  const handleReset = () => {
    dispatch({
      type: TODO_ACTIONS.RESET_FILTERS,
    });
  };

  return (
    <div className={styles.todosPage}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Todos</h1>
        </div>
      </header>

      {error && (
        <div className={styles.error} role="alert">
          <p>{error}</p>

          <button
            className={styles.errorButton}
            type="button"
            onClick={() => dispatch({ type: TODO_ACTIONS.CLEAR_ERROR })}
          >
            Clear Error
          </button>
        </div>
      )}

      {filterError && (
        <div className={styles.filterError} role="alert">
          <p>{filterError}</p>

          <div className={styles.errorActions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() =>
                dispatch({
                  type: TODO_ACTIONS.CLEAR_FILTER_ERROR,
                })
              }
            >
              Clear Filter Error
            </button>

            <button
              className={styles.secondaryButton}
              type="button"
              onClick={handleReset}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <section className={styles.controls}>
        <div className={styles.controlHeader}>
          <h2 className={styles.sectionTitle}>Filter & Sort</h2>

          {isTodoListLoading && (
            <span className={styles.loading}>Loading todos...</span>
          )}
        </div>

        <div className={styles.filterRow}>
          <div className={styles.control}>
            <SortBy
              sortBy={sortBy}
              sortDirection={sortDirection}
              onSortByChange={(newSortBy) =>
                dispatch({
                  type: TODO_ACTIONS.SET_SORT,
                  payload: {
                    sortBy: newSortBy,
                    sortDirection,
                  },
                })
              }
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
          </div>

          <div className={styles.control}>
            <StatusFilter />
          </div>

          <div className={styles.search}>
            <FilterInput
              filterTerm={filterTerm}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>
      </section>

      <section className={styles.todoSection}>
        <div className={styles.todoHeader}>
          <h2 className={styles.sectionTitle}>Tasks</h2>
        </div>

        <div className={styles.form}>
          <TodoForm onAddTodo={addTodo} />
        </div>

        <TodoList
          todoList={todoList}
          onCompleteTodo={completeTodo}
          onUpdateTodo={updateTodo}
          dataVersion={dataVersion}
          statusFilter={statusFilter}
        />
      </section>
    </div>
  );
}

export default TodosPage;
