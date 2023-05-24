const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const { userSignupValidator } = require("../validators");

router.post("/signup", userSignupValidator, authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
