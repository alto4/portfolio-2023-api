const BlogPost = require("../models/blog");

const getBlogPost = async (req, res, next) => {
  let post;

  try {
    post = await BlogPost.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Blog post not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.post = post;
  next();
};

module.exports = { getBlogPost };
