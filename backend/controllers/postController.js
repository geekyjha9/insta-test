const { Post ,User} = require("../models");
const { body, validationResult } = require("express-validator");

const validateCreatePost = [
    body('caption').notEmpty().withMessage("Caption is required"),
    body('image').notEmpty().withMessage("Image is required")
]

const createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { caption, image, hashtag } = req.body;
    const userId = req.user.id;
    try {
        const newPost = await Post.create({ caption, image, hashtag, userId });
        res.status(201).json(newPost)

    } catch (error) {
        console.error('Error creating posts:', error);
        res.status(500).json({ message: "Internal server error" })

    }
}

// Fetch all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: "postedBy",
                    attributes: ["username"] // Assuming 'profileImg' is a field in User model
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        const formattedPosts = posts.map(post => ({
            id: post.id,
            username: post.postedBy.username,
            profileImg: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
            postImg: post.image,
            caption: post.caption,
            likeCount: 6, // Assuming you have a likes count field
            commentCount: 8, // Assuming you have a comments count field
            time: post.createdAt // Adjust the format as necessary
        }));

        res.status(200).json(formattedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createPost, validateCreatePost,getAllPosts }