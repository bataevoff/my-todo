import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/TodoReducer";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      isCompleted: false,
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        name="title"
        value={title}
        placeholder="Add text"
      />
      <button>Add todo</button>
      <button>cancel</button>
    </form>
  );
}

export default Create;
