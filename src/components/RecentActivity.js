// import React from "react";

// export default function RecentActivity() {
//   const activities = [
//     { id: 1, text: "Order #A12 uploaded PDF", time: "2 mins ago", icon: "📄" },
//     { id: 2, text: "New user registered: test@example.com", time: "10 mins ago", icon: "👤" },
//     { id: 3, text: "Payment received from #A09", time: "1 hour ago", icon: "💸" },
//     { id: 4, text: "Upcoming call with client #C05", time: "Tomorrow 3 PM", icon: "📞" },
//   ];

//   return (
//     <div className="activity-section">
//       <h3>Recent Activity / Upcoming Calls</h3>
//       <ul>
//         {activities.map((activity) => (
//           <li key={activity.id}>
//             <span>{activity.icon} {activity.text}</span>
//             <span className="time">{activity.time}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React from "react";

export default function RecentActivity() {
  const activities = [
    { id: 1, text: "Order #A12 uploaded PDF", time: "2 mins ago", icon: "📄" },
    { id: 2, text: "New user registered: test@example.com", time: "10 mins ago", icon: "👤" },
    { id: 3, text: "Payment received from #A09", time: "1 hour ago", icon: "💸" },
  ];

  const handleClick = (text) => {
    alert(`Clicked on activity: ${text}`);
  };

  return (
    <div className="activity-section">
      <h3>Recent Activity</h3>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id} onClick={() => handleClick(activity.text)} style={{cursor:"pointer"}}>
            <span>{activity.icon} {activity.text}</span>
            <span className="time">{activity.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
