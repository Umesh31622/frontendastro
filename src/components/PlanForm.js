import React, { useState } from "react";

export default function PlanForm({ onSave, plan }) {
  const [name, setName] = useState(plan?.name || "");
  const [amount, setAmount] = useState(plan?.amount || 0);
  const [interval, setInterval] = useState(plan?.interval || "monthly");
  const [description, setDescription] = useState(plan?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, amount, interval, description });
    setName(""); setAmount(0); setInterval("monthly"); setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom:"20px" }}>
      <input placeholder="Plan Name" value={name} onChange={e=>setName(e.target.value)} required/>
      <input type="number" placeholder="Amount INR" value={amount} onChange={e=>setAmount(e.target.value)} required/>
      <select value={interval} onChange={e=>setInterval(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <input placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/>
      <button type="submit">Save Plan</button>
    </form>
  );
}
