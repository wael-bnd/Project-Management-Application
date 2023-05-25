const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv.config();
const app = express();

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const projectRoutes = require("./routes/project");
const {
  requireSignin,
  handleUnauthorizedError,
} = require("./controllers/auth");

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Public routes
app.use("/api/user", authRoutes);

// Private routes
app.use(requireSignin);
app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/project", projectRoutes);
app.use(handleUnauthorizedError);

// Creating node server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Node.js API listening on port: " + port);
});
