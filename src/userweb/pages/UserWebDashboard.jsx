import React from "react";
import { Link } from "react-router-dom";

export default function UserWebDashboard() {
  const user = JSON.parse(localStorage.getItem("userweb"));

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>

      <div className="dash-links">
        <Link to="/user/profile">My Profile</Link>
        <Link to="/user/orders">My Orders</Link>
        <Link to="/user/payments">Payment History</Link>
        <Link to="/user/kundli">My Kundli</Link>
        <Link to="/user/remedies">Remedy History</Link>
        <Link to="/user/history">Full History</Link>
      </div>
    </div>
  );
}
