import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function TransactionsAdmin() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/transactions`)
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📊 Transaction History</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Amount</th><th>Status</th><th>Order ID</th><th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx._id}>
              <td>{tx.clientName}</td>
              <td>{tx.clientEmail}</td>
              <td>₹{tx.amount}</td>
              <td>{tx.status}</td>
              <td>{tx.razorpayOrderId}</td>
              <td>{new Date(tx.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
