import React from "react";

const TodoFilter = ({ filter, setFilter }) => {
  return (
    <div className="todo-filter">
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
  );
};

export default TodoFilter;
