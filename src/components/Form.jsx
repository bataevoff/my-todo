import React from "react";

function Form({ onSubmit, onChange, onClick, title, editId }) {
  return (
    <form onSubmit={onSubmit}>
      <input
        onChange={onChange}
        type="text"
        name="title"
        value={title}
        placeholder="Add text"
      />
      <button onClick={onClick}>{editId ? "Update todo" : "Add todo"}</button>
    </form>
  );
}

export default Form;
