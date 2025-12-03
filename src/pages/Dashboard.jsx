// import React from 'react'

// function Dashboard() {
//   return (
//     <div>Dashboard jdck</div>
//   )
// }

// export default Dashboard


import React, { useState } from "react";
import AdminFeedbackList from "../components/AdminFeedbackList";
import ImpactAnalytics from "../components/ImpactAnalytics";
import "../styles/Admin.css";

export default function Dashboard({ onLogout }) {
  return (
    <div className="dashboard">
      <header>
        <h1>Admin Dashboard</h1>
        <button onClick={onLogout}>Logout</button>
      </header>
      <ImpactAnalytics />
      <AdminFeedbackList />
    </div>
  );
}
