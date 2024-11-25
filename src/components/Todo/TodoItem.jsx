import React, { useState } from "react";

const TodoItem = ({ todo, onDelete, onToggle, onEdit, availableTags }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || "");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW");
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(todo.id, editText, editDueDate);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`todo-item priority-${todo.priority} ${
        isOverdue() ? "overdue" : ""
      }`}
    >
      <div className="todo-item__priority" />
      {isEditing ? (
        <form onSubmit={handleSubmit} className="todo-item__edit-form">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
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
          <div className="todo-item__content">
            <span className={todo.completed ? "completed" : ""}>
              {todo.text}
            </span>
            {todo.dueDate && (
              <span className="todo-item__due-date">
                截止日期: {formatDate(todo.dueDate)}
              </span>
            )}
            <div className="todo-item__tags">
              {todo.tags?.map((tagName) => {
                const tag = availableTags.find((t) => t.name === tagName);
                return tag ? (
                  <span
                    key={tagName}
                    className="tag"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tagName}
                  </span>
                ) : null;
              })}
            </div>
          </div>
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
