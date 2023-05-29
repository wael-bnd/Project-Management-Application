const Project = require("../models/Project");
const User = require("../models/User");
const Task = require("../models/Task");

exports.createProject = async (req, res) => {
  try {
    const { title, key } = req.body;
    const user = await User.findById(req.auth._id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to create projects" });
    }

    const project = new Project({ title });
    project.leader = req.auth._id;
    project.key = key.toUpperCase();
    await project.save();

    res.status(200).json({ message: "Project successfully created." });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      return res.status(409).json({
        error: "Key already exists. Please try another key.",
      });
    }

    console.error(err);
    res.status(500).json({
      error:
        "An error occurred during project creation. Please try again later.",
    });
  }
};
exports.getProject = (req, res) => {
  try {
    const project = req.project;
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while retrieving the project.",
    });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while retrieving projects.",
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = req.project;
    const isLeader = project.leader.toString() === req.auth._id.toString();

    if (!isLeader) {
      return res.status(403).json({
        error: "You are not authorized to perform this action",
      });
    }

    await project.deleteOne();
    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while deleting the project.",
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = req.project;
    const isLeader = project.leader.toString() === req.auth._id.toString();

    if (!isLeader) {
      return res.status(403).json({
        error: "You are not authorized to perform this action",
      });
    }
    let { title, key, members } = req.body;
    key = key.toUpperCase();
    await Project.updateOne({ _id: project._id }, { title, key, members });
    res.status(200).json({
      message: "Project updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while updating the project.",
    });
  }
};
exports.addMemberToProject = async (req, res) => {
  try {
    const project = req.project;
    const isLeader = project.leader.toString() === req.auth._id.toString();

    if (!isLeader) {
      return res.status(403).json({
        error: "You are not authorized to perform this action",
      });
    }
    const { member } = req.body;

    const memberExist = project.members.includes(member);
    if (memberExist) {
      return res.status(409).json({
        error: "The user is already a project member.",
      });
    }
    project.members.push(member);
    await project.save();
    res.status(200).json({
      message: "Member added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while updating the project.",
    });
  }
};

exports.removeMemberToProject = async (req, res) => {
  try {
    const project = req.project;
    const isLeader = project.leader.toString() === req.auth._id.toString();

    if (!isLeader) {
      return res.status(403).json({
        error: "You are not authorized to perform this action",
      });
    }
    const { member } = req.body;

    const memberIndex = project.members.indexOf(member);
    if (memberIndex === -1) {
      return res.status(409).json({
        error: "The user is not a project member.",
      });
    }
    project.members.splice(memberIndex, 1);

    await project.save();
    res.status(200).json({
      message: "Member removed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while updating the project.",
    });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {
    const project = req.project;
    const tasks = await Task.find({ project: project._id });
    res.status(200).json({
      tasks: tasks,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while retrieving the project tasks.",
    });
  }
};
exports.projectById = async (req, res, next, id) => {
  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        error: "Project not found.",
      });
    }
    req.project = project;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to retrieve the project. Please try again later.",
    });
  }
};
