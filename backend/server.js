const express = require("express");

const connectDB = require("./config/db_config");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// body-parser
app.use(express.json());
// body-parser for urlencoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Running");
});

// User routes
app.use("/api/user", require("./routes/userRoutes"));

// Bike routes
app.use("/api/bike", require("./routes/bikeRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));

// Error handler middleware || this will be triggered whenever we "throw new Error()"
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`);
});
