import Todo from "../components/Todo.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deletAll } from "../features/TodoReducer.js";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  const handleDeleteAll = () => {
    dispatch(deletAll());
  };

  return (
    <>
      <div>
        <Link to="/create">
          <button>Create +</button>
        </Link>
      </div>
      {todos.length
        ? todos.map((todo) => <Todo todo={todo} key={todo.id} />)
        : "No todos"}
      <div>
        <button onClick={handleDeleteAll}>Delete All</button>
      </div>
    </>
  );
}

export default Home;
