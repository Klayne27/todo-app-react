import { faPencil, faTrashCan, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function List({
  filteredTodos,
  onDeleteItem,
  onToggleItem,
  dispatch,
  todos,
  onStartEdit,
  isEditing,
  editValue,
  onEditChange,
  onSaveEdit,
  onCancelEdit,
}) {
  return (
    <>
      {todos.length > 0 ? (
        <div className="border shadow-md p-6 rounded-xl">
          <div className="flex mb-3 w-[350px] justify-center space-x-3">
            <button
              className="border px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-600 hover:border-gray-600"
              onClick={() => dispatch({ type: "showAll" })}
            >
              ALL
            </button>
            <button
              className="border px-2 py-1 rounded-full bg-green-200 hover:bg-green-300 active:bg-green-400 text-green-600 hover:border-green-600"
              onClick={() => dispatch({ type: "showDone" })}
            >
              DONE
            </button>
            <button
              className="border px-2 py-1 rounded-full bg-yellow-200 hover:bg-yellow-300 active:bg-yellow-400 text-yellow-600 hover:border-yellow-600"
              onClick={() => dispatch({ type: "showPending" })}
            >
              PENDING
            </button>
          </div>

          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <div className="border px-4 py-2 rounded-md w-[355px] mb-2">
                  {isEditing === todo.id ? (
                    <div>
                      <input
                        type="text"
                        value={editValue}
                        onChange={onEditChange}
                        className="px-2 py-1 rounded-md border w-full mb-2"
                      />
                      <div className="flex space-x-1">
                        <button
                          onClick={onSaveEdit}
                          className="px-2.5 border rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600 hover:border-green-600"
                        >
                          <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                          onClick={onCancelEdit}
                          className="px-[11px] border rounded-md bg-gray-400 hover:bg-gray-500 active:bg-gray-600 hover:border-gray-600"
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </div>
                    </div>
                  ) : (
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
                          className={`text-white ${
                            todo.isDone ? "line-through text-gray-400" : ""
                          } text-lg flex-grow `}
                        >
                          {todo.name}
                        </label>
                      </div>
                      <div className="space-x-1">
                        <button
                          onClick={() => onStartEdit(todo.id, todo.name)}
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
                  )}
                </div>
              </li>
            ))}
          </ul>
          {filteredTodos.length === 0 && todos.length > 0 && (
            <p className="text-center">No todos matching the current filter!</p>
          )}
        </div>
      ) : (
        <p className="text-white">No todos yet. Add some!</p>
      )}
    </>
  );
}

export default List;
