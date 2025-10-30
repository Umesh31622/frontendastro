import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RevenueChart() {
  const data = [
    { day: "Mon", revenue: 5000 },
    { day: "Tue", revenue: 8000 },
    { day: "Wed", revenue: 6000 },
    { day: "Thu", revenue: 9000 },
    { day: "Fri", revenue: 12000 },
    { day: "Sat", revenue: 7000 },
    { day: "Sun", revenue: 15000 },
  ];

  return (
    <div className="chart-container">
      <h3>Revenue This Week</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#007bff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
