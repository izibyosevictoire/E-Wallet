import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionForm from "./TransactionForm";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/transactions');
          console.log(response.data);
        } catch (error) {
          console.error('Network Error:', error);
        }
      };
    // const fetchTransactions = async () => {
    //   const result = await axios("http://localhost:5000/api/transactions");
    //   setTransactions(result.data);
    // };
    fetchTransactions();
  }, []);

  //
  

  return (
    <div>
      <h1>Wallet Application</h1>
      <TransactionForm />
      {/* <h2>Transactions</h2> */}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.amount} - {transaction.category} - {transaction.transactionType}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
