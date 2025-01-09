const User = require("../config/user");
const Task = require("../config/task");

const addTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    const userId = req.user._id;

    if (!title || !description || !dueDate) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
    });

    await newTask.save();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.tasks.push(newTask._id);
    await user.save();
    return res.status(201).json({ message: "Task added successfully!" , task: newTask });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("tasks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ tasks: user.tasks });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateTask = async (req, res) => {
  const taskId = req.params.id;
  const { title, description, dueDate, priority, status } = req.body;

  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    task.priority = priority;
    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task updated successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update task" });
  }
};
const deleteTask = async (req, res) => {
    const taskId = req.params.id;
    const userId = req.user._id;

    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.tasks = user.tasks.filter(taskId => taskId.toString() !== task._id.toString());
        await user.save();

        await task.deleteOne();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete task" });
    }
};


module.exports = { addTask, getTasks , updateTask, deleteTask };
