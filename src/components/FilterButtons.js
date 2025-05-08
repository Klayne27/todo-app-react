import { useTodo } from "./contexts/TodoContext";

function FilterButtons() {
    const {dispatch} = useTodo()

    return (
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
    );
}

export default FilterButtons
