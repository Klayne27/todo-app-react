import { useEffect, useReducer } from "react";
import Form from "./Form";
import List from "./List";

const initialState = {
  todos: [],
  status: "all",
  editingId: null,
  editText: "",
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const localState = localStorage.getItem("todosApp");
    return localState ? JSON.parse(localState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("todosApp", JSON.stringify(state));
  }, [state]);

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

  function handleSaveEdit() {
    dispatch({ type: "saveEdit" });
  }

  function handleCancelEdit() {
    dispatch({ type: "cancelEdit" });
  }

  function reducer(state, action) {
    switch (action.type) {
      case "addItem":
        return { ...state, todos: [...state.todos, action.payload] };
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
    <div className="flex flex-col items-center">
      <Form dispatch={dispatch} />
      <List
        filteredTodos={filteredTodos}
        dispatch={dispatch}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        todos={state.todos}
        onStartEdit={handleStartEdit}
        isEditing={state.editingId}
        editValue={state.editText}
        onEditChange={handleEditChange}
        onSaveEdit={handleSaveEdit}
        onCancelEdit={handleCancelEdit}
      />
    </div>
  );
}

export default App;
