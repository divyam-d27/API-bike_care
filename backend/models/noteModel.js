const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isStaff: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Note", noteSchema);
