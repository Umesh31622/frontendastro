

// import React from "react";

// export default function AlertsPanel() {
//   const alerts = [
//     "Order #A11 approaching deadline",
//     "Delayed Delivery #A09 (>2 days)",
//     "Missed Remedy feedback for #C03",
//     "Failed payment for #A05",
//     "New client submission #C12",
//   ];

//   const handleAlertClick = (alert) => {
//     alert(`Alert clicked: ${alert}`);
//   };

//   return (
//     <div className="alerts-panel">
//       <h3>Alerts</h3>
//       <ul>
//         {alerts.map((alert, i) => (
//           <li key={i} style={{cursor:"pointer"}} onClick={() => handleAlertClick(alert)}>
//             ⚠️ {alert}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import API from "../api/api";
import io from "socket.io-client";

// Socket.io connection (same backend as others)
const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

// Default fallback alerts (agar backend nahi mila toh)
const defaultAlerts = [
  "Order #A11 approaching deadline",
  "Delayed Delivery #A09 (>2 days)",
  "Missed Remedy feedback for #C03",
  "Failed payment for #A05",
  "New client submission #C12",
];

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState(defaultAlerts);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  // =================== Fetch Alerts ===================
  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/alerts");
      if (res.data.success && Array.isArray(res.data.alerts) && res.data.alerts.length > 0) {
        setAlerts(res.data.alerts);
        setIsLive(true);
      } else {
        setAlerts(defaultAlerts);
        setIsLive(false);
      }
    } catch (err) {
      console.error("Error fetching alerts:", err);
      setAlerts(defaultAlerts);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  // =================== Real-time updates via socket ===================
  useEffect(() => {
    fetchAlerts();

    const socketEvents = ["reportUpdate", "remedyUpdate", "consultationUpdate", "serviceUpdate"];
    socketEvents.forEach((ev) => socket.on(ev, fetchAlerts));

    return () => {
      socketEvents.forEach((ev) => socket.off(ev, fetchAlerts));
    };
  }, []);

  // =================== Alert click ===================
  const handleAlertClick = (alert) => {
    alert(`Clicked on: ${alert}`);
  };

  // =================== Render ===================
  return (
    <div className="alerts-panel">
      <h3>
        Alerts {!isLive && <span style={{ color: "#999", fontSize: "0.9em" }}>(Demo Data)</span>}
      </h3>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading alerts...</p>
      ) : (
        <ul>
          {alerts.length > 0 ? (
            alerts.map((alert, i) => (
              <li key={i} style={{ cursor: "pointer" }} onClick={() => handleAlertClick(alert)}>
                ⚠️ {alert}
              </li>
            ))
          ) : (
            <li>No alerts found</li>
          )}
        </ul>
      )}
    </div>
  );
}
