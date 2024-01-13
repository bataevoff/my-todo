import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo } from "../features/TodoReducer";

function Todo({ todo }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo({ id }));
    console.log(todo);
  };
  return (
    <div>
      <div
        style={
          todo.isCompleted
            ? { textDecoration: "line-through" }
            : { textDecoration: "none" }
        }
      >
        {todo.title}
      </div>
      <button onClick={() => handleDelete(todo.id)}>X</button>
      <input
        type="checkbox"
        defaultChecked={todo.isCompleted && true}
        onClick={() => handleToggle(todo.id)}
      />
      <Link to={`edit/${todo.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
}

export default Todo;
