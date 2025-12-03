import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export const getTransactions = async () => {
  const res = await axios.get(`${API_BASE}/transactions`);
  return res.data.txns || [];
};

export const refundTransaction = async (id) => {
  const res = await axios.put(`${API_BASE}/transactions/${id}/refund`);
  return res.data.txn;
};
