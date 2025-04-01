import { useState } from "react";

export default function Form1({ dispatch }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!inputValue) return;

    const newTodo = {
      id: crypto.randomUUID(),
      name: inputValue,
      isDone: false,
    };
    dispatch({ type: "addItem", payload: newTodo });
    setInputValue("");
  }

  return (
    <div className="border shadow-md px-12 py-6 mb-4 rounded-xl mt-5">
      <form onSubmit={handleSubmit}>
        <p className="mb-5 text-center font-bold text-3xl">My Todo List</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-2 py-1 rounded-md border"
        />{" "}
        <button
          type="submit"
          className="px-2 py-1 border rounded-md bg-blue-400 hover:bg-blue-500 active:bg-blue-600 hover:border-blue-600"
        >
          ADD
        </button>
      </form>
    </div>
  );
}
