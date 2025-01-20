
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");


app.use(express.static(path.join(__dirname, 'frontend', 'build')));


app.get('/api', (req, res) => {
  res.send('Welcome to the E-Wallet Backend API');
});

const transactionRoutes = require("./api/transactions");
const budgetRoutes = require("./api/budgets");
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});


const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});