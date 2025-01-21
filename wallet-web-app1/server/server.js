require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const transactionRoutes = require("./api/transactions");
const budgetRoutes = require("./api/budgets");

const app = express();


app.use(express.json());
app.use(cors());


app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);


app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

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
    process.exit(1); 
  });
