import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/api/transactions`);
      setTransactions(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) return;
    try {
      await axios.delete(`${API}/api/transactions/${id}`);
      fetchTransactions();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Transactions</h2>
        <button onClick={fetchTransactions} className="px-3 py-1 bg-gray-700 text-white rounded">Refresh</button>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Client</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Amount</th>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Payment ID</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{t.clientName}</td>
                <td className="p-2">{t.clientEmail}</td>
                <td className="p-2">₹{t.amount}</td>
                <td className="p-2">{t.razorpayOrderId || '-'}</td>
                <td className="p-2">{t.razorpayPaymentId || '-'}</td>
                <td className="p-2">{t.status}</td>
                <td className="p-2">{new Date(t.createdAt).toLocaleString()}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(t._id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p className="p-2">Loading...</p>}
      </div>
    </div>
  );
}
