const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModel");

// GET ALL NOTES of current user for a particular bike

const getNotes = expressAsyncHandler(async (req, res) => {
  // Check for user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  // Get Notes

  const notes = await Note.find({ bikeId: req.params.id });

  if (!notes) {
    res.status(404);
    throw new Error("No Notes Found");
  }

  res.status(200);
  res.json(notes);
});

// ADD NOTE

const addNote = expressAsyncHandler(async (req, res) => {
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  // Check for user
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  // Create Note

  const note = await Note.create({
    userId: user.id,
    bikeId: req.params.id,
    text,
  });

  if (!note) {
    res.status(400);
    throw new Error("Error creating note");
  }

  res.status(201);
  res.json(note);
});

module.exports = { getNotes, addNote };
