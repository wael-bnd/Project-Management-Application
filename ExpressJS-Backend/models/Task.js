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
    issueType: {
      type: String,
      enum: ["story", "test", "bug"],
      required: true,
    },
    estimation: {
      type: Number,
      enum: [1, 2, 3, 5, 8, 13, 20],
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
  { timestamps: true, versionKey: "__v" }
);

module.exports = mongoose.model("Task", taskSchema);
