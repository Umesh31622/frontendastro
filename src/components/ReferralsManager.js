import React, { useEffect, useState } from "react";
import { getReferrals, approveReferral } from "../api/subscriptionApi";

export default function ReferralsManager() {
  const [referrals, setReferrals] = useState([]);

  const fetchReferrals = async () => {
    const data = await getReferrals();
    console.log("Fetched referrals:", data);
    setReferrals(data);
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  const handleApprove = async (id) => {
    await approveReferral(id);
    fetchReferrals();
  };

  return (
    <div>
      <h2>Referrals</h2>
      <ul>
        {referrals.length > 0 ? (
          referrals.map((r) => (
            <li key={r._id}>
              {r.code} - {r.approved ? "✅ Approved" : "❌ Pending"}{" "}
              {!r.approved && <button onClick={() => handleApprove(r._id)}>Approve</button>}
              {" "} | User: {r.user?.name} ({r.user?.email})
            </li>
          ))
        ) : (
          <li>No referrals found.</li>
        )}
      </ul>
    </div>
  );
}
