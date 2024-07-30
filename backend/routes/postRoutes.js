const express = require("express");
const router = express.Router();
const { createPost, validateCreatePost, getAllPosts } = require("../controllers/postController.js");
const authorizeUser = require("../middlewares/authorizeUser.js");

router.post("/create", authorizeUser, validateCreatePost, createPost);
// Get all posts
router.get('/getAll', authorizeUser, getAllPosts);

module.exports = router