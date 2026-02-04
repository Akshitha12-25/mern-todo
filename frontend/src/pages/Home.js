import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="container">
      <div className="header">
        <h2>📌 Todo List</h2>

        <Link to="/add">
          <button className="btn btn-primary">+ Add Todo</button>
        </Link>
      </div>

      {todos.length === 0 ? (
        <p className="empty-text">No todos found. Add your first task!</p>
      ) : (
        <div className="todo-list">
          {todos.map((todo) => (
            <div className="todo-card" key={todo._id}>
              <div>
                <p className="todo-title">{todo.title}</p>
                <p className="todo-desc">{todo.description}</p>
              </div>

              <div className="todo-actions">
                <Link to={`/edit/${todo._id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>

                <button
                  className="btn btn-delete"
                  onClick={() => deleteTodo(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
