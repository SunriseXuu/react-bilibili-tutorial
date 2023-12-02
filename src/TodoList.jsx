import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <>
      {todos.length === 0 && <div>No todos</div>}

      <ul className="list">
        {todos.map((todo) => (
          // 因为传入的props是一个对象（键值对），同名又可以合并键值
          // 所以{...todo}就等同于将整个todo对象作为props对象传入
          // 在TodoItem中就可以顺理成章地解构出todo的所有字段
          <TodoItem {...todo} key={todo.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </>
  );
}
