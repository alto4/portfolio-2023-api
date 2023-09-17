const express = require("express");
const router = express.Router();
const Project = require("../models/project");

const { getProject } = require("../middleware/getProject");

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project details
router.get("/:id", getProject, (req, res) => {
  res.json(res.project);
});

// Create a new project
router.post("/", async (req, res) => {
  const { title, description, skills, githubURL, imageURL, demoURL } = req.body;

  const project = new Project({
    title,
    description,
    skills,
    githubURL,
    imageURL,
    demoURL,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing project
router.patch("/:id", getProject, async (req, res) => {
  const { title, description, skills, githubURL, imageURL, demoURL } = req.body;

  if (title) {
    res.project.title = title;
  }

  if (description) {
    res.project.description = description;
  }

  if (skills) {
    res.project.skills = skills;
  }

  if (githubURL) {
    res.project.githubURL = githubURL;
  }

  if (imageURL) {
    res.project.imageURL = imageURL;
  }

  if (demoURL) {
    res.project.demoURL = demoURL;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a project
router.delete("/:id", getProject, async (req, res) => {
  try {
    await res.project.deleteOne();
    res.json({ message: "Successfully deleted project." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
