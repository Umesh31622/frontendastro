import React, { useEffect, useState } from "react";
import { getPlans, createPlan, deletePlan, getReferrals, approveReferral, createOrder, verifyPayment } from "../api/api";
import PlanForm from "../components/PlanForm";
import ReferralTable from "../components/ReferralTable";

export default function PaymentsSubscriptions() {
  const [plans, setPlans] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    loadPlans();
    loadReferrals();
  }, []);

  const loadPlans = async () => { const res = await getPlans(); setPlans(res.data); };
  const loadReferrals = async () => { const res = await getReferrals(); setReferrals(res.data); };

  const handlePlanSave = async (data) => { await createPlan(data); loadPlans(); };
  const handlePlanDelete = async (id) => { await deletePlan(id); loadPlans(); };

  const handleApproveReferral = async (id) => { await approveReferral(id); loadReferrals(); };

  const handlePayment = async (plan) => {
    const orderRes = await createOrder({ planId: plan._id, amount: plan.amount });
    const { id, amount, currency } = orderRes.data.order;

    const options = {
      key: "rzp_test_RXG1QPP8Jk082R",
      amount: amount,
      currency: currency,
      name: "MyApp Subscription",
      description: plan.name,
      order_id: id,
      handler: async function (response){
        await verifyPayment(response);
        alert("Payment Success!");
      },
      prefill: { name: "", email: "" },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Subscription Plans</h2>
      <PlanForm onSave={handlePlanSave} />
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Name</th><th>Amount</th><th>Interval</th><th>Description</th><th>Action</th><th>Subscribe</th>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan._id}>
              <td>{plan.name}</td>
              <td>{plan.amount}</td>
              <td>{plan.interval}</td>
              <td>{plan.description}</td>
              <td><button onClick={()=>handlePlanDelete(plan._id)}>Delete</button></td>
              <td><button onClick={()=>handlePayment(plan)}>Pay & Subscribe</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Referral Approvals</h2>
      <ReferralTable referrals={referrals} onApprove={handleApproveReferral} />
    </div>
  );
}
