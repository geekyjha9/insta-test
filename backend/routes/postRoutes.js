const express = require("express");
const {isLogin} = require('../middlewares/isLogin')
const router = express.Router();
const postController = require("../controllers/postController.js")



router.post("/createpost",isLogin,postController.createPost);


module.exports = router