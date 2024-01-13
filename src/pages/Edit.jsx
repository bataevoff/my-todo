import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editTodo } from "../features/TodoReducer";

function Edit() {
  const todos = useSelector((state) => state.todos);
  const { id } = useParams();
  const exisitingTodo = todos.filter((todo) => todo.id === id);
  console.log(exisitingTodo);
  const { title } = exisitingTodo[0];
  const [editTitle, setEditTitle] = useState(title);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editTodo({
        id: id,
        title: editTitle,
        isCompleted: false,
      })
    );
    setEditTitle("");

    navigate("/");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        onChange={(e) => setEditTitle(e.target.value)}
        type="text"
        name="title"
        value={editTitle}
        placeholder="Add text"
      />
      <button type="Submit">Edit Todo</button>
      <Link to="/">
        <button>cancel</button>
      </Link>
    </form>
  );
}

export default Edit;
