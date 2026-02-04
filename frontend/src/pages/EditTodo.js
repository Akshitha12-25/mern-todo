import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../App.css";

function EditTodo() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await axios.get("http://localhost:5000/api/todos");
      const todo = res.data.find((t) => t._id === id);

      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description);
      }
    };

    fetchTodo();
  }, [id]);

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios.put(`http://localhost:5000/api/todos/${id}`, {
      title,
      description,
    });

    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>✏️ Edit Todo</h2>

        <form onSubmit={updateHandler}>
          <input
            className="input"
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="input"
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-primary" type="submit">
            Update Todo
          </button>

          <Link to="/" style={{ marginLeft: "10px" }}>
            <button className="btn" type="button">
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default EditTodo;
