const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project");
const { projectValidator } = require("../validators");

router.post("/create", projectValidator, projectController.createProject);

module.exports = router;
