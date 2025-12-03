// import React from "react";

// export default function StatsCards() {
//   const stats = {
//     activeOrders: 12,
//     completedOrders: 8,
//     pendingUploads: 3,
//     remediesInProgress: 5,
//     topServices: ["Astrology Consultation", "Gemstone Recommendation"],
//     activeClients: ["client1@example.com", "client2@example.com"],
//     revenue: { daily: 5000, weekly: 32000, monthly: 124000 },
//   };

//   return (
//     <div className="stats-container">
//       <div className="stat-card">
//         <div className="icon bg-blue">📦</div>
//         <div>
//           <h3>Active Orders</h3>
//           <p>{stats.activeOrders}</p>
//           <small>Completed: {stats.completedOrders}</small>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-yellow">⏳</div>
//         <div>
//           <h3>Pending Uploads</h3>
//           <p>{stats.pendingUploads}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-green">💊</div>
//         <div>
//           <h3>Remedies In Progress</h3>
//           <p>{stats.remediesInProgress}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-purple">⭐</div>
//         <div>
//           <h3>Top Services</h3>
//           <p>{stats.topServices.join(", ")}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-pink">👤</div>
//         <div>
//           <h3>Active Clients</h3>
//           <p>{stats.activeClients.join(", ")}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-orange">💰</div>
//         <div>
//           <h3>Revenue</h3>
//           <p>Daily: ₹{stats.revenue.daily}</p>
//           <p>Weekly: ₹{stats.revenue.weekly}</p>
//           <p>Monthly: ₹{stats.revenue.monthly}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import API from "../api/api";
// import io from "socket.io-client";

// const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

// export default function StatsCards() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/dashboard");
//       if (res.data.success) setStats(res.data.stats);
//     } catch (err) {
//       console.error("Error fetching dashboard stats:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();

//     // 🔁 Live updates via socket
//     const events = ["reportUpdate", "remedyUpdate", "serviceUpdate", "consultationUpdate"];
//     events.forEach((ev) => socket.on(ev, fetchStats));

//     return () => {
//       events.forEach((ev) => socket.off(ev, fetchStats));
//     };
//   }, []);

//   if (loading || !stats) return <p style={{ textAlign: "center" }}>Loading dashboard stats...</p>;

//   return (
//     <div className="stats-container">
//       <div className="stat-card">
//         <div className="icon bg-blue">📦</div>
//         <div>
//           <h3>Active Orders</h3>
//           <p>{stats.activeOrders}</p>
//           <small>Completed: {stats.completedOrders}</small>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-yellow">⏳</div>
//         <div>
//           <h3>Pending Uploads</h3>
//           <p>{stats.pendingUploads}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-green">💊</div>
//         <div>
//           <h3>Remedies In Progress</h3>
//           <p>{stats.remediesInProgress}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-purple">⭐</div>
//         <div>
//           <h3>Top Services</h3>
//           <p>{stats.topServices.length ? stats.topServices.join(", ") : "N/A"}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-pink">👤</div>
//         <div>
//           <h3>Active Clients</h3>
//           <p>{stats.activeClients.join(", ") || "No active clients"}</p>
//         </div>
//       </div>

//       <div className="stat-card">
//         <div className="icon bg-orange">💰</div>
//         <div>
//           <h3>Revenue</h3>
//           <p>Daily: ₹{stats.revenue.daily}</p>
//           <p>Weekly: ₹{stats.revenue.weekly}</p>
//           <p>Monthly: ₹{stats.revenue.monthly}</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import API from "../api/api";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

export default function StatsCards() {
  const [stats, setStats] = useState({
    activeOrders: 0,
    completedOrders: 0,
    pendingUploads: 0,
    remediesInProgress: 0,
    topServices: [],
    activeClients: [],
    revenue: { daily: 0, weekly: 0, monthly: 0 },
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard");
      if (res.data.success && res.data.stats) {
        setStats(res.data.stats);
      } else {
        console.warn("⚠️ No stats data received from API.");
      }
    } catch (err) {
      console.error("❌ Error fetching dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const events = ["reportUpdate", "remedyUpdate", "serviceUpdate", "consultationUpdate"];
    events.forEach((ev) => socket.on(ev, fetchStats));

    return () => {
      events.forEach((ev) => socket.off(ev, fetchStats));
    };
  }, []);

  const showValue = (val) => (loading ? "Loading..." : val || 0);
  const showList = (arr) =>
    loading ? "Loading..." : arr.length ? arr.join(", ") : "N/A";

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="icon bg-blue">📦</div>
        <div>
          <h3>Active Orders</h3>
          <p>{showValue(stats.activeOrders)}</p>
          <small>Completed: {showValue(stats.completedOrders)}</small>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-yellow">⏳</div>
        <div>
          <h3>Pending Uploads</h3>
          <p>{showValue(stats.pendingUploads)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-green">💊</div>
        <div>
          <h3>Remedies In Progress</h3>
          <p>{showValue(stats.remediesInProgress)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-purple">⭐</div>
        <div>
          <h3>Top Services</h3>
          <p>{showList(stats.topServices)}</p>
        </div>
      </div>
{/* 
      <div className="stat-card">
        <div className="icon bg-pink">👤</div>
        <div>
          <h3>Active Clients</h3>
          <p>{showList(stats.activeClients)}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-orange">💰</div>
        <div>
          <h3>Revenue</h3>
          <p>Daily: ₹{showValue(stats.revenue.daily)}</p>
          <p>Weekly: ₹{showValue(stats.revenue.weekly)}</p>
          <p>Monthly: ₹{showValue(stats.revenue.monthly)}</p>
        </div>
      </div> */}
    </div>
  );
}
