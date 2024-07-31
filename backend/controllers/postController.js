const { Post } = require('../models');
const { body, validationResult } = require('express-validator');

// Validation rules
const validateCreatePost = [
    body('caption').notEmpty().withMessage('Caption is required'),
    body('image').notEmpty().withMessage('Image is required'),
];

// Create a new post
const createPost = async (req, res) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { caption, image, hashtag } = req.body;
    const userId = req.user.id; // Assuming you have user information in req.user from a middleware

    try {
        // Create the new post
        const newPost = await Post.create({ caption, image, hashtag, userId });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ message: error.errors.map(e => e.message).join(', ') });
        }
        res.status(500).json({ message: 'Internal server error.' });
    }
};




module.exports = { createPost, validateCreatePost };
