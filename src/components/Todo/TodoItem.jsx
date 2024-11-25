import React, { useState } from "react";

const TodoItem = ({ todo, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="todo-item__edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <button type="submit">保存</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            取消
          </button>
        </form>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
          <div className="todo-item__actions">
            <button onClick={() => setIsEditing(true)}>編輯</button>
            <button onClick={() => onDelete(todo.id)}>刪除</button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
