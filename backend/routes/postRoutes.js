const express = require("express");
const router = express.Router();
const { createPost, validateCreatePost, getAllPost } = require("../controllers/postController.js");
const authorizeUser = require("../middlewares/authorizeUser.js");

router.post("/create", authorizeUser, validateCreatePost, createPost);
router.get("/getAll", getAllPost)

module.exports = router