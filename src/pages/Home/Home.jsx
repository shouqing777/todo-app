import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import TodoInput from "../../components/Todo/TodoInput";
import TodoItem from "../../components/Todo/TodoItem";
import TodoFilter from "../../components/Todo/TodoFilter";

const Home = () => {
  // 從 localStorage 讀取初始資料
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 新增篩選狀態
  const [filter, setFilter] = useState("all");

  // 當 todos 改變時，儲存到 localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

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

  // 新增編輯功能
  const handleEditTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  // 根據篩選條件過濾待辦事項
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // 新增清除已完成項目的函數
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // 計算未完成項目數量
  const activeItemCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="home">
      <Header />
      <main className="main-content">
        {/* 5. 傳遞處理函數給 TodoInput */}
        <TodoInput onAdd={handleAddTodo} />
        <TodoFilter
          filter={filter}
          setFilter={setFilter}
          onClearCompleted={handleClearCompleted}
          itemCount={activeItemCount}
        />

        {/* 6. 顯示待辦事項列表 */}
        <div className="todo-list">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggle={handleToggleTodo}
              onEdit={handleEditTodo}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
