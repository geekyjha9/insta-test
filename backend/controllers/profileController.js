// controllers/profileController.js
const Post = require("../models/Post");

const getProfile = async (req, res) => {
  try {
    const { id, fullname , username } = req.user;

    // Find posts by user ID
    const posts = await Post.findAll({
      where: { userId: id },
      attributes: ['image'], // Only select the image field
    });

    // Extract images from posts
    const images = posts.map(post => post.image);

    res.status(200).json({
      success: true,
      user: {
        id,
        fullname,
        username,
      },
      images,
    });
  } catch (err) {
    console.error('Error fetching profile data:', err);
    res.status(500).json({
      success: false,
      message: "Internal server error. ",
    });
  }
};

module.exports = {getProfile};
