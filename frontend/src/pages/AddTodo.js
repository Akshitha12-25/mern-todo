import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/todos", {
      title,
      description,
    });

    navigate("/");
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>➕ Add Todo</h2>

        <form onSubmit={submitHandler}>
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
            Add Todo
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

export default AddTodo;
