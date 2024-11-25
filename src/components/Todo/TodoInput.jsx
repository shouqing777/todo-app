import React, { useState } from "react";

const TodoInput = ({ onAdd, availableTags }) => {
  // 1. 建立本地狀態來儲存輸入框的值
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  // 3. 處理表單提交
  const handleSubmit = (e) => {
    e.preventDefault(); // 阻止表單預設提交行為
    if (text.trim()) {
      // 確認輸入不是空白
      onAdd(text, priority, dueDate, selectedTags); // 呼叫父元件傳來的 onAdd 函數
      setText(""); // 清空輸入框
      setPriority("medium");
      setDueDate("");
      setSelectedTags([]);
    }
  };

  // 2. 渲染表單
  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <div className="todo-input__main">
        <input
          type="text"
          value={text} // 受控元件：值由 React 控制
          onChange={(e) => setText(e.target.value)} // 當輸入改變時更新狀態
          placeholder="新增待辦事項..."
          className="todo-input__text"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="high">高優先級</option>
          <option value="medium">中優先級</option>
          <option value="low">低優先級</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />
      </div>
      <div className="todo-input__tags">
        {availableTags.map((tag) => (
          <label key={tag.name} className="tag-checkbox">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag.name)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedTags([...selectedTags, tag.name]);
                } else {
                  setSelectedTags(selectedTags.filter((t) => t !== tag.name));
                }
              }}
            />
            <span style={{ backgroundColor: tag.color }}>{tag.name}</span>
          </label>
        ))}
      </div>
      <button type="submit">新增</button>
    </form>
  );
};

export default TodoInput;
