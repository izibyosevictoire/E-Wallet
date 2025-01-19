const express = require("express");
const Transaction = require("../models/Transaction");
const Budget = require("../models/Budget");

const router = express.Router();

router.post("/", async (req, res) => {
  const { amount, category, subcategory, transactionType, account, date } = req.body;

  if (!amount || !category || !transactionType || !account) {
    // console.error("Missing fields:", req.body);
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const budget = await Budget.findOne({ category });
    if (budget) {
      const transactions = await Transaction.find({ category });
      const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

      if (totalSpent + amount > budget.budgetAmount) {
        return res.status(400).json({
          message: `Transaction exceeds budget for category '${category}'. Budget is ${budget.budgetAmount}.`,
        });
      }
    }

    
    const transaction = new Transaction({
      amount,
      category,
      subcategory,
      transactionType,
      account,
      date: date || new Date(),  
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(500).json({ message: "Failed to add transaction", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions", error: err.message });
  }
});


router.get("/report", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(query);

    const groupedTransactions = transactions.reduce((acc, transaction) => {
      const { account, amount, transactionType } = transaction;

      
      if (!acc[account]) {
        acc[account] = { in: 0, out: 0, transactions: [] };
      }

      if (transactionType.toLowerCase() === "income") {
        acc[account].in += amount;
      } else if (transactionType.toLowerCase() === "expense") {
        acc[account].out += Math.abs(amount);
      }
      acc[account].transactions.push(transaction);

      return acc;
    }, {});

    res.status(200).json(groupedTransactions);
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({
      message: "Failed to generate report",
      error: error.message,
    });
  }
});

module.exports = router;
