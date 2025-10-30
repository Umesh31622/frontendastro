import React, { useState, useEffect } from "react";
import { 
  getPlans, createPlan, deletePlan,
  getReferrals, approveReferral
} from "../api/subscriptionApi";
import { createOrder } from "../api/paymentApi";
import { getDiscounts, createDiscount, deleteDiscount } from "../api/discountApi";
import "./WalletPage.css";

export default function WalletPage({ user }) {
  // ===== Subscriptions =====
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: "", amount: "", interval: "monthly" });

  // ===== Referrals =====
  const [referrals, setReferrals] = useState([]);

  // ===== Discounts =====
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({ code: "", percentage: "" });

  // ===== Payment Form =====
  const [payName, setPayName] = useState(user?.name || "");
  const [payEmail, setPayEmail] = useState(user?.email || "");
  const [payAmount, setPayAmount] = useState("");

  // ================= Fetch all initial data =================
  const fetchPlansData = async () => { const data = await getPlans(); setPlans(data || []); };
  const fetchReferralsData = async () => { const data = await getReferrals(); setReferrals(data || []); };
  const fetchDiscountsData = async () => { const data = await getDiscounts(); setDiscounts(data || []); };

  useEffect(() => {
    fetchPlansData();
    fetchReferralsData();
    fetchDiscountsData();
  }, []);

  // ================= Subscriptions handlers =================
  const handleCreatePlan = async () => {
    if (!newPlan.name || !newPlan.amount) return alert("Name & Amount required");
    await createPlan(newPlan);
    setNewPlan({ name: "", amount: "", interval: "monthly" });
    fetchPlansData();
  };
  const handleDeletePlan = async (id) => { await deletePlan(id); fetchPlansData(); };

  // ================= Referrals handlers =================
  const handleApproveReferral = async (id) => { await approveReferral(id); fetchReferralsData(); };

  // ================= Discounts handlers =================
  const handleCreateDiscount = async () => {
    if (!newDiscount.code || !newDiscount.percentage) return alert("Code & Percentage required");
    await createDiscount({ code: newDiscount.code, discountPercentage: newDiscount.percentage });
    setNewDiscount({ code: "", percentage: "" });
    fetchDiscountsData();
  };
  const handleDeleteDiscount = async (id) => { await deleteDiscount(id); fetchDiscountsData(); };

  // ================= Razorpay Payment =================
  const handlePayment = async () => {
    if (!payName || !payEmail || !payAmount) return alert("All fields required");

    try {
      const order = await createOrder({ amount: payAmount, userId: user._id });
      if (!order) return alert("Order creation failed");

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Astrology App",
        description: "Payment",
        order_id: order.id,
        handler: function (response) {
          console.log("Payment success:", response);
          alert("Payment successful!");
        },
        prefill: { name: payName, email: payEmail },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="wallet-container">
      <h1>Wallet & Payment Dashboard</h1>

      {/* ===== Subscription Plans ===== */}
      <section className="card">
        <h2>Subscription Plans</h2>
        <div className="form-inline">
          <input placeholder="Name" value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} />
          <input placeholder="Amount" type="number" value={newPlan.amount} onChange={e => setNewPlan({ ...newPlan, amount: e.target.value })} />
          <select value={newPlan.interval} onChange={e => setNewPlan({ ...newPlan, interval: e.target.value })}>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button onClick={handleCreatePlan}>Add Plan</button>
        </div>

        <ul>
          {plans.length > 0 ? plans.map(p => (
            <li key={p._id}>{p.name} - ₹{p.amount}/{p.interval} <button onClick={() => handleDeletePlan(p._id)}>Delete</button></li>
          )) : <li>No plans available</li>}
        </ul>
      </section>

      {/* ===== Referrals ===== */}
      <section className="card">
        <h2>Referrals</h2>
        <ul>
          {referrals.length > 0 ? referrals.map(r => (
            <li key={r._id}>
              {r.code} - {r.approved ? "✅ Approved" : "❌ Pending"} {!r.approved && <button onClick={() => handleApproveReferral(r._id)}>Approve</button>} 
              {" "} | User: {r.user?.name} ({r.user?.email})
            </li>
          )) : <li>No referrals found.</li>}
        </ul>
      </section>

      {/* ===== Discounts ===== */}
      <section className="card">
        <h2>Discounts</h2>
        <div className="form-inline">
          <input placeholder="Code" value={newDiscount.code} onChange={e => setNewDiscount({ ...newDiscount, code: e.target.value })} />
          <input placeholder="Percentage" type="number" value={newDiscount.percentage} onChange={e => setNewDiscount({ ...newDiscount, percentage: e.target.value })} />
          <button onClick={handleCreateDiscount}>Add Discount</button>
        </div>

        <ul>
          {discounts.length > 0 ? discounts.map(d => (
            <li key={d._id}>{d.code} - {d.discountPercentage}% <button onClick={() => handleDeleteDiscount(d._id)}>Delete</button></li>
          )) : <li>No discounts found.</li>}
        </ul>
      </section>

      {/* ===== Razorpay Payment Form ===== */}
      <section className="card">
        <h2>Make Payment</h2>
        <div className="form-inline">
          <input placeholder="Name" value={payName} onChange={e => setPayName(e.target.value)} />
          <input placeholder="Email" value={payEmail} onChange={e => setPayEmail(e.target.value)} />
          <input placeholder="Amount" type="number" value={payAmount} onChange={e => setPayAmount(e.target.value)} />
          <button onClick={handlePayment}>Pay Now</button>
        </div>
      </section>
    </div>
  );
}
