const expressAsyncHandler = require("express-async-handler");
const Bike = require("../models/bikeModel");
const User = require("../models/userModel");

// Add a Complaint

const addBike = expressAsyncHandler(async (req, res) => {
  const { bike, complaint, registration, image } = req.body;

  if (!bike || !complaint || !registration || !image) {
    res.status(400);
    throw new Error("Please fill all details");
  }

  // check USER exists

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  const bikeComplaint = await Bike.create({
    userId: user.id,
    bike,
    complaint,
    registration,
    image,
    status: "open",
  });

  if (!bikeComplaint) {
    res.status(401);
    throw new Error("Error Registering Complaint");
  }

  res.status(201);
  res.json(bikeComplaint);
});

// Get all complaints of an user

const getBikes = expressAsyncHandler(async (req, res) => {
  // check for USER existence
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  const bikes = await Bike.find({ userId: user.id });

  if (!bikes) {
    res.status(404);
    throw new Error("No Complaints Found");
  }

  res.status(200);
  res.json(bikes);
});

// Review a particular complaint

const getBike = expressAsyncHandler(async (req, res) => {
  // validate user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  // find the complaint
  const bikeComplaint = await Bike.findById(req.params.id);
  if (!bikeComplaint) {
    res.status(404);
    throw new Error("Complaint Not Found");
  }

  res.status(200);
  res.json(bikeComplaint);
});

// Update Complaint

const updateBike = expressAsyncHandler(async (req, res) => {
  // validate user
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("Unauthorized Access");
  }

  // Update complaint
  const updatedComplaint = await Bike.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  if (!updatedComplaint) {
    res.status(400);
    throw new Error("Error updating Complaint");
  }

  res.status(200);
  res.json(updatedComplaint);
});

module.exports = { addBike, getBikes, getBike, updateBike };
