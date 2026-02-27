import express from "express"
import Task from "../models/Task.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  const task = await Task.create({
    ...req.body,
    user: req.user
  })
  res.json(task)
})

// Get User Tasks
// router.get("/", authMiddleware, async (req, res) => {
//   const tasks = await Task.find({ user: req.user })
//   res.json(tasks)
// })

// 📂 routes/taskRoutes.js

router.get("/", authMiddleware, async (req, res) => {
  const { status } = req.query

  let filter = { user: req.user }

  if (status) {
    filter.status = status
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 })

  res.json(tasks)
})

// Update Task
// router.put("/:id", authMiddleware, async (req, res) => {
//   const updated = await Task.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   )
//   res.json(updated)
// })

router.put("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user
  })

  if (!task)
    return res.status(404).json({ message: "Task not found" })

  Object.assign(task, req.body)
  await task.save()

  res.json(task)
})

// Delete Task
// router.delete("/:id", authMiddleware, async (req, res) => {
//   await Task.findByIdAndDelete(req.params.id)
//   res.json({ message: "Task deleted" })
// })

router.delete("/:id", authMiddleware, async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user
  })

  if (!task)
    return res.status(404).json({ message: "Task not found" })

  res.json({ message: "Task deleted" })
})

export default router