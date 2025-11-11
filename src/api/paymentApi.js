// import axios from "axios";

// const API_URL = "https://adminastrotalk-1.onrender.com/api/payments";

// // ===== CREATE RAZORPAY ORDER =====
// export const createOrder = async ({ amount, userId }) => {
//   try {
//     const res = await axios.post(`${API_URL}/create-order`, { amount, userId });
//     return res.data;
//   } catch (err) {
//     console.error("Error creating order:", err.response?.data || err.message);
//     return null;
//   }
// };

// // ===== VERIFY PAYMENT =====
// export const verifyPayment = async (paymentData) => {
//   try {
//     const res = await axios.post(`${API_URL}/verify`, paymentData);
//     return res.data;
//   } catch (err) {
//     console.error("Error verifying payment:", err.response?.data || err.message);
//     return null;
//   }
// };

// import axios from "axios";

// const API_URL = "https://adminastrotalk-1.onrender.com/api/payments";

// // ================= CREATE ORDER =================
// export async function createOrder({ amount, userId }) {
//   try {
//     console.log("🧾 Sending order request:", { amount, userId });
//     const res = await axios.post(`${API_URL}/create-order`, { amount, userId });
//     console.log("📦 Order API Response:", res.data);
//     return res.data; // returns { success, order }
//   } catch (err) {
//     console.error("❌ Error creating order:", err.response?.data || err.message);
//     return null;
//   }
// }

// // ================= VERIFY PAYMENT =================
// export async function verifyPayment(paymentData) {
//   try {
//     const res = await axios.post(`${API_URL}/verify`, paymentData);
//     console.log("✅ Verify API Response:", res.data);
//     return res.data;
//   } catch (err) {
//     console.error("❌ Error verifying payment:", err.response?.data || err.message);
//     return null;
//   }
// }


import axios from "axios";

const API_URL = "https://adminastrotalk-1.onrender.com/api/payments";

// ================= CREATE ORDER =================
export async function createOrder({ amount, userId, planId }) {
  try {
    console.log("🧾 Sending order request:", { amount, userId, planId });
    const res = await axios.post(`${API_URL}/create-order`, { amount, userId, planId });
    return res.data;
  } catch (err) {
    console.error("❌ Error creating order:", err.response?.data || err.message);
    return null;
  }
}

// ================= VERIFY PAYMENT =================
export async function verifyPayment(paymentData) {
  try {
    const res = await axios.post(`${API_URL}/verify`, paymentData);
    console.log("✅ Verify API Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Error verifying payment:", err.response?.data || err.message);
    return null;
  }
}
