import React from "react";

const TodoItem = ({ todo, onDelete, onToggle }) => {
  // todo: 包含 {id, text, completed} 的物件
  // onDelete: 從父元件傳來的刪除函數
  // onToggle: 從父元件傳來的切換完成狀態函數

  return (
    <div className="todo-item">
      {/* 1. 核取方塊：控制待辦事項的完成狀態 */}
      <input
        type="checkbox"
        checked={todo.completed} // 綁定完成狀態
        onChange={() => onToggle(todo.id)} // 點擊時切換狀態
      />

      {/* 2. 待辦事項文字：完成時會有刪除線 */}
      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
        }}
      >
        {todo.text}
      </span>

      {/* 3. 刪除按鈕 */}
      <button onClick={() => onDelete(todo.id)}>刪除</button>
    </div>
  );
};

export default TodoItem;
