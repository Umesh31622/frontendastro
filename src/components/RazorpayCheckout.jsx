import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export default function RazorpayCheckout() {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  async function handlePayment() {
    try {
      const { data } = await axios.post(`${API_URL}/api/payments/create-order`, {
        amount,
        clientName: name,
        clientEmail: email,
      });

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Astro Consultation",
        description: "Payment for Astrology Service",
        order_id: data.order.id,
        handler: async function (response) {
          await axios.post(`${API_URL}/api/payments/verify`, response);
          alert('✅ Payment Successful!');
        },
        prefill: { name, email },
        theme: { color: "#8B0000" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('❌ Payment initiation failed');
    }
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>💫 Astrology Payment</h2>
      <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Your Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
