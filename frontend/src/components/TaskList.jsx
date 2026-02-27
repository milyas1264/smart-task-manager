function TaskList({ tasks, markComplete, deleteTask }) {
  return (
    <>
      <h3>
        Total: {tasks.length} | Completed:{" "}
        {tasks.filter((t) => t.status === "completed").length} | Pending:{" "}
        {tasks.filter((t) => t.status === "pending").length}
      </h3>

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
    </>
  );
}

export default TaskList;
