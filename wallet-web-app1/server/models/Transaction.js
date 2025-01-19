const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  account: { type: String, required: true },
  transactionType: { type: String, required: true }, 
  category: { type: String, required: true },
  subcategory: { type: String },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
