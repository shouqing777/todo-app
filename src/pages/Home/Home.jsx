import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header/Header";
import TodoInput from "../../components/Todo/TodoInput";
import TodoFilter from "../../components/Todo/TodoFilter";
import TodoList from "../../components/Todo/TodoList";
import TodoItem from "../../components/Todo/TodoItem";
import TagManager from "../../components/Todo/TagManager";

const Home = () => {
  // 從 localStorage 讀取初始資料
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [tags, setTags] = useState(() => {
    const savedTags = localStorage.getItem("tags");
    return savedTags ? JSON.parse(savedTags) : [];
  });

  // 保存標籤到 localStorage
  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(tags));
  }, [tags]);

  // 新增篩選狀態
  const [filter, setFilter] = useState("all");

  // 新增排序狀態
  const [sortBy, setSortBy] = useState("default");

  // 當 todos 改變時，儲存到 localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // 2. 處理新增待辦事項
  const handleAddTodo = (text, priority, dueDate) => {
    // 3. 建立新的待辦事項物件
    const newTodo = {
      id: Date.now(), // 使用時間戳作為唯一 ID
      text, // 待辦事項文字
      completed: false, // 預設未完成
      priority: priority, // 添加優先級
      dueDate, // 添加截止日期
      createdAt: new Date().toISOString(),
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

  // 排序函數
  const getSortedTodos = (todosToSort) => {
    const priorityOrder = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return [...todosToSort].sort((a, b) => {
      if (sortBy === "priority-high") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === "priority-low") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      if (sortBy === "due-date") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });
  };

  // 先過濾再排序
  const filteredTodos = getSortedTodos(
    todos.filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
  );

  // 新增清除已完成項目的函數
  const handleClearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // 計算未完成項目數量
  const activeItemCount = todos.filter((todo) => !todo.completed).length;

  const handleAddTag = (newTag) => {
    setTags([...tags, newTag]);
  };

  const handleDeleteTag = (tagName) => {
    setTags(tags.filter((tag) => tag.name !== tagName));
    // 同時更新所有待辦事項，移除被刪除的標籤
    setTodos(
      todos.map((todo) => ({
        ...todo,
        tags: todo.tags?.filter((t) => t !== tagName) || [],
      }))
    );
  };

  const [searchText, setSearchText] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // 更新篩選邏輯
  const getFilteredTodos = () => {
    return todos.filter((todo) => {
      // 狀態篩選
      if (filter === "active" && todo.completed) return false;
      if (filter === "completed" && !todo.completed) return false;

      // 搜尋文字
      if (
        searchText &&
        !todo.text.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }

      // 標籤篩選
      if (selectedTag && !todo.tags?.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  };

  // 先篩選再排序
  const filteredAndSortedTodos = getSortedTodos(getFilteredTodos());

  return (
    <div className="home">
      <Header />
      <main className="main-content">
        <div className="main-content__left">
          <TodoInput onAdd={handleAddTodo} availableTags={tags} />
          <TodoFilter
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={handleClearCompleted}
            itemCount={activeItemCount}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchText={searchText}
            setSearchText={setSearchText}
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            availableTags={tags}
          />
          <div className="todo-list">
            {filteredAndSortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={handleDeleteTodo}
                onToggle={handleToggleTodo}
                onEdit={handleEditTodo}
                availableTags={tags}
              />
            ))}
            {filteredAndSortedTodos.length === 0 && (
              <div className="todo-list__empty">沒有符合條件的待辦事項</div>
            )}
          </div>
        </div>
        <div className="main-content__right">
          <TagManager
            tags={tags}
            onAddTag={handleAddTag}
            onDeleteTag={handleDeleteTag}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
