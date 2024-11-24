import React, { useState } from "react";

const TodoInput = ({ onAdd }) => {
  // 1. 建立本地狀態來儲存輸入框的值
  const [text, setText] = useState("");

  // 3. 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單預設提交行為
    if (text.trim()) {
      // 確認輸入不是空白
      onAdd(text); // 呼叫父元件傳來的 onAdd 函數
      setText(""); // 清空輸入框
    }
  };

  // 2. 渲染表單
  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={text} // 受控元件：值由 React 控制
        onChange={(e) => setText(e.target.value)} // 當輸入改變時更新狀態
        placeholder="請輸入待辦事項..."
        className="todo-input__field"
      />
      <button type="submit" className="todo-input__button">
        新增
      </button>
    </form>
  );
};

export default TodoInput;
