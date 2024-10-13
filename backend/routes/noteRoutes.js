const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getNotes, addNote } = require("../controllers/noteControllers");

const router = express.Router({ mergeParams: true });

// GET ALL NOTES
// ADD NOTE

// Method: GET / POST
// Access: PRIVATE
// EndPoint: /api/bike/:id/note/

router.route("/").get(authMiddleware, getNotes).post(authMiddleware, addNote);

module.exports = router;
