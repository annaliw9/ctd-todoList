export const TODO_ACTIONS = {
  // Fetch operations
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  // Add todo operations
  ADD_TODO_START: "ADD_TODO_START",
  ADD_TODO_SUCCESS: "ADD_TODO_SUCCESS",
  ADD_TODO_ERROR: "ADD_TODO_ERROR",

  //Complete todo operations
  COMPLETE_TODO_START: "COMPLETE_TODO_START",
  COMPLETE_TODO_SUCCESS: "COMPLETE_TODO_SUCCESS",
  COMPLETE_TODO_ERROR: "COMPLETE_TODO_ERROR",

  //Update tod0 operations
  UPDATE_TODO_START: "UPDATE_TODO_START",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_ERROR: "UPDATE_TODO_ERROR",

  // Other operations
  SET_SORT: "SET_SORT",
  SET_FILTER: "SET_FILTER",
  CLEAR_ERROR: "CLEAR_ERROR",
  CLEAR_FILTER_ERROR: "CLEAR_FILTER_ERROR",
  RESET_FILTERS: "RESET_FILTERS",
};

export const initialTodoState = {
  todoList: [],
  error: "",
  filterError: "",
  isTodoListLoading: true,
  sortBy: "createdAt",
  sortDirection: "asc",
  filterTerm: "",
  dataVersion: 0,
};

export function todoReducer(state, action) {
  // console.log("Dispatched action:", action.type, action.payload);
  switch (action.type) {
    //FETCH TODO
    case TODO_ACTIONS.FETCH_START:
      return {
        ...state,
        isTodoListLoading: true,
        error: "",
        filterError: "",
      };
    case TODO_ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todos,
        isTodoListLoading: false,
        error: "",
        filterError: "",
        dataVersion: state.dataVersion + 1,
      };
    case TODO_ACTIONS.FETCH_ERROR:
      if (action.payload.isFilterError) {
        return {
          ...state,
          isTodoListLoading: false,
          filterError: `Error filtering/sorting todos: ${action.payload.message}`,
          error: "",
        };
      }
      return {
        ...state,
        isTodoListLoading: false,
        error: `Error fetching todos: ${action.payload.message}`,
        filterError: "",
      };

    //ADD TODO
    //Optimistic
    case TODO_ACTIONS.ADD_TODO_START:
      return {
        ...state,
        todoList: [action.payload, ...state.todoList],
        error: "",
      };
    case TODO_ACTIONS.ADD_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.tempId ? action.payload.savedTodo : todo,
        ),
        error: "",
        dataVersion: state.dataVersion + 1,
      };
    // API failed -> rollback
    case TODO_ACTIONS.ADD_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.tempId,
        ),
        error: action.payload.error,
      };

    //COMPLETE TODO
    //Optimistic
    case TODO_ACTIONS.COMPLETE_TODO_START:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id ? { ...todo, isCompleted: true } : todo,
        ),
        error: "",
      };

    case TODO_ACTIONS.COMPLETE_TODO_SUCCESS:
      return { ...state, error: "", dataVersion: state.dataVersion + 1 };

    // API failed -> rollback
    case TODO_ACTIONS.COMPLETE_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id ? action.payload.originalTodo : todo,
        ),
        error: action.payload.error,
      };

    //UPDATE TODO
    case TODO_ACTIONS.UPDATE_TODO_START:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.editedTodo.id
            ? action.payload.editedTodo
            : todo,
        ),
        error: "",
      };

    case TODO_ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        error: "",
        dataVersion: state.dataVersion + 1,
      };

    // API failed -> rollback
    case TODO_ACTIONS.UPDATE_TODO_ERROR:
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id ? action.payload.originalTodo : todo,
        ),
        error: action.payload.error,
      };

    case TODO_ACTIONS.SET_SORT:
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortDirection: action.payload.sortDirection,
        filterError: "",
      };

    case TODO_ACTIONS.SET_FILTER:
      return {
        ...state,
        filterTerm: action.payload,
        filterError: "",
      };

    case TODO_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: "",
      };

    case TODO_ACTIONS.CLEAR_FILTER_ERROR:
      return {
        ...state,
        filterError: "",
      };

    case TODO_ACTIONS.RESET_FILTERS:
      return {
        ...state,
        sortBy: "createdAt",
        sortDirection: "asc",
        filterTerm: "",
        error: "",
        filterError: "",
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
