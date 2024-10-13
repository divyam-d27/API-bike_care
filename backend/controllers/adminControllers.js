const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Bike = require("../models/bikeModel");
const Note = require("../models/noteModel");

// GET ALL USERS

const getAllUsers = expressAsyncHandler(async (req, res) => {
  // Fetching all users
  const allUsers = await User.find();
  if (!allUsers) {
    res.status(400);
    throw new Error("No users found");
  }
  res.status(200).json(allUsers);
});

// GET ALL COMPLAINTS associated to a particular user

const getUserComplaints = expressAsyncHandler(async (req, res) => {
  // get all complaints of a particular user
  const allComplaints = await Bike.find({ userId: req.params.id });
  if (!allComplaints) {
    res.status(400);
    throw new Error("No complaints found");
  }
  res.status(200).json(allComplaints);
});

// GET ALL NOTES associated to current bike

const getBikeNotes = expressAsyncHandler(async (req, res) => {
  // getting notes
  const notes = await Note.find({ bikeId: req.params.id });
  if (!notes) {
    res.status(400);
    throw new Error("No Notes found");
  }
  res.status(200).json(notes);
});

// DELETE A COMPLAINT

const deleteComplaint = expressAsyncHandler(async (req, res) => {
  const deletedComplaint = await Bike.findByIdAndDelete(req.params.id);

  res.status(200).json({
    msg: "Deleted Successfully",
    deletedComplaint,
  });
});

module.exports = {
  getAllUsers,
  getUserComplaints,
  getBikeNotes,
  deleteComplaint,
};
