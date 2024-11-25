import React from "react";

const TodoFilter = ({ filter, setFilter, onClearCompleted, itemCount }) => {
  return (
    <div className="todo-filter">
      <div className="todo-filter__count">{itemCount} 個待辦事項</div>
      <div className="todo-filter__buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          全部
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          未完成
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          已完成
        </button>
      </div>
      <button className="todo-filter__clear" onClick={onClearCompleted}>
        清除已完成
      </button>
    </div>
  );
};

export default TodoFilter;
