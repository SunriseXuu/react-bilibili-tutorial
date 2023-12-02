import { useEffect, useState } from "react";
import "./styles.css";

// 引入其他组件
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

export default function App() {
  // useState 用于在函数组件中添加状态
  // 它返回一个数组，其中包含当前状态的值和一个用于更新状态的函数
  // 通常，数组的第一个元素是当前状态的值，第二个元素是更新该状态的函数
  // 语法：const [state, setState] = useState(初始值或初始化回调)
  // 这种语法叫作解构，是一个JavaScript概念，可以搜索一下什么叫解构
  const [todos, setTodos] = useState(() => {
    // localStorage可以在浏览器的 F12 -> 应用 -> 本地存储空间 找到
    // 是一种键值对，利用键来索引值，比如这个例子中键是ITEM，值是localValue
    // 常用的方法为setItem(key, value)，getItem(key)和removeItem(key)
    const localValue = localStorage.getItem("ITEM");

    if (!localValue) return [];
    return JSON.parse(localValue); // 从stringify中解出来
  });

  // useEffect 用于处理副作用，比如数据获取、监听、手动修改DOM等
  // 它接收一个函数作为参数，这个函数会在组件渲染之后执行
  // 在这个函数内，你可以执行任何副作用相关的操作
  // 语法：useEffect(() => {}, [依赖项数组])
  useEffect(() => {
    localStorage.setItem("ITEM", JSON.stringify(todos)); // 转为string好存入
  }, [todos]);

  // 这个方法用来添加Todo
  // 虽然声明在父组件中，但其实是在子组件NewTodoForm中被调用的
  // 因为调用的时候传入了title，所以好像我们从NewTodoForm中获得了title一样
  function addTodos(title) {
    setTodos((current) => [...current, { id: crypto.randomUUID(), title, completed: false }]);
  }

  // 用来更新给定id的Todo的完成状态为completed
  function toggleTodo(id, completed) {
    // 用setState的回调形式来更新，current是当前todos的值，记住它可是个数组
    setTodos((current) =>
      // 所以我们先对这个数组来进行遍历，每个todo是current中的每一项
      current.map((todo) => {
        // 如果遍历的过程中找到了我们所选的那个id，就更新它
        // 也就是返回更新后的值，...是传播运算符可以搜索一下什么是传播运算符
        if (todo.id === id) return { ...todo, completed };

        // 不是我们选的那个todo就不管它
        return todo;
      })
    );
  }

  // 用来删除给定id的Todo
  function deleteTodo(id) {
    // 用setState的回调形式来更新，current是当前todos的值，记住它可是个数组
    // 利用filter来遍历，给定的条件是我们保留什么
    // 保留不是我们所选的todos，就意味着删除我们所选的todo
    setTodos((current) => current.filter((todo) => todo.id !== id));
  }

  return (
    // 这些内容叫JSX，是一种很类似html的东西但不是html
    // 一种简单的理解是你把它理解成其中可以直接使用JavaScript的html
    // 语法也和html有许多不一样的地方，组件允许我们自定义，每个组件都是一个function
    // 可以手动搜索一下什么是JSX
    // 另外所有JSX在返回的时候都要保证只有一个根，这里我使用<></>来确保
    // <></>其实是<React.Fragment></React.Fragment>的简写
    <>
      <NewTodoForm addTodos={addTodos} />

      <h1 className="header">Todo List</h1>

      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
