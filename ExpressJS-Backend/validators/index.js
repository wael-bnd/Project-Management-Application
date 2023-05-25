const { check, validationResult, body } = require("express-validator");

const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]{2,3}){1,2}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;

exports.userSignupValidator = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("First name must be between 3 and 20 characters"),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Last name must be between 3 and 20 characters"),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 8, max: 40 })
    .withMessage("Email must be between 8 and 40 characters")
    .matches(emailRegExp)
    .withMessage("Email must contain a valid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(passwordRegExp)
    .withMessage(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];
exports.taskValidator = [
  body("summary").notEmpty().withMessage("Summary is required."),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),
  body("issueType")
    .notEmpty()
    .withMessage("IssueType is required.")
    .isIn(["story", "test", "bug"])
    .withMessage("Invalid issueType."),
  body("estimation")
    .optional()
    .isIn([1, 2, 3, 5, 8, 13, 20])
    .withMessage("Invalid estimation value."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];
exports.projectValidator = [
  body("title").notEmpty().withMessage("title is required."),
  body("key")
    .notEmpty()
    .withMessage("key is required.")
    .isLength({ min: 2, max: 5 })
    .withMessage("key  must be between 2 and 5 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
];
