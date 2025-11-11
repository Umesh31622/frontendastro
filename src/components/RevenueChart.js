// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// export default function RevenueChart() {
//   const data = [
//     { day: "Mon", revenue: 5000 },
//     { day: "Tue", revenue: 8000 },
//     { day: "Wed", revenue: 6000 },
//     { day: "Thu", revenue: 9000 },
//     { day: "Fri", revenue: 12000 },
//     { day: "Sat", revenue: 7000 },
//     { day: "Sun", revenue: 15000 },
//   ];

//   return (
//     <div className="chart-container">
//       <h3>Revenue This Week</h3>
//       <ResponsiveContainer width="100%" height={250}>
//         <LineChart data={data}>
//           <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Line type="monotone" dataKey="revenue" stroke="#007bff" strokeWidth={2} />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import API from "../api/api";
import io from "socket.io-client";

// Connect to backend socket
const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

// Default demo data (fallback)
const defaultData = [
  { day: "Mon", revenue: 5000 },
  { day: "Tue", revenue: 8000 },
  { day: "Wed", revenue: 6000 },
  { day: "Thu", revenue: 9000 },
  { day: "Fri", revenue: 12000 },
  { day: "Sat", revenue: 7000 },
  { day: "Sun", revenue: 15000 },
];

export default function RevenueChart() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  // ==================== FETCH WEEKLY REVENUE DATA ====================
  const fetchRevenue = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard/revenue-trend");
      if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setData(res.data.data);
        setIsLive(true);
      } else {
        // No live data → fallback to demo
        setData(defaultData);
        setIsLive(false);
      }
    } catch (err) {
      console.error("Error fetching revenue chart:", err);
      setData(defaultData);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  // ==================== EFFECT: INITIAL + SOCKET REFRESH ====================
  useEffect(() => {
    fetchRevenue();

    socket.on("reportUpdate", fetchRevenue);
    return () => socket.off("reportUpdate", fetchRevenue);
  }, []);

  // ==================== UI ====================
  return (
    <div className="chart-container">
      <h3>
        Revenue This Week{" "}
        {!isLive && <span style={{ color: "#999", fontSize: "0.9em" }}>(Demo Data)</span>}
      </h3>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading revenue data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={isLive ? "#007bff" : "#9ca3af"}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
