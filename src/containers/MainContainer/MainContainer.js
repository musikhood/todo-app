import React, { useContext } from "react";
import "./mainContainer.scss";
import Sun from "../../images/icon-sun.svg";
import Moon from "../../images/icon-moon.svg";
import { AppContext } from "../../AppContext";
import TodoList from "../../components/TodoList/TodoList";

export default function MainContainer() {
  const { input, setInput, addTodo, changeTheme, currentTheme } =
    useContext(AppContext);

  return (
    <main className="main">
      <div className="main__top-container">
        <div className="main__logo-box">
          <h1 className="main__h1">TODO</h1>
        </div>
        <div className="main__theme-switch" onClick={changeTheme}>
          <img
            src={currentTheme === "dark" ? Sun : Moon}
            alt="Theme switcher"
            className="main__theme-icon"
          />
        </div>
      </div>

      <div className="main__add-todo">
        <div className="main__circle"></div>
        <input
          type="text"
          className="main__input"
          placeholder="Create a new todo..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            addTodo();
          }}
        />
      </div>
      <TodoList />
      <div className="dnd-text">
        <p>Drag and drop to reorder list</p>
      </div>
    </main>
  );
}
