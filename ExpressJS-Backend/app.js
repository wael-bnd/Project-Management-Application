const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

//DB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

//creating node server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("a node js API listening on port : " + port);
});
