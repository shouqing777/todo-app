import React, { useState } from "react";
import Header from "../../components/layout/Header/Header";
import TodoInput from "../../components/Todo/TodoInput";
import TodoItem from "../../components/Todo/TodoItem";

const Home = () => {
  // 1. 儲存所有待辦事項的狀態
  const [todos, setTodos] = useState([]);

  // 2. 處理新增待辦事項
  const handleAddTodo = (text) => {
    // 3. 建立新的待辦事項物件
    const newTodo = {
      id: Date.now(), // 使用時間戳作為唯一 ID
      text, // 待辦事項文字
      completed: false, // 預設未完成
    };

    // 4. 更新待辦事項列表
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="home">
      <Header />
      <main className="main-content">
        {/* 5. 傳遞處理函數給 TodoInput */}
        <TodoInput onAdd={handleAddTodo} />

        {/* 6. 顯示待辦事項列表 */}
        <div className="todo-list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggle={handleToggleTodo}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
