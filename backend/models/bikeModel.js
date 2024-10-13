const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bike: {
      type: String,
      enum: ["RS200", "NS200", "220F", "N160", "NS125", "Platina"],
    },
    registration: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    complaint: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "pending", "closed"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bike", bikeSchema);
