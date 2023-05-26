const User = require("../models/User");

exports.findUser = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while retrieving the user.",
    });
  }
};

exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select(
      "firstName lastName email role jobTitle createdAt updatedAt id"
    );
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while retrieving users.",
    });
  }
};

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select(
      "firstName lastName email role jobTitle createdAt updatedAt id"
    );
    if (!user) {
      return res.status(404).json({
        error: "User not found.",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      error: "An error occurred while retrieving the user.",
    });
  }
};
