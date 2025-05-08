import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { TodoProvider } from "./components/contexts/TodoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TodoProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TodoProvider>
);
