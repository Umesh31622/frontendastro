// import React from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// export default function OrdersChart() {
//   const data = [
//     { day: "Mon", active: 3, completed: 2 },
//     { day: "Tue", active: 5, completed: 4 },
//     { day: "Wed", active: 2, completed: 3 },
//     { day: "Thu", active: 6, completed: 5 },
//     { day: "Fri", active: 7, completed: 6 },
//     { day: "Sat", active: 3, completed: 2 },
//     { day: "Sun", active: 4, completed: 3 },
//   ];

//   return (
//     <div className="chart-container">
//       <h3>Orders (Active / Completed)</h3>
//       <ResponsiveContainer width="100%" height={250}>
//         <BarChart data={data}>
//           <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="active" fill="#ffc107" />
//           <Bar dataKey="completed" fill="#28a745" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function OrdersChart({ data }) {
  return (
    <div className="chart-container">
      <h3>Orders (Active / Completed)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="active" fill="#ffc107" />
          <Bar dataKey="completed" fill="#28a745" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
