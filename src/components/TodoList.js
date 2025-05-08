import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTodo } from "./contexts/TodoContext";

function TodoList({ todo }) {
  const { onToggleItem, onStartEdit, onDeleteItem } = useTodo();

  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-1 flex-grow">
        <input
          type="checkbox"
          id={`todo-item-${todo.id}`}
          checked={todo.isDone}
          onChange={() => onToggleItem(todo.id)}
          className={`accent-green-400 w-4 cursor-pointer`}
        />{" "}
        <label
          htmlFor={`todo-item-${todo.id}`}
          className={`${
            todo.isDone ? "line-through text-gray-400" : ""
          } text-lg flex-grow`}
        >
          {todo.name}
        </label>
      </div>
      <div className="space-x-1">
        <button
          onClick={() => {
            onStartEdit(todo.id, todo.name);
          }}
          className="px-2 border rounded-md bg-blue-400 hover:bg-blue-500 active:bg-blue-600 hover:border-blue-600"
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <button
          onClick={() => onDeleteItem(todo.id)}
          className="px-2.5 border rounded-md bg-red-400 hover:bg-red-500 active:bg-red-600 hover:border-red-600"
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </button>
      </div>
    </div>
  );
}

export default TodoList;
