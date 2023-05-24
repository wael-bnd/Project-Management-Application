const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.get("/signout", authController.signout);

module.exports = router;
