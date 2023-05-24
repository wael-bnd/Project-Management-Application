const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
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

    const user = new User({ firstName, lastName, email, jobTitle, password });
    await user.save();

    res.status(200).json({ message: "You have successfully signed up!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "An error occurred during signup. Please try again later.",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please sign up.",
      });
    }

    const passwordMatch = user.authenticate(password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Email and password do not match." });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.cookie("accessToken", token, { httpOnly: true });

    const { _id, firstName, lastName, jobTitle } = user;
    return res.json({
      token,
      userData: { firstName, lastName, jobTitle },
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred while signing in." });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("accessToken");
  return res.json({ message: "You have successfully signed out!" });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ["HS256"],
}).unless({
  path: [
    // paths that should bypass authentication
    "/api/user/signup",
    "/api/user/sigin",
  ],
});

exports.handleUnauthorizedError = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res
      .status(401)
      .json({ error: "Unauthorized Access: Invalid or expired token" });
  }
};
