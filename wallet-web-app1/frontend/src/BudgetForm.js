import React, { useState } from "react";
import axios from "axios";
import "./BudgetForm.css";

const BudgetForm = () => {
  const [category, setCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgets, setBudgets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const budgetData = {
      category,
      budgetAmount: parseFloat(budgetAmount),
    };

    try {
      const response = await axios.post("https://e-wallet-liart.vercel.app/api/budgets", budgetData);
      setBudgets([...budgets, response.data]); 
      alert("Budget set successfully!");
      setCategory("");
      setBudgetAmount("");
    } catch (err) {
      alert("Failed to set budget. Please try again.");
    }
  };

  return (
    <div className="budget-form-container">
      <h2 className="form-title">Budgets</h2>
      <form className="budget-form" onSubmit={handleSubmit}>
      <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Utilities" >Utilities</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        <input
          type="number"
          placeholder="Budget Amount"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Set Budget
        </button>
      </form>
      <div className="budget-list-container">
        <h3 className="list-title">Existing Budgets</h3>
        <ul className="budget-list">
          {budgets.map((budget) => (
            <li key={budget._id} className="budget-item">
              <span>
                <strong>Category:</strong> {budget.category}
              </span>
              <span>
                <strong>Amount:</strong> {budget.budgetAmount}
              </span>
            </li>
          ))}
        </ul>
        {budgets.length === 0 && (
          <p className="notification">Add a your new budget to get started!</p>
        )}
      </div>
    </div>
  );
};

export default BudgetForm;
