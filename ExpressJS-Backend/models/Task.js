const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema(
  {
    summary: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    key: {
      type: String,
      required: true,
    },
    issueType: {
      type: String,
      enum: ["story", "test", "bug"],
      required: true,
    },
    estimation: {
      type: Number,
      enum: [1, 2, 3, 5, 8, 13, 21],
    },
    project: {
      type: ObjectId,
      ref: "Project",
      required: true,
    },
    reporter: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    assignee: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Task", taskSchema);
