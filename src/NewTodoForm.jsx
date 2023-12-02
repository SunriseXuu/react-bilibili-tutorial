import { useState } from "react";

// 参数其实是以一个叫props的对象传进来的，JavaScript对象指的是键值对
// 对象是可以被解构的，可以搜索一下什么叫解构
export default function NewTodoForm({ addTodos }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // 防止form提交的默认行为（即刷新页面）
    if (newItem === "") return; // 防止用户提交空待办

    // 这个函数是在父组件App中注册的，但是在子组件中被调用了
    // 传入子组件的newItem，就好像在父组件中获得了它，并且可以对其进行操作
    addTodos(newItem);

    setNewItem(""); // 每次提交完都清空input
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        {/*
         * input的值永远都是value字段的值，onChange可以监听用户输入事件
         * 用户的输入被监听后，利用setState更新input的value就实现了页面的交互
         * 又把更新后的值（state）留在了本组件中，以用来提交
         */}
        <input type="text" id="item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
      </div>

      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
}
