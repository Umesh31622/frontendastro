

// import React from "react";

// export default function RecentActivity() {
//   const activities = [
//     { id: 1, text: "Order #A12 uploaded PDF", time: "2 mins ago", icon: "📄" },
//     { id: 2, text: "New user registered: test@example.com", time: "10 mins ago", icon: "👤" },
//     { id: 3, text: "Payment received from #A09", time: "1 hour ago", icon: "💸" },
//   ];

//   const handleClick = (text) => {
//     alert(`Clicked on activity: ${text}`);
//   };

//   return (
//     <div className="activity-section">
//       <h3>Recent Activity</h3>
//       <ul>
//         {activities.map((activity) => (
//           <li key={activity.id} onClick={() => handleClick(activity.text)} style={{cursor:"pointer"}}>
//             <span>{activity.icon} {activity.text}</span>
//             <span className="time">{activity.time}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import API from "../api/api";
import io from "socket.io-client";

// Connect to backend socket
const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

// Default static data (fallback)
const defaultActivities = [
  { id: 1, text: "Order #A12 uploaded PDF", time: "2 mins ago", icon: "📄" },
  { id: 2, text: "New user registered: test@example.com", time: "10 mins ago", icon: "👤" },
  { id: 3, text: "Payment received from #A09", time: "1 hour ago", icon: "💸" },
];

export default function RecentActivity() {
  const [activities, setActivities] = useState(defaultActivities);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  // ==================== Fetch Activities ====================
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/activities");
      if (res.data.success && Array.isArray(res.data.activities) && res.data.activities.length > 0) {
        setActivities(res.data.activities);
        setIsLive(true);
      } else {
        setActivities(defaultActivities);
        setIsLive(false);
      }
    } catch (err) {
      console.error("Error fetching activities:", err);
      setActivities(defaultActivities);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  // ==================== Real-time Updates ====================
  useEffect(() => {
    fetchActivities();

    const socketEvents = ["reportUpdate", "remedyUpdate", "consultationUpdate", "serviceUpdate"];
    socketEvents.forEach((event) => socket.on(event, fetchActivities));

    return () => {
      socketEvents.forEach((event) => socket.off(event, fetchActivities));
    };
  }, []);

  // ==================== UI ====================
  const handleClick = (text) => {
    alert(`Clicked on activity: ${text}`);
  };

  return (
    <div className="activity-section">
      <h3>
        Recent Activity{" "}
        {!isLive && <span style={{ color: "#999", fontSize: "0.9em" }}>(Demo Data)</span>}
      </h3>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading recent activity...</p>
      ) : (
        <ul>
          {activities.map((activity) => (
            <li
              key={activity.id || Math.random()}
              onClick={() => handleClick(activity.text)}
              style={{ cursor: "pointer" }}
            >
              <span>
                {activity.icon} {activity.text}
              </span>
              <span className="time">{activity.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
