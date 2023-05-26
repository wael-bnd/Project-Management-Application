const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const userController = require("../controllers/user");

router.get("/signout", authController.signout);
router.get("/all", userController.findAllUsers);
router.param("userId", userController.userById);
router.get("/:userId", userController.findUser);

module.exports = router;
