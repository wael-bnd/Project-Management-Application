const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { summary, description, issueType, estimation, assignee } = req.body;
    if (!summary || !issueType) {
      return res
        .status(400)
        .json({ error: "Summary and issueType are required fields." });
    }
    const task = new Task({ summary, description, issueType, estimation });
    task.reporter = req.auth._id;
    await task.save();

    res.status(200).json({ message: "Task successfully created." });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred during task creation. Please try again later.",
    });
  }
};
exports.getTask = (req, res) => {
  try {
    const task = req.task;
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while retrieving the task.",
    });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const task = req.task;
    const isReporter = task.reporter.toString() === req.auth._id.toString();

    if (!isReporter) {
      return res.status(403).json({
        error: "You are not authorized to perform this action",
      });
    }

    await task.deleteOne();
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while deleting the task.",
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = req.task;
    const isReporter = task.reporter.toString() === req.auth._id.toString();

    if (!isReporter) {
      return res.status(403).json({
        error: "You are not authorized to perform this action",
      });
    }

    await Task.updateOne({ _id: task._id }, req.body);
    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while updating the task.",
    });
  }
};

exports.taskById = async (req, res, next, id) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        error: "Task not found.",
      });
    }
    req.task = task;
    next();
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while retrieving the task.",
    });
  }
};
