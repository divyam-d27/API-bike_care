const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addBike,
  getBikes,
  getBike,
  updateBike,
} = require("../controllers/bikeControllers");

const router = express.Router();

// GET ALL BIKES COMPLAINTS
// ADD BIKE COMPLAINT

// Method: GET / POST
// Access: PRIVATE
// EndPoint: /api/bike

router.route("/").post(authMiddleware, addBike).get(authMiddleware, getBikes);

// GET SINGLE BIKE COMPLAINT

// Method: GET
// Access: PRIVATE
// EndPoint: /api/bike/:id

router.route("/:id").get(authMiddleware, getBike);

// UPDATE BIKE COMPLAINT

// Method: PUT
// Access: PRIVATE
// EndPoint: /api/bike/close/:id

router.put("/close/:id", authMiddleware, updateBike);

// Routes for NOTE

// Method: GET
// Access: PRIVATE
// EndPoint: /api/bike/:id/note

router.use("/:id/note", require("./noteRoutes"));

module.exports = router;
