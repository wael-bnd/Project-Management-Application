const express = require("express");
const router = express.Router();

const projectController = require("../controllers/project");
const { projectValidator } = require("../validators");

router.post("/create", projectValidator, projectController.createProject);
router.get("/all", projectController.getAllProjects);
router.param("projectId", projectController.projectById);
router.get("/:projectId", projectController.getProject);
router.put("/:projectId", projectController.updateProject);
router.delete("/:projectId", projectController.deleteProject);
router.patch("/member/add/:projectId", projectController.addMemberToProject);
router.patch(
  "/member/remove/:projectId",
  projectController.removeMemberToProject
);
router.get("/tasks/all/:projectId", projectController.getTasksByProject);
router.get("/members/:projectId", projectController.getAllProjectMembers);
module.exports = router;
