const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task");

router.param("taskId", taskController.taskById);

router.post("/create", taskController.createTask);
router.get("/:taskId", taskController.getTask);
router.delete("/:taskId", taskController.deleteTask);
router.put("/:taskId", taskController.updateTask);
router.patch("/assign/:taskId", taskController.setTaskAssignee);
router.patch("/reporter/:taskId", taskController.setTaskReporter);

module.exports = router;
