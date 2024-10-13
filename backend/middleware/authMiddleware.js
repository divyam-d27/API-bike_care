const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  // Check the request Object. Does it contain TOKEN ?
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract TOKEN
    const token = req.headers.authorization.split(" ")[1];

    try {
      // VERIFY TOKEN
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // FIND THE USER associated with the token
      const user = await User.findById(decoded.id).select("-password");

      // Adding the found user object into the request object
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401);
        throw new Error("Unauthorized access");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized access");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized access");
  }
});

module.exports = authMiddleware;
