const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, jobTitle, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this email already exists!" });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      jobTitle,
      password,
    });
    await user.save();
    res.status(200).json({ message: "You have successfully signed up!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred during signup. Please try again later.",
    });
  }
};
