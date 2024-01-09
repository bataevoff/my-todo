import { useEffect, useState } from "react";
import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  editTodo,
  toggleEdit,
  deletAll,
} from "./features/TodoReducer.js";

function App() {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(0);

  const dispatch = useDispatch();

  const todoss = useSelector((state) => state.todos);

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    setTitle("");
    setEditId(0);
  };

  const handleAddTodo = () => {
    if (editId) {
      dispatch(
        editTodo({
          id: editId,
          title: title,
          isCompleted: false,
        })
      );
      setTitle("");
      setEditId(0);
    } else {
      const newTodo = {
        id: crypto.randomUUID(),
        title: title,
        isCompleted: false,
      };
      dispatch(addTodo(newTodo));
      setTitle("");
    }
  };

  const handleToggle = (id) => {
    dispatch(toggleEdit({ id }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleEdit = (id) => {
    const editTodo = todoss.find((todo) => todo.id === id);
    setTitle(editTodo.title);
    setEditId(id);
  };

  const handleDeleteAll = () => {
    dispatch(deletAll());
    setTitle("");
  };

  return (
    <>
      <div>
        <Form
          editId={editId}
          onClick={handleAddTodo}
          onChange={handleChange}
          title={title}
          onSubmit={onSubmit}
          onCancel={handleCancel}
        />
      </div>
      {todoss.map((todo) => (
        <Todo
          todo={todo}
          key={todo.id}
          onDelete={handleDelete}
          onComplete={handleToggle}
          onEdit={handleEdit}
        />
      ))}
      <button onClick={handleDeleteAll}>Delete All</button>
    </>
  );
}

export default App;
