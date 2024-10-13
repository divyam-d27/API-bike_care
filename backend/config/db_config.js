const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected: ${conn.connection.name}`);
  } catch (error) {
    console.log(`DB connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
