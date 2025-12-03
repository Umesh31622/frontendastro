import React, { useEffect, useState } from "react";
import { getTransactions, refundTransaction } from "../api/transactionApi";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const data = await getTransactions();
    setTransactions(data);
  };

  const handleRefund = async (id) => {
    await refundTransaction(id);
    fetchTransactions();
  };

  useEffect(() => { fetchTransactions(); }, []);

  return (
    <div>
      <h2>All Transactions</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>User</th><th>Plan</th><th>Amount</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t._id}>
              <td>{t.user?.name}</td>
              <td>{t.plan?.name}</td>
              <td>₹{t.amount}</td>
              <td>{t.status}</td>
              <td>{t.status === "SUCCESS" && <button onClick={() => handleRefund(t._id)}>Refund</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
