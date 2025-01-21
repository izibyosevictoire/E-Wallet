import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { jsPDF } from "jspdf";
import "./TransactionForm.css";

const TransactionForm = () => {
  const [amount, setAmount] = useState("");
  const [account, setAccount] = useState("bank");
  const [category, setCategory] = useState("Utilities");
  const [subcategory, setSubcategory] = useState("");
  const [transactionType, setTransactionType] = useState("expense");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState("");
  const [report, setReport] = useState([]);
  const [startDate, setStartDate] = useState("");  
  const [endDate, setEndDate] = useState(""); 

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const transactionData = {
      amount: parseFloat(amount),
      account,
      category,
      subcategory,
      transactionType,
      date,
    };
   
    try {
      const response = await axios.post("http://localhost:8000/api/transactions", transactionData);
      setTransactions([...transactions, response.data]);
      setNotification(""); 
      alert("Transaction added successfully!");
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        setNotification(error.response.data.message);
      } else {
        alert("Failed to add transaction");
      }
    }
  };
  const handleGenerateReport = async () => {
    try {
      
      const response = await axios.get("http://localhost:8000/api/transactions/report", {
        params: { startDate, endDate }, 
      });
      console.log("Report data:", response.data);
      setReport(response.data);
      generatePDF(response.data);  
    } catch (error) {
      alert("Failed to generate report");
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 100, 100);
    let y = 20;  

    for (const account in data) {
      if (data.hasOwnProperty(account)) {
        doc.text(`Account: ${account}`, 20, y);
        y += 10;

        doc.text(`In: ${data[account].in}`, 20, y);
        y += 10;
        doc.text(`Out: ${data[account].out}`, 20, y);
        y += 10;

        
        data[account].transactions.forEach((transaction) => {
          doc.text(
            `${transaction.date} - ${transaction.transactionType}: $${transaction.amount} (Category: ${transaction.category}, Subcategory: ${transaction.subcategory})`,
            20,
            y
          );
          y += 10;
        });
        y += 10; 
      }
    }

    doc.save("The_transaction_report.pdf"); 
  };

  return (
    <div className="transaction-form-container">
      <div className="form-container">
        {notification && <div className="notification">{notification}</div>}
        <form className="transaction-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Transactions</h2>
          <input
            className="form-input"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" ></option>
             <option value="Utilities" >Utilities</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Groceries">Groceries</option>
            <option value="Entertainment">Entertainment</option>
          </select>
          <input
            className="form-input"
            type="text"
            placeholder="Subcategory"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
          />
          <input
            className="form-input"
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className="form-select"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
             <option value=""></option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select
            className="form-select"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          >
            <option value=""></option>
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
                <span><strong>Date:</strong> {transaction.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="report-form">
          <h2>Generate Report</h2>
          <input
            type="date"
            className="form-input"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="form-input"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className="form-button" onClick={handleGenerateReport}>
            Get Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
