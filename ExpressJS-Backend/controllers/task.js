const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

exports.createTask = async (req, res) => {
  try {
    const { summary, description, issueType, estimation, assignee, project } =
      req.body;
    const user = await User.findById(req.auth._id);
    const projectObj = await Project.findById(project);
    if (
      (user.role !== "manager" || !projectObj.members.includes(req.auth._id)) &&
      projectObj.leader.toString() !== req.auth._id
    ) {
      return res.status(403).json({
        error: "You are not authorized to create tasks for this project",
      });
    }

    const task = new Task({
      summary,
      description,
      issueType,
      estimation,
      assignee,
      project,
    });
    task.reporter = req.auth._id;
    projectObj.lastTaskNumber++;
    task.key = projectObj.key + "-" + projectObj.lastTaskNumber.toString();

    await projectObj.save();
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
exports.setTaskAssignee = async (req, res) => {
  try {
    const task = req.task;
    const assignee = req.body.assignee.toString();
    const isReporter = task.reporter.toString() === req.auth._id.toString();
    const selfAssign = assignee === req.auth._id.toString();
    const project = await Project.findById(task.project);
    const isProjectMember = project.members.includes(req.auth._id.toString());

    if (!isReporter && !(selfAssign && isProjectMember)) {
      return res.status(403).json({
        error:
          "You are not authorized to perform this action. You can only assign to yourself.",
      });
    }

    const user = await User.findById(assignee);
    if (!user || !assignee) {
      return res.status(404).json({
        error: "User not found!",
      });
    }
    task.assignee = assignee;
    await task.save();
    res.status(200).json({
      message: "Task assigned successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while updating the task.",
    });
  }
};

exports.setTaskReporter = async (req, res) => {
  try {
    const task = req.task;
    const reporter = req.body.reporter.toString();
    const isReporter = task.reporter.toString() === req.auth._id.toString();
    const selfAssign = reporter === req.auth._id.toString();
    const user = await User.findById(reporter);
    const project = await Project.findById(task.project);
    const isProjectMember = project.members.includes(req.auth._id.toString());

    if (
      !isReporter &&
      !(selfAssign && isProjectMember && user.role === "manager")
    ) {
      return res.status(403).json({
        error: "You are not authorized to perform this action.",
      });
    }

    if (!user || !reporter) {
      return res.status(404).json({
        error: "User not found!",
      });
    }

    task.reporter = reporter;
    await task.save();

    res.status(200).json({
      message: "Task repoter updated successfully",
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
