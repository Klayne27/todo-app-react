import FilterButtons from "./FilterButtons";
import TodoList from "./TodoList";
import EditingInput from "./EditingInput";
import { useTodo } from "./contexts/TodoContext";

function List() {
  const {filteredTodos, todos, isEditing} = useTodo()

  return (
    <>
      {todos.length > 0 ? (
        <div className="border shadow-md p-6 rounded-xl">
          <FilterButtons />
          <ul>
            {filteredTodos.map((todo) => (
              <li key={todo.id}>
                <div className="border px-4 py-2 rounded-md w-[355px] mb-2">
                  {isEditing === todo.id ? <EditingInput /> : <TodoList todo={todo} />}
                </div>
              </li>
            ))}
          </ul>
          {filteredTodos.length === 0 && todos.length > 0 && (
            <p className="text-center">No todos matching the current filter!</p>
          )}
        </div>
      ) : (
        <p>No todos yet. Add some!</p>
      )}
    </>
  );
}

export default List;
