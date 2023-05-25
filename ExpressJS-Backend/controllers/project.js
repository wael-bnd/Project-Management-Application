const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const { title, key } = req.body;
    const user = await User.findById(req.auth._id);
    console.log(user);
    if (user.role != "admin") {
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
    console.error(err);
    res.status(500).json({
      error:
        "An error occurred during project creation. Please try again later.",
    });
  }
};
