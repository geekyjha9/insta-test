const Post = require('../models/post.js');

// Create a new post
const createPost = async (req, res) => {
  const { caption, image, hashtag } = req.body;
  try {
    const newPost = new Post({ caption, image, hashtag });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports={createPost};