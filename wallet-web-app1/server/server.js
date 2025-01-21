require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const transactionRoutes = require("./api/transactions");
const budgetRoutes = require("./api/budgets");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

// Serve static files from React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Catch-all route for serving React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8000;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  });
