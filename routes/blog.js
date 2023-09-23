const express = require("express");
const router = express.Router();
const BlogPost = require("../models/blog");

const { getBlogPost } = require("../middleware/getBlogPost");

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get blog post details
router.get("/:id", getBlogPost, (req, res) => {
  console.log("res.post in get post details => ", res.post);
  res.json(res.post);
});

// Create a new blog post
router.post("/", async (req, res) => {
  const { title, description, tags, imageURL, content } = req.body;

  const post = new BlogPost({
    title,
    description,
    tags,
    imageURL,
    content,
  });

  try {
    const newPost = await post.save();
    console.log("New post created => ", post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update an existing blog post
router.patch("/:id", getBlogPost, async (req, res) => {
  const { title, description, tags, imageURL, content } = req.body;

  if (title) {
    res.post.title = title;
  }

  if (description) {
    res.post.description = description;
  }

  if (tags) {
    res.post.tags = tags;
  }

  if (imageURL) {
    res.post.imageURL = imageURL;
  }

  if (content) {
    res.post.content = content;
  }

  try {
    const updatedPost = await res.post.save();
    console.log("Updated blog post => ", updatedPost);
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a blog post
router.delete("/:id", getBlogPost, async (req, res) => {
  try {
    await res.post.deleteOne();
    res.json({ message: "Successfully deleted blog post." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
