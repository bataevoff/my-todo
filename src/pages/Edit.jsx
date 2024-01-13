import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { editTodo } from "../features/TodoReducer";

function Edit() {
  const todos = useSelector((state) => state.todos.todos);
  const { id } = useParams();
  const exisitingTodo = todos.filter((todo) => todo.id === id);
  console.log(exisitingTodo);
  const { title } = exisitingTodo[0];
  const [editTitle, setEditTitle] = useState(title);
  const [titleValidation, setTitleValidation] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTitle.trim() !== "") {
      dispatch(
        editTodo({
          id: id,
          title: editTitle,
        })
      );
      setEditTitle("");
      navigate("/");
      setTitleValidation(null);
    } else {
      setTitleValidation("The field is empty, add text!");
    }
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
      {titleValidation && <div>{titleValidation}</div>}
    </form>
  );
}

export default Edit;
