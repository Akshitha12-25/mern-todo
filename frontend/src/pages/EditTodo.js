import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      <h2>Edit Todo</h2>

      <form onSubmit={updateHandler}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditTodo;
