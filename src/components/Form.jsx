import React from "react";

function Form({ onSubmit, onChange, onClick, title, editId, onCancel }) {
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
      {editId !== 0 && <button onClick={onCancel}>cancel</button>}
    </form>
  );
}

export default Form;
