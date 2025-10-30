// import React from "react";

// export default function AlertsPanel() {
//   const alerts = [
//     "Order #A11 approaching deadline",
//     "Delayed Delivery #A09 (>2 days)",
//     "Missed Remedy feedback for #C03",
//     "Failed payment for #A05",
//     "New client submission #C12",
//     "Follow-up due for client #C07",
//   ];

//   return (
//     <div className="alerts-panel">
//       <h3>Alerts</h3>
//       <ul>
//         {alerts.map((alert, i) => (
//           <li key={i}>⚠️ {alert}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React from "react";

export default function AlertsPanel() {
  const alerts = [
    "Order #A11 approaching deadline",
    "Delayed Delivery #A09 (>2 days)",
    "Missed Remedy feedback for #C03",
    "Failed payment for #A05",
    "New client submission #C12",
  ];

  const handleAlertClick = (alert) => {
    alert(`Alert clicked: ${alert}`);
  };

  return (
    <div className="alerts-panel">
      <h3>Alerts</h3>
      <ul>
        {alerts.map((alert, i) => (
          <li key={i} style={{cursor:"pointer"}} onClick={() => handleAlertClick(alert)}>
            ⚠️ {alert}
          </li>
        ))}
      </ul>
    </div>
  );
}
