import React, { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import "./todo.scss";
import Close from "../../images/icon-cross.svg";
import { AppContext } from "../../AppContext";

function Todo({ id, content, completed, index }) {
  const { changeCompleted, deleteTodo } = useContext(AppContext);
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="Todo"
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
