require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(`Datebase Error => ${error}`);
});
db.once("open", () => {
  console.log("Successfully connected to database");
});

app.use(cors());
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
