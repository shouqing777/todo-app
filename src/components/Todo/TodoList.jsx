import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onToggle, onEdit }) => {
  return (
    <div className="todo-list">
      <TransitionGroup>
        {todos.map((todo) => (
          <CSSTransition key={todo.id} timeout={300} classNames="todo">
            <TodoItem
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default TodoList;
