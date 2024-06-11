const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const users = await User.find({});
    res.json(users);
}

async function handleSignup(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const userExists = await User.findOne({ $or: [{ userName: username }, { email }] });
    if (userExists) {
        return res.status(400).json({ error: "User Already Exists" });
    }
    await User.create({
        userName: username,
        email: email,
        password: password,
        tasks: [],
    });
    return res.status(201).json({ msg: "Success" });
}

async function handleLogin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }
    const userExists = await User.findOne({ userName: username });
    if (!userExists || userExists.password != password) {
        return res.status(401).json("Username or password incorrect");
    }
    return res.json({ msg: "Login successful" });
}

async function handleCreateNewTask(req, res) {
    const { username } = req.params;
    const { text, done, priority, color } = req.body;
    if (!text) {
        return res.status(400).json({ error: "Please enter the task" });
    }
    const user = await User.findOne({ userName: username });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const newTask = {
        text: text,
        done: done,
        priority: priority,
        color: color,
    };

    user.tasks.push(newTask);
    await user.save();

    return res.status(201).json({ msg: "New task added to user", newTask });
}

async function handleDeleteUser(req, res) {
    const { username, taskID } = req.params;
    const user = await User.findOne({ userName: username });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const task = user.tasks.find(task => task._id == taskID);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    user.tasks = user.tasks.filter(task => task._id != taskID);
    await user.save();
    return res.json({ msg: "Deleted the task" });
}


async function handlePatchUserTask(req, res) {
    const { username, taskID } = req.params;
    const { done } = req.body;
    const user = await User.findOne({ userName: username });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const task = user.tasks.id(taskID);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    task.done = done;
    await user.save();
    return res.json({ msg: "Task updated successfully" });
}

async function handleGetUserTasks(req, res) {
    const { username } = req.params;
    const user = await User.findOne({ userName: username });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user.tasks);
}

module.exports = {
    handleCreateNewTask,
    handleDeleteUser,
    handlePatchUserTask,
    handleGetAllUsers,
    handleGetUserTasks,
    handleLogin,
    handleSignup,
};
