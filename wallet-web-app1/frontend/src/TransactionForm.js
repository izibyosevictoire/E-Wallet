import React, { useState } from "react";
import axios from "axios";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("bank");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [transactionType, setTransactionType] = useState("expense");

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
      alert("Transaction added successfully!");
    } catch (err) {
      alert("Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="Subcategory"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      />
      <select
        value={transactionType}
        onChange={(e) => setTransactionType(e.target.value)}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <select value={account} onChange={(e) => setAccount(e.target.value)}>
        <option value="bank">Bank</option>
        <option value="mobileMoney">Mobile Money</option>
        <option value="cash">Cash</option>
      </select>
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default TransactionForm;
