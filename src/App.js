import React, { useState } from "react";
import "./App.css";

function Todo({ items, index, completeTodo, removeTodo }) {
  return (
    <div
      style={{ textDecoration: items.isCompleted ? "line-through" : "" }}
      className="todo"
    >
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>X</button>
      </div>
      {items.text}
    </div>
  );
}
//=>we can pass function as a prop
//=>addTodo() is a prop passed to TodoForm component;
function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Add to do"
        className="input"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "learn react",
      isCompleted: false,
      day: "monday"
    },
    {
      text: "meet friend for lunch",
      isCompleted: false,
      day: "tuesday"
    },
    {
      text: "build todo app",
      isCompleted: false,
      day: "friday"
    }
  ]);
  console.log("todos", todos);
  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    console.log("newTodos", newTodos);
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };
  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1)
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            items={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}
export default App;
