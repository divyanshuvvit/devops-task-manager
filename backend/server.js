const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: "Learn Docker", completed: false },
  { id: 2, title: "Learn Jenkins", completed: true }
];

app.get("/", (req, res) => {
  res.json({
    message: "DevOps Task Manager API",
    status: "Running"
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const task = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.delete("/api/tasks/:id", (req, res) => {
  tasks = tasks.filter(
    task => task.id !== Number(req.params.id)
  );

  res.json({ message: "Task deleted" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;