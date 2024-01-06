import { useState } from "react";
import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    count <= 0 ? count : setCount(count - 1);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = () => {
    title.trim("") === ""
      ? title
      : setTodos([
          ...todos,
          {
            title: title,
            id: crypto.randomUUID(),
          },
        ]);
    setTitle("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((task) => task.id != id));
  };

  return (
    <>
      <div>
        <h1>Count {count}</h1>
        <div>
          <button onClick={handlePlus} className="plus">
            +
          </button>
        </div>
        <div>
          <button onClick={handleMinus} className="minus">
            -
          </button>
        </div>
      </div>
      <div>
        <Form
          onClick={handleAddTodo}
          onChange={handleChange}
          title={title}
          onSubmit={onSubmit}
        />
      </div>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} onDelete={handleDelete} />
      ))}
    </>
  );
}

export default App;
