import React from "react";

const TodoFilter = ({
  filter,
  setFilter,
  onClearCompleted,
  itemCount,
  sortBy,
  setSortBy,
  searchText,
  setSearchText,
  selectedTag,
  setSelectedTag,
  availableTags,
}) => {
  return (
    <div className="todo-filter">
      <div className="todo-filter__search">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="搜尋待辦事項..."
          className="search-input"
        />
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="tag-select"
        >
          <option value="">所有標籤</option>
          {availableTags.map((tag) => (
            <option key={tag.name} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </div>

      <div className="todo-filter__controls">
        <div className="todo-filter__count">{itemCount} 個待辦事項</div>
        <div className="todo-filter__group">
          <span>排序：</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">預設順序</option>
            <option value="priority-high">優先級（高到低）</option>
            <option value="priority-low">優先級（低到高）</option>
            <option value="due-date">截止日期</option>
          </select>
        </div>
        <div className="todo-filter__group">
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
    </div>
  );
};

export default TodoFilter;
