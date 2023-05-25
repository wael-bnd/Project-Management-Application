const express = require("express");
const router = express.Router();

const taskController = require("../controllers/task");
const { taskValidator } = require("../validators");

router.param("taskId", taskController.taskById);

router.post("/create", taskValidator, taskController.createTask);
router.get("/:taskId", taskController.getTask);
router.delete("/:taskId", taskController.deleteTask);
router.put("/:taskId", taskValidator, taskController.updateTask);
router.patch("/assign/:taskId", taskController.setTaskAssignee);
router.patch("/reporter/:taskId", taskController.setTaskReporter);

module.exports = router;
