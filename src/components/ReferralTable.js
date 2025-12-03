import React from "react";

export default function ReferralTable({ referrals, onApprove }) {
  return (
    <table border="1" cellPadding="5">
      <thead>
        <tr>
          <th>Referrer</th>
          <th>Referred</th>
          <th>Approved</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {referrals.map(r => (
          <tr key={r._id}>
            <td>{r.referrer}</td>
            <td>{r.referred}</td>
            <td>{r.approved ? "Yes" : "No"}</td>
            <td>
              {!r.approved && <button onClick={()=>onApprove(r._id)}>Approve</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
