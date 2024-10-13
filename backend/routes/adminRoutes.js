const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const {
  getAllUsers,
  getUserComplaints,
  getBikeNotes,
  deleteComplaint,
} = require("../controllers/adminControllers");

const router = express.Router();

// get all users

// METHOD : GET
// ACCESS : PRIVATE
// ENDPOINT : /api/admin

router.get("/users", adminAuth, getAllUsers);

// get all complaints of a particular user

// METHOD : GET
// ACCESS : PRIVATE
// ENDPOINT : /api/admin

router.get("/user/bike/:id", adminAuth, getUserComplaints);

// get all notes regarding a complaint

// METHOD : GET
// ACCESS : PRIVATE
// ENDPOINT : /api/admin

router.get("/user/bike/note/:id", adminAuth, getBikeNotes);

// Delete a complaint

// METHOD : DELETE
// ACCESS : PRIVATE
// ENDPOINT : /api/admin

router.get("/user/bike/delete/:id", adminAuth, deleteComplaint);

module.exports = router;
