import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Todo from "../Todo/Todo";
import "./todoList.scss";

function TodoList() {
  const { todoList, setTodoList, clearCompleted } = useContext(AppContext);

  const [todoListCopy, setTodoListCopy] = useState(todoList);
  const [saveDnd, setSaveDnd] = useState(false);

  useEffect(() => {
    showTodoList("all");
  }, []);

  useEffect(() => {
    setTodoListCopy(todoList);
  }, [todoList]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const items = [...todoListCopy];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoListCopy(items);
    if (saveDnd) {
      setTodoList(items);
    }
  }
  function removeActiveClass() {
    document
      .querySelectorAll(".TodoList__select-option p")
      .forEach((item) => item.classList.remove("active"));
  }
  function showTodoList(name) {
    removeActiveClass();
    if (name === "all") {
      const array = [...todoList];
      setTodoListCopy(array);
      setSaveDnd(true);

      document.getElementById("all").classList.add("active");
    }
    if (name === "active") {
      const array = [...todoList];
      const newArray = array.filter((item) => item.completed === false);
      setTodoListCopy(newArray);
      setSaveDnd(false);

      document.getElementById("active").classList.add("active");
    }
    if (name === "completed") {
      const array = [...todoList];
      const newArray = array.filter((item) => item.completed === true);
      setTodoListCopy(newArray);
      setSaveDnd(false);

      document.getElementById("completed").classList.add("active");
    }
  }

  return (
    <div className="TodoList">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="ItemList">
          {(provided) => (
            <div
              className="TodoList__container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todoListCopy.map(({ id, content, completed }, index) => (
                <Todo
                  key={id}
                  id={id}
                  index={index}
                  content={content}
                  completed={completed}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="TodoList__options">
        <div className="TodoList__items-left">
          {[...todoList].filter((item) => item.completed === false).length}{" "}
          items left
        </div>
        <div className="TodoList__select-option">
          <p id="all" onClick={() => showTodoList("all")} className="active">
            All
          </p>
          <p id="active" onClick={() => showTodoList("active")}>
            Active
          </p>
          <p id="completed" onClick={() => showTodoList("completed")}>
            Completed
          </p>
        </div>
        <div className="TodoList__clear-completed" onClick={clearCompleted}>
          Clear Completed
        </div>
      </div>
    </div>
  );
}

export default TodoList;
