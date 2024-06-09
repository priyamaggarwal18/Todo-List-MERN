const express = require("express");
const cors = require("cors");
const fs = require("fs");
const PORT = 8000;
const app = express();
const { v4: uuidv4 } = require('uuid'); 

//get the JSON file for data
const users = require("./DATA.json");

//middleware
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Apply the CORS middleware with options to all /api routes
app.use('/api', cors(corsOptions), express.json());

//routes
//get the username
app.get("/api/users", (req, res) => {
  res.json(users);
});

//post the data of new user
app.post("/api/signup", (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  const userExists = users.some(
    (user) => user.username === username || user.email === email
  );
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }
  const newUser = { username, email, password, tasks: [] };
  users.push(newUser);
  fs.writeFile("./DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res
        .status(500)
        .json({ error: "Error signing up, please try again" });
    }
    res.status(201).json(newUser);
  });
});

//post method for login
// post api for user login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  res.json({ message: "Login successful" });
});

//post the new task into a username
// post the new task into a username
app.post("/api/users/:username/tasks", (req, res) => {
    const { username } = req.params;
    const { text, done, priority, color } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Please enter the task" });
    }
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newTask = {
      id: uuidv4(), // Generate a unique ID for the task
      text,
      done,
      priority,
      color,
    };
    user.tasks.push(newTask);
    fs.writeFile("./DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error("Error writing to file:", err);
        return res
          .status(500)
          .json({ error: "Error adding task, please try again" });
      }
      res.status(201).json(newTask);
    });
  });

app.delete("/api/users/:username/tasks/:taskID", (req, res) => {
  const { username, taskID } = req.params;
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  const taskIndex = users[userIndex].tasks.findIndex(
    (task) => task.id === taskID
  );

  if (taskIndex === -1)
    return res.status(404).json({ error: "Task not found" });

  users[userIndex].tasks.splice(taskIndex, 1);

  fs.writeFile("./DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res
        .status(500)
        .json({ error: "Error deleting task, please try again" });
    }
    res.status(204).end();
  });
});

// Patch the done value of a task in a specific user
app.patch("/api/users/:username/tasks/:taskID", (req, res) => {
  const { username, taskID } = req.params;
  const { done } = req.body;

  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1)
    return res.status(404).json({ error: "User not found" });

  const taskIndex = users[userIndex].tasks.findIndex(
    (task) => task.id === taskID
  );

  if (taskIndex === -1)
    return res.status(404).json({ error: "Task not found" });

  users[userIndex].tasks[taskIndex].done = done;

  fs.writeFile("./DATA.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return res
        .status(500)
        .json({ error: "Error updating task status, please try again" });
    }
    res.status(200).json(users[userIndex].tasks[taskIndex]);
  });
});

//get the list of tasks
// Get tasks for a specific user
app.get("/api/users/:username/tasks", (req, res) => {
  const { username } = req.params;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user.tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
