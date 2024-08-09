const { Post, User } = require("../models");
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

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    as: "postedBy",
                    attributes: ["username"]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        const formattedPosts = posts.map((post) => ({
            id: post.id,
            profileImg: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
            username: post.postedBy.username,
            time: post.createdAt,
            postImg: post.image,
            likeCount: 150,
            commentCount: 20,
            caption: post.caption

        }));
        res.status(200).json(formattedPosts)
    } catch (error) {
        console.log("Error fetching posts :" + error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const likePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        // Find the post and update it by adding the user's ID to the likes array
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "User already liked this post" });
        }

        // Add the user ID to the likes array
        post.likes.push(userId);
        await post.save();

        // Return the updated post
        res.status(200).json(post);

    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}


const unlikePost = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user.id;

    try {
        // Find the post and update it by removing the user's ID from the likes array
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: "User has not liked this post" });
        }

        // Remove the user ID from the likes array
        post.likes = post.likes.filter(id => id !== userId);
        await post.save();

        // Return the updated post
        res.status(200).json(post);

    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = { createPost, validateCreatePost, getAllPost, likePost, unlikePost }