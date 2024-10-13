const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// REGISTER NEW USER

// METHOD : POST
// ACCESS : PUBLIC
// ENDPOINT : /api/user/

const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(401).json({ message: "All fields are required" });
    throw new Error("All fields are required");
  }
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    res.status(409).json({ message: "User already exists" });
    throw new Error("User already exists");
  }

  // HASHING PASSWORD
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const user = await User.create({ name, email, password: hashPass });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data received" });
  }
});

// LOGIN USER

// METHOD : POST
// ACCESS : PUBLIC
// ENDPOINT : /api/user/login

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    // res.status(400);
    // res.json({ message: "All fields are required" });
    throw new Error("All fields are required"); // ==>> triggers "errorHandler" middleware
  }
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});

// PRIVATE

// METHOD : POST
// ACCESS : PRIVATE
// ENDPOINT : /api/user/private

const privateController = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
  });
};

// GENERATE JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  privateController,
};
