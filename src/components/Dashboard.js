

// import React, { useState } from "react";
// import StatsCards from "./StatsCards";
// import QuickActions from "./QuickActions";
// import RevenueChart from "./RevenueChart";
// import OrdersChart from "./OrdersChart";
// import CalendarView from "./CalendarView";
// import PendingUploadsTable from "./PendingUploadsTable";
// import RecentActivity from "./RecentActivity";
// import AlertsPanel from "./AlertsPanel";
// import "../styles/Dashboard.css";

// export default function Dashboard() {
//   const [selectedClient, setSelectedClient] = useState(null);

//   const handleClientAction = (client) => {
//     setSelectedClient(client);
//     alert(`Action triggered for ${client}`);
//   };

//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-title"></h1>

//       <StatsCards />
//       <QuickActions onActionClick={handleClientAction} />

//       <div className="charts-section">
//         <RevenueChart />
//         <OrdersChart />
//       </div>

//       <div className="bottom-section">
//         <CalendarView />
//         <PendingUploadsTable />
//       </div>

//       <RecentActivity />
//       <AlertsPanel />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import RevenueChart from "./RevenueChart";
import OrdersChart from "./OrdersChart";
import CalendarView from "./CalendarView";
import PendingUploadsTable from "./PendingUploadsTable";
import RecentActivity from "./RecentActivity";
import AlertsPanel from "./AlertsPanel";
import "../styles/Dashboard.css";
import axios from "axios";

export default function Dashboard() {
  const [consultations, setConsultations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleClientAction = (client) => {
    setSelectedClient(client);
  };

  useEffect(() => {
    setLoading(true);

    const fetchConsultations = axios.get("/api/consultations");
    const fetchOrders = axios.get("/api/orders");
    const fetchUploads = axios.get("/api/uploads/pending");

    Promise.all([fetchConsultations, fetchOrders, fetchUploads])
      .then(([consultRes, ordersRes, uploadsRes]) => {
        setConsultations(consultRes.data.consultations || []);
        setOrders(ordersRes.data.orders || []);
        setUploads(uploadsRes.data.uploads || []);
      })
      .catch((err) => console.error("Error fetching dashboard data:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="dashboard-loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <StatsCards
        consultations={consultations}
        orders={orders}
        uploads={uploads}
      />

      <QuickActions onActionClick={handleClientAction} />

      <div className="charts-section">
        <RevenueChart orders={orders} />
        <OrdersChart orders={orders} />
      </div>

      <div className="bottom-section">
        <CalendarView consultations={consultations} />
        <PendingUploadsTable uploads={uploads} />
      </div>

      <RecentActivity
        consultations={consultations}
        orders={orders}
        uploads={uploads}
      />

      <AlertsPanel />
    </div>
  );
}

