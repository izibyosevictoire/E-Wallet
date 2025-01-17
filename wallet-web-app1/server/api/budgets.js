const express = require("express");
const Budget = require("../models/Budget");

const router = express.Router();

// POST a new budget
router.post("/", async (req, res) => {
  try {
    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET all budgets
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.json(budgets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;