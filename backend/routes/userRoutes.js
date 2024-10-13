const express = require("express");
const {
  registerUser,
  loginUser,
  privateController,
} = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// user register
router.post("/", registerUser);

// login user
router.post("/login", loginUser);

// private
router.post("/private", authMiddleware, privateController);

module.exports = router;
