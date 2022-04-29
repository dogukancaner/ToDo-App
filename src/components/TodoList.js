import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const [status, setStatus] = useState("all");

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.status = !todo.status;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Yapılacaklar Listesi</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={
          status === "all"
            ? todos
            : todos.filter((a) => a.status === (status === "completed"))
        }
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      <button className="task-button" onClick={() => setStatus("all")}>
        Tümü
      </button>
      <button className="task-button" onClick={() => setStatus("completed")}>
        Tamamlanan İşler
      </button>
      <button className="task-button" onClick={() => setStatus("active")}>
        Aktif İşler
      </button>
    </div>
  );
}

export default TodoList;
