import axios from "axios";

const API_URL = "/api/payments";

// ===== CREATE RAZORPAY ORDER =====
export const createOrder = async ({ amount, userId }) => {
  try {
    const res = await axios.post(`${API_URL}/create-order`, { amount, userId });
    return res.data;
  } catch (err) {
    console.error("Error creating order:", err.response?.data || err.message);
    return null;
  }
};

// ===== VERIFY PAYMENT =====
export const verifyPayment = async (paymentData) => {
  try {
    const res = await axios.post(`${API_URL}/verify`, paymentData);
    return res.data;
  } catch (err) {
    console.error("Error verifying payment:", err.response?.data || err.message);
    return null;
  }
};
