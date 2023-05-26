const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project");
const { projectValidator } = require("../validators");

router.post("/create", projectValidator, projectController.createProject);
router.get("/all", projectController.getAllProjects);
router.param("projectKey", projectController.projectByKey);
router.get("/:projectKey", projectController.getProject);
router.put("/:projectKey", projectController.updateProject);
router.delete("/:projectKey", projectController.deleteProject);

module.exports = router;
