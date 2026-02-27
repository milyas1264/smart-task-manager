import { useEffect, useState } from "react";
import API from "../utils/api";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    (async () => {
      await fetchTasks();
    })();
  }, []);

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const markComplete = async (id) => {
    await API.put(`/tasks/${id}`, { status: "completed" });
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container">
      <div className="card">
        <h2>Dashboard</h2>
        <button className="btn-danger" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="card">
        <TaskForm fetchTasks={fetchTasks} />
      </div>

      {tasks.map((task) => (
        <div className="card" key={task._id}>
          <h4
            style={{
              textDecoration:
                task.status === "completed" ? "line-through" : "none",
            }}
          >
            {task.title}
          </h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>
            Priority:
            <span
              style={{
                color:
                  task.priority === "high"
                    ? "red"
                    : task.priority === "medium"
                      ? "orange"
                      : "green",
              }}
            >
              {" "}
              {task.priority}
            </span>
          </p>

          <button
            className="btn-success"
            onClick={() => markComplete(task._id)}
          >
            Complete
          </button>

          <button className="btn-danger" onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
