import { useState } from "react"
import API from "../utils/api"

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("low")

  const handleSubmit = async (e) => {
    e.preventDefault()

    await API.post("/tasks", {
      title,
      description,
      priority
    })

    setTitle("")
    setDescription("")
    setPriority("low")

    fetchTasks()
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button className="btn-primary" type="submit">
  Add Task
</button>
    </form>
  )
}

export default TaskForm