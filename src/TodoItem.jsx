import React from "react";

// 结构todo的所有字段，传入是用{...todo}的形式
export default function TodoItem({ id, title, completed, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label>
        {/* 参考NewTodoForm组件中的讲解 */}
        <input type="checkbox" checked={completed} onChange={(e) => toggleTodo(id, e.target.checked)} /> {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-danger">
        Delete
      </button>
    </li>
  );
}
