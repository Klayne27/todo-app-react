import { createContext, useContext, useEffect, useReducer, useState } from "react";

const TodoContext = createContext();

const initialState = {
  todos: [],
  status: "all",
  editingId: null,
  editText: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "addItem":
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload,
        ],
      };
    case "deleteItem":
      return {
        ...state,
        todos: [...state.todos.filter((todo) => todo.id !== action.payload)],
      };
    case "isDone":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case "showAll":
      return { ...state, status: "all" };
    case "showDone":
      return { ...state, status: "done" };
    case "showPending":
      return { ...state, status: "pending" };
    case "startEdit":
      return { ...state, editingId: action.payload.id, editText: action.payload.name };
    case "editChange":
      return { ...state, editText: action.payload };
    case "saveEdit":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === state.editingId ? { ...todo, name: state.editText } : todo
        ),
        editingId: null,
        editText: "",
      };
    case "cancelEdit":
      return { ...state, editingId: null, editText: "" };
    default:
      return state;
  }
}

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localState = localStorage.getItem("todosApp");
    return localState ? JSON.parse(localState) : initialState;
  });

  function handleDeleteItem(id) {
    dispatch({ type: "deleteItem", payload: id });
  }

  function handleToggleItem(id) {
    dispatch({ type: "isDone", payload: id });
  }

  function handleStartEdit(id, name) {
    dispatch({ type: "startEdit", payload: { id, name } });
  }

  function handleEditChange(e) {
    dispatch({ type: "editChange", payload: e.target.value });
  }
  useEffect(() => {
    localStorage.setItem("todosApp", JSON.stringify(state));
  }, [state]);

  const filteredTodos = state.todos.filter((todo) => {
    if (state.status === "all") {
      return true;
    } else if (state.status === "pending") {
      return !todo.isDone;
    } else if (state.status === "done") {
      return todo.isDone;
    }
    return true;
  });

  return (
    <TodoContext.Provider
      value={{
        filteredTodos,
        todos: state.todos,
        isEditing: state.editingId,
        editValue: state.editText,
        onDeleteItem: handleDeleteItem,
        onToggleItem: handleToggleItem,
        onStartEdit: handleStartEdit,
        onEditChange: handleEditChange,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) throw new Error("Error lol");
  return context;
}

export { useTodo, TodoProvider };
