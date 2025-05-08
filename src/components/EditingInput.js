import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTodo } from "./contexts/TodoContext";

function EditingInput() {
    const {dispatch, editValue, onEditChange} = useTodo()

  return (
    <div>
      <input
        type="text"
        value={editValue}
        onChange={onEditChange}
        className="px-2 py-1 rounded-md border w-full mb-2"
      />
      <div className="flex space-x-1">
        <button
          onClick={() => dispatch({ type: "saveEdit" })}
          className="px-2.5 border rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600 hover:border-green-600"
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
        <button
          onClick={() => dispatch({ type: "cancelEdit" })}
          className="px-[11px] border rounded-md bg-gray-400 hover:bg-gray-500 active:bg-gray-600 hover:border-gray-600"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}

export default EditingInput;
