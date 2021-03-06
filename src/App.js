import React, { useState, useEffect } from "react";
import MainContainer from "./containers/MainContainer/MainContainer";
import { AppContext } from "./AppContext";
import { v4 } from "uuid";

const LOCAL_STORAGE_KEY = "todoApp";

export default function App() {
  const [input, setInput] = useState("");

  const [currentTheme, setCurrentTheme] = useState("dark");

  const [todoList, setTodoList] = useState([]);

  const [show, setShow] = useState("all");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  function addTodo() {
    if (input === "") return;

    const array = [...todoList];
    const item = { id: v4(), content: input, completed: false };
    array.push(item);
    setInput("");
    setTodoList(array);
  }

  function changeCompleted(id) {
    const array = [...todoList];
    const item = array.find((item) => item.id === id);
    item.completed = !item.completed;
    setTodoList(array);
  }

  function deleteTodo(id) {
    document.getElementById(id).classList.remove("Todo--active");
    setTimeout(() => {
      setTodoList((prevValue) => {
        const array = [...prevValue];
        const newArray = array.filter((item) => item.id !== id);
        return newArray;
      });
    }, 500);
  }

  function clearCompleted() {
    const newArray2 = [...todoList].filter((item) => item.completed === true);
    newArray2.forEach(({ id }) => {
      document.getElementById(id).classList.remove("Todo--active");
    });

    setTimeout(() => {
      setTodoList((prevValue) => {
        const array = [...prevValue];
        const newArray = array.filter((item) => item.completed !== true);
        return newArray;
      });
    }, 500);
  }

  function changeTheme() {
    if (currentTheme === "light") {
      document.body.className = "";
      document.body.classList.add("dark");
      setCurrentTheme("dark");
      document.querySelector(".header").classList.remove("header--active");
    }
    if (currentTheme === "dark") {
      document.body.className = "";
      document.body.classList.add("light");
      setCurrentTheme("light");
      document.querySelector(".header").classList.add("header--active");
    }
  }
  return (
    <div className="App">
      <header className="header"></header>
      <AppContext.Provider
        value={{
          input,
          setInput,
          addTodo,
          changeTheme,
          currentTheme,
          todoList,
          setTodoList,
          changeCompleted,
          deleteTodo,
          clearCompleted,
          show,
          setShow,
        }}
      >
        <MainContainer />
      </AppContext.Provider>
    </div>
  );
}
