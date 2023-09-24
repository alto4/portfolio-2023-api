require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  // allow preflight
  if (req.method === "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

db.on("error", (error) => {
  console.error(`Datebase Error => ${error}`);
});
db.once("open", () => {
  console.log("Successfully connected to database");
});

app.use(express.json());

const contactRouter = require("./routes/contact");
const projectRouter = require("./routes/project");
const blogRouter = require("./routes/blog");

app.use("/contact", contactRouter);
app.use("/project", projectRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
