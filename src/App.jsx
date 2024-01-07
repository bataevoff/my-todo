import { useEffect, useState } from "react";
import Todo from "./components/Todo.jsx";
import Form from "./components/Form.jsx";

const LOCAL_STORAGE_KEY = "todo:saveTodos";

function App() {
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    loadSavedTodos();
  }, []);

  const setTodosAndSave = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
  };

  const loadSavedTodos = () => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    saved && setTodos(JSON.parse(saved));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = () => {
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updatedTodos = todos.map((todo) =>
        todo.id === editTodo.id ? (todo = { ...todo, title: title }) : todo
      );
      setTodosAndSave(updatedTodos);
      setEditId(0);
      return;
    }
    const filteredTodos = todos.filter((todo) => todo.title === title);
    filteredTodos.length != true &&
      title.trim("") !== "" &&
      setTodosAndSave([
        ...todos,
        {
          title: title,
          id: crypto.randomUUID(),
          isCompleted: false,
        },
      ]);
    setTitle("");

    // if (title.trim("") !== "") {
    //   setTodosAndSave([...todos, { title, id: `${title}-${Date.now()}` }]);
    //   setTitle("");
    // }
    // if (editId) {
    //   const editTodo = todos.find((todo) => todo.id === editId);
    //   const updatedTodos = todos.map((todo) =>
    //     todo.id === editTodo.id ? (todo = { ...todo, title }) : todo
    //   );
    //   setTodosAndSave(updatedTodos);
    //   setEditId(0);
    //   return;
    // }
  };

  const handleToggle = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });
    setTodosAndSave(newTodos);
  };

  const handleDelete = (id) => {
    setTodosAndSave(todos.filter((task) => task.id != id));
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setTitle(editTodo.title);
    setEditId(id);
  };

  const handleDeleteAll = () => {
    setTodosAndSave([]);
  };

  return (
    <>
      <div>
        <Form
          onClick={handleAddTodo}
          onChange={handleChange}
          title={title}
          onSubmit={onSubmit}
        />
      </div>
      {todos.map((todo) => (
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
