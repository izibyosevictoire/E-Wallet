const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  budgetAmount: { type: Number, required: true },
});

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
