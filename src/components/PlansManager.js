import React, { useEffect, useState } from "react";
import { getPlans, createPlan, deletePlan } from "../api/subscriptionApi";

export default function PlansManager() {
  const [plans, setPlans] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: "", amount: "", interval: "monthly" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPlans();
      console.log("Fetched plans:", data);
      setPlans(data);
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!newPlan.name || !newPlan.amount) return alert("Name and Amount required");
    await createPlan(newPlan);
    setNewPlan({ name: "", amount: "", interval: "monthly" });
    const data = await getPlans();
    setPlans(data);
  };

  const handleDelete = async (id) => {
    await deletePlan(id);
    const data = await getPlans();
    setPlans(data);
  };

  return (
    <div>
      <h2>Plans Management</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Name"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
        />
        <input
          placeholder="Amount"
          type="number"
          value={newPlan.amount}
          onChange={(e) => setNewPlan({ ...newPlan, amount: e.target.value })}
        />
        <select
          value={newPlan.interval}
          onChange={(e) => setNewPlan({ ...newPlan, interval: e.target.value })}
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        <button onClick={handleCreate}>Add Plan</button>
      </div>

      <ul>
        {plans.length > 0 ? (
          plans.map((plan) => (
            <li key={plan._id}>
              {plan.name} - ₹{plan.amount}/{plan.interval}{" "}
              <button onClick={() => handleDelete(plan._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No plans available.</li>
        )}
      </ul>
    </div>
  );
}
