import React, { useState } from "react";
import Header from "./components/Header";
import TodosList from "./components/todoslist";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <Header />
        <div className="todos-container">
          <TodosList
            todos={todos}
            setTodos={setTodos}
            input={input}
            setInput={setInput}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
