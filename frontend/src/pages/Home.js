import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todo List</h2>

      <Link to="/add">
        <button>Add Todo</button>
      </Link>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id} style={{ marginTop: "10px" }}>
            <b>{todo.title}</b> – {todo.description}

            <Link to={`/edit/${todo._id}`}>
              <button style={{ marginLeft: "10px" }}>Edit</button>
            </Link>

            <button
              onClick={() => deleteTodo(todo._id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
