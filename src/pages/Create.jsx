import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/TodoReducer";
import { useNavigate } from "react-router-dom";

function Create() {
  const [title, setTitle] = useState("");
  const [titleValidation, setTitleValidation] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "") {
      const newTodo = {
        title: title,
      };
      dispatch(addTodo(newTodo));
      setTitle("");
      navigate("/");
      setTitleValidation(null);
    } else {
      setTitleValidation("The field is empty, add text!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        name="title"
        value={title}
        placeholder="Add Text..."
      />
      <button>Add todo</button>
      <button>cancel</button>
      {titleValidation && <div>{titleValidation}</div>}
    </form>
  );
}

export default Create;
