import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      <h2>Add Todo</h2>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddTodo;
