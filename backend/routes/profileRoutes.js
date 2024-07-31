const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profileController");
const authorizeUser = require("../middlewares/authorizeUser");


router.get("/profile",authorizeUser,profileController.getProfile)

module.exports = router