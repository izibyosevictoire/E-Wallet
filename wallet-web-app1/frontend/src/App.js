import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import axios from "axios";
import TransactionForm from "./TransactionForm";
import BudgetForm from "./BudgetForm";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://e-wallet-liart.vercel.app/api/transactions");
        setTransactions(response.data);
      } catch (err) {
        console.error("Network Error:", err);
      }
    };

    fetchTransactions();
  }, []);

  

  return (
    <Router>
      <div>
       
        <nav>
          <ul>
            <li>
              <Link to="/budgets">Budgets</Link>
            </li>
            <li>
              <Link to="/transactions">Transactions</Link>
            </li>
          </ul>
        </nav>

       
        <h1>Wallet Application</h1>

        <Routes>
          
          <Route path="/" element={<Navigate to="/budgets" />} />

          
          <Route path="/budgets" element={<BudgetForm />} />

          
          <Route
            path="/transactions"
            element={
              <div>
                <TransactionForm />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
