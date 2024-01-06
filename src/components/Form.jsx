import React from "react";

function Form({ onSubmit, onChange, onClick, title }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        name="title"
        value={title}
        placeholder="Add text"
      />
      <button onClick={onClick}>Add Task</button>
    </form>
  );
}

export default Form;
