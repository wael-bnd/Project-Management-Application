const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      unique: true,
      required: true,
    },
    leader: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    lastTaskNumber: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Project", projectSchema);
