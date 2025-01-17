import React, { useState } from "react";
import axios from "axios";
import "./TransactionForm.css"; 

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("bank");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      amount,
      account,
      category,
      subcategory,
      transactionType,
    };

    try {
      await axios.post("http://localhost:5000/api/transactions", transactionData);
      setTransactions([...transactions, transactionData]);
      alert("Transaction added successfully!");
    } catch (err) {
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="transaction-form-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Transaction</h2>
        <input
          className="form-input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Subcategory"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
        <select
          className="form-select"
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select
          className="form-select"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        >
          <option value="bank">Account</option>
          <option value="bank">Bank</option>
          <option value="mobileMoney">Mobile Money</option>
          <option value="cash">Cash</option>
        </select>
        <button className="form-button" type="submit">Add Transaction</button>
      </form>

      <div className="transaction-list-container">
        <h2 className="list-title">Transaction List</h2>
        <ul className="transaction-list">
          {transactions.map((transaction, index) => (
            <li key={index} className="transaction-item">
              <span><strong>Amount:</strong> {transaction.amount}</span>
              <span><strong>Account:</strong> {transaction.account}</span>
              <span><strong>Category:</strong> {transaction.category}</span>
              <span><strong>Subcategory:</strong> {transaction.subcategory}</span>
              <span><strong>Type:</strong> {transaction.transactionType}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionForm;
