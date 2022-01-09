import React, { useContext, useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./todo.scss";
import Close from "../../images/icon-cross.svg";
import { AppContext } from "../../AppContext";

function Todo({ id, content, completed, index }) {
  const { changeCompleted, deleteTodo, show } = useContext(AppContext);

  const [option1, setOption1] = useState(true);
  const [option2, setOption2] = useState(false);
  useEffect(() => {
    document.getElementById(id).classList.add("Todo--fadeIn");
    setTimeout(() => {
      document.getElementById(id).classList.remove("Todo--fadeIn");
    }, 500);
  }, []);

  useEffect(() => {
    if (show === "all") {
      setOption1(true);
      setOption2(false);
    } else if (show === "active") {
      setOption1(false);
      setOption2(false);
    } else if (show === "completed") {
      setOption1(true);
      setOption2(true);
    }
  }, [show]);

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className={
            completed === option1 || completed === option2
              ? `Todo Todo--active`
              : "Todo"
          }
          id={id}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="Todo__checkbox-box">
            <input
              type="checkbox"
              className="Todo__checkbox"
              checked={completed}
              onChange={() => changeCompleted(id)}
            />
            <span onClick={() => changeCompleted(id)}></span>
          </div>
          <div className="Todo__todo-container">
            <p
              className={
                completed ? "Todo__todo Todo__todo--completed" : "Todo__todo"
              }
            >
              {content}
            </p>
          </div>
          <div className="Todo__close-box" onClick={() => deleteTodo(id)}>
            <img src={Close} alt="close" className="Todo__close" />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Todo;
