const mongoose = require("mongoose");

// Project: title, description, skills, imageURL, githubURL, demoURL
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  githubURL: {
    type: String,
  },
  imageURL: {
    type: String,
    required: true,
  },
  demoURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
