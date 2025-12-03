// import React from "react";
// import axios from "axios";

// export default function PaymentButton({ amount }) {
//   const API_BASE = "https://adminastrotalk-1.onrender.com/api/payments";

//   const loadScript = (src) => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = src;
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const displayRazorpay = async () => {
//     const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//     if (!res) {
//       alert("Razorpay SDK failed to load. Please check your internet.");
//       return;
//     }

//     const result = await axios.post(`${API_BASE}/create-order`, { amount });

//     if (!result.data.success) {
//       alert("Server error while creating order.");
//       return;
//     }

//     const { order } = result.data;

//     const options = {
//       key: "rzp_test_7m8iz2GqqZ6H9C",
//       amount: order.amount,
//       currency: "INR",
//       name: "Astrology Admin Panel",
//       description: "Payment for Services",
//       order_id: order.id,
//       handler: async function (response) {
//         try {
//           await axios.post(`${API_BASE}/save-transaction`, {
//             paymentId: response.razorpay_payment_id,
//             orderId: response.razorpay_order_id,
//             amount,
//             status: "success",
//           });
//           alert("✅ Payment Successful!");
//         } catch (err) {
//           alert("⚠️ Transaction save failed!");
//         }
//       },
//       prefill: {
//         name: "Rinku Sheoran",
//         email: "rinku@example.com",
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#3B82F6",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };

//   return (
//     <button
//       onClick={displayRazorpay}
//       className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
//     >
//       Pay ₹{amount}
//     </button>
//   );
// }

import axios from "axios";

const API_BASE = "https://adminastrotalk-1.onrender.com/api/payments"; // your backend

async function handlePayment() {
  const { data } = await axios.post(`${API_BASE}/create-order`, { amount: 500 });
  const { order } = data;

  const options = {
    key: "rzp_test_7m8iz2GqqZ6H9C",
    amount: order.amount,
    currency: "INR",
    name: "Astrology Admin",
    description: "Payment for Consultation",
    order_id: order.id,
    handler: async function (response) {
      await axios.post(`${API_BASE}/save-transaction`, {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        amount: order.amount / 100,
        status: "success",
      });
      alert("Payment successful!");
    },
    theme: { color: "#3399cc" },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
