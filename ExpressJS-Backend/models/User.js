const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    jobTitle: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "member"],
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// Virtual field for the password
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// Methods
userSchema.methods = {
  authenticate: function (plainTextPassword) {
    return this.encryptPassword(plainTextPassword) === this.hashedPassword;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, "sha512")
        .toString("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
