

// import React, { useEffect, useState } from "react";
// import Modal from "react-modal";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import API from "../api/api";
// import io from "socket.io-client";

// Modal.setAppElement("#root");
// const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

// export default function Reports() {
//   const [reports, setReports] = useState([]);
//   const [revenueData, setRevenueData] = useState([]);
//   const [topServices, setTopServices] = useState([]);
//   const [remedyCompletion, setRemedyCompletion] = useState({});
//   const [callSuccess, setCallSuccess] = useState({});
//   const [filterService, setFilterService] = useState("");
//   const [filterDate, setFilterDate] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("create");
//   const [formData, setFormData] = useState({
//     title: "",
//     service: "",
//     revenue: "",
//     status: "pending",
//     reportType: "consultation",
//     completedAt: "",
//     clientName: "",
//     astrologerName: "",
//   });

//   // ==================== FETCH REPORTS ====================
//   const fetchReports = async () => {
//     try {
//       const query = [];
//       if (filterService) query.push(`service=${encodeURIComponent(filterService)}`);
//       if (filterDate) query.push(`date=${filterDate}`);
//       const res = await API.get(`/reports${query.length ? "?" + query.join("&") : ""}`);
//       setReports(res.data.data || []);
//     } catch (err) {
//       console.error("Fetch Reports Error:", err);
//     }
//   };

//   // ==================== FETCH ANALYTICS ====================
//   const fetchAnalytics = async () => {
//     try {
//       const [revenueRes, topRes, remedyRes, callRes] = await Promise.all([
//         API.get("/reports/analytics/revenue-by-service"),
//         API.get("/reports/analytics/top-services"),
//         API.get("/reports/analytics/remedy-completion-rate"),
//         API.get("/reports/analytics/call-success-rate"),
//       ]);
//       setRevenueData(revenueRes.data.data || []);
//       setTopServices(topRes.data.data || []);
//       setRemedyCompletion(remedyRes.data.data || {});
//       setCallSuccess(callRes.data.data || {});
//     } catch (err) {
//       console.error("Fetch Analytics Error:", err);
//     }
//   };

//   // ==================== EFFECT ====================
//   useEffect(() => {
//     fetchReports();
//     fetchAnalytics();

//     socket.on("reportUpdate", () => {
//       fetchReports();
//       fetchAnalytics();
//     });

//     return () => socket.off("reportUpdate");
//   }, [filterService, filterDate]);

//   // ==================== MODAL HANDLERS ====================
//   const openModal = (type, report = null) => {
//     setModalType(type);
//     if (report) {
//       setFormData({
//         ...report,
//         completedAt: report.completedAt
//           ? new Date(report.completedAt).toISOString().split("T")[0]
//           : "",
//         clientName: report.clientName || "",
//         astrologerName: report.astrologerName || "",
//       });
//     } else {
//       setFormData({
//         title: "",
//         service: "",
//         revenue: "",
//         status: "pending",
//         reportType: "consultation",
//         completedAt: "",
//         clientName: "",
//         astrologerName: "",
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   // ==================== SAVE / UPDATE ====================
//   const handleSave = async () => {
//     try {
//       if (modalType === "create") {
//         await API.post("/reports", formData);
//       } else {
//         await API.put(`/reports/${formData._id}`, formData);
//       }
//       await fetchReports();
//       await fetchAnalytics();
//       closeModal();
//     } catch (err) {
//       console.error("Save Error:", err.response?.data || err);
//       alert("Save failed: " + (err.response?.data?.message || err.message));
//     }
//   };

//   // ==================== DELETE ====================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this report?")) return;
//     try {
//       await API.delete(`/reports/${id}`);
//       fetchReports();
//       fetchAnalytics();
//     } catch (err) {
//       console.error("Delete Error:", err);
//       alert("Delete failed");
//     }
//   };

//   // ==================== RENDER ====================
//   return (
//     <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif", color: "#1e293b" }}>
//       <h1 style={{ marginBottom: "20px" }}>📊 Reports & Analytics</h1>

//       <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
//         <input
//           type="text"
//           placeholder="Filter by service"
//           value={filterService}
//           onChange={(e) => setFilterService(e.target.value)}
//           style={inputStyle}
//         />
//         <input
//           type="date"
//           value={filterDate}
//           onChange={(e) => setFilterDate(e.target.value)}
//           style={inputStyle}
//         />
//         <button
//           onClick={() => {
//             setFilterService("");
//             setFilterDate("");
//           }}
//           style={blueButton}
//         >
//           Clear Filters
//         </button>
//         <button onClick={() => openModal("create")} style={greenButton}>
//           + Add Report
//         </button>
//       </div>

//       <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
//         <Card
//           title="💰 Total Revenue"
//           value={`₹${revenueData.reduce((a, c) => a + (c.totalRevenue || 0), 0)}`}
//         />
//         <Card title="📈 Top Services" value={topServices.map((s) => s._id).join(", ") || "—"} />
//         <Card title="✅ Remedy Completion Rate" value={`${remedyCompletion.rate || 0}%`} />
//         <Card title="📞 Call Success Rate" value={`${callSuccess.rate || 0}%`} />
//       </div>

//       <div style={{ display: "flex", gap: "50px", flexWrap: "wrap", marginBottom: "30px" }}>
//         <div>
//           <h3>Revenue by Service</h3>
//           <PieChart width={350} height={300}>
//             <Pie
//               data={revenueData}
//               dataKey="totalRevenue"
//               nameKey="_id"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {revenueData.map((entry, index) => (
//                 <Cell key={index} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>

//         <div>
//           <h3>Top Services by Usage</h3>
//           <BarChart width={400} height={300} data={topServices}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="_id" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#82ca9d" />
//           </BarChart>
//         </div>
//       </div>

//       <h3>All Reports</h3>
//       <table style={tableStyle}>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Report Type</th>
//             <th>Revenue</th>
//             <th>Status</th>
//             <th>Client</th>
//             <th>Astrologer</th>
//             <th>Completed At</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((r) => (
//             <tr key={r._id}>
//               <td>{r.title}</td>
//               <td>{r.reportType}</td>
//               <td>₹{r.revenue}</td>
//               <td>{r.status}</td>
//               <td>{r.clientName || "-"}</td>
//               <td>{r.astrologerName || "-"}</td>
//               <td>{r.completedAt ? new Date(r.completedAt).toLocaleDateString() : "-"}</td>
//               <td>
//                 <button style={smallBlueBtn} onClick={() => openModal("update", r)}>
//                   Edit
//                 </button>
//                 <button style={smallRedBtn} onClick={() => handleDelete(r._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={closeModal}
//         style={{
//           content: { background: "#fff", borderRadius: "10px", padding: "20px", maxWidth: "560px", margin: "auto" },
//           overlay: { background: "rgba(0,0,0,0.5)" },
//         }}
//       >
//         <h2>{modalType === "create" ? "Add New Report" : "Edit Report"}</h2>

//         <input
//           name="title"
//           placeholder="Title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           style={inputStyle}
//         />
//         <input
//           name="service"
//           placeholder="Service"
//           value={formData.service}
//           onChange={(e) => setFormData({ ...formData, service: e.target.value })}
//           style={inputStyle}
//         />
//         <input
//           name="revenue"
//           placeholder="Revenue"
//           type="number"
//           value={formData.revenue}
//           onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
//           style={inputStyle}
//         />
//         <input
//           name="clientName"
//           placeholder="Client Name"
//           value={formData.clientName}
//           onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
//           style={inputStyle}
//         />
//         <input
//           name="astrologerName"
//           placeholder="Astrologer Name"
//           value={formData.astrologerName}
//           onChange={(e) => setFormData({ ...formData, astrologerName: e.target.value })}
//           style={inputStyle}
//         />
//         <select
//           name="status"
//           value={formData.status}
//           onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//           style={inputStyle}
//         >
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//           <option value="failed">Failed</option>
//           <option value="follow-up">Follow-up</option>
//         </select>
//         <select
//           name="reportType"
//           value={formData.reportType}
//           onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
//           style={inputStyle}
//         >
//           <option value="remedy">Remedy</option>
//           <option value="consultation">Consultation</option>
//           <option value="analysis">Analysis</option>
//           <option value="custom">Custom</option>
//         </select>
//         <input
//           name="completedAt"
//           type="date"
//           value={formData.completedAt}
//           onChange={(e) => setFormData({ ...formData, completedAt: e.target.value })}
//           style={inputStyle}
//         />

//         <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//           <button onClick={handleSave} style={greenButton}>
//             {modalType === "create" ? "Create" : "Update"}
//           </button>
//           <button onClick={closeModal} style={smallRedBtn}>
//             Cancel
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// // ==================== STYLES ====================
// const Card = ({ title, value }) => (
//   <div style={cardStyle}>
//     <h3>{title}</h3>
//     <p style={valueStyle}>{value}</p>
//   </div>
// );
// const cardStyle = {
//   flex: "1 1 200px",
//   padding: "20px",
//   borderRadius: "10px",
//   background: "#f1f5f9",
//   boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
// };
// const inputStyle = { padding: "8px", borderRadius: "6px", border: "1px solid #ccc", width: "100%", marginBottom: "10px" };
// const blueButton = { padding: "8px 12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
// const greenButton = { padding: "8px 12px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
// const smallBlueBtn = { ...blueButton, padding: "5px 8px", fontSize: "12px", marginRight: "5px" };
// const smallRedBtn = { ...greenButton, background: "#ef4444", padding: "5px 8px", fontSize: "12px" };
// const valueStyle = { fontSize: "22px", fontWeight: "bold", marginTop: "10px" };
// const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "15px", background: "#fff" };


import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import API from "../api/api";
import io from "socket.io-client";

Modal.setAppElement("#root");
const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com");

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];
const ALL_REPORT_TYPES = ["remedy", "consultation", "analysis", "custom"]; // Enum from backend

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [remedyCompletion, setRemedyCompletion] = useState({});
  const [callSuccess, setCallSuccess] = useState({});
  const [filterService, setFilterService] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [formData, setFormData] = useState({
    title: "",
    service: "",
    revenue: "",
    status: "pending",
    reportType: "consultation",
    completedAt: "",
    clientName: "",
    astrologerName: "",
  });

  // ==================== FETCH REPORTS ====================
  const fetchReports = async () => {
    try {
      const query = [];
      if (filterService) query.push(`service=${encodeURIComponent(filterService)}`);
      if (filterDate) query.push(`date=${filterDate}`);
      const res = await API.get(`/reports${query.length ? "?" + query.join("&") : ""}`);
      setReports(res.data.data || []);
    } catch (err) {
      console.error("Fetch Reports Error:", err);
    }
  };

  // ==================== FETCH ANALYTICS ====================
  const fetchAnalytics = async () => {
    try {
      const [revenueRes, topRes, remedyRes, callRes] = await Promise.all([
        API.get("/reports/analytics/revenue-by-service"),
        API.get("/reports/analytics/top-services"),
        API.get("/reports/analytics/remedy-completion-rate"),
        API.get("/reports/analytics/call-success-rate"),
      ]);
      setRevenueData(revenueRes.data.data || []);
      setTopServices(topRes.data.data || []);
      setRemedyCompletion(remedyRes.data.data || {});
      setCallSuccess(callRes.data.data || {});
    } catch (err) {
      console.error("Fetch Analytics Error:", err);
    }
  };

  // ==================== EFFECT ====================
  useEffect(() => {
    fetchReports();
    fetchAnalytics();

    socket.on("reportUpdate", () => {
      fetchReports();
      fetchAnalytics();
    });

    return () => socket.off("reportUpdate");
  }, [filterService, filterDate]);

  // ==================== MODAL HANDLERS ====================
  const openModal = (type, report = null) => {
    setModalType(type);
    if (report) {
      setFormData({
        ...report,
        completedAt: report.completedAt
          ? new Date(report.completedAt).toISOString().split("T")[0]
          : "",
        clientName: report.clientName || "",
        astrologerName: report.astrologerName || "",
      });
    } else {
      setFormData({
        title: "",
        service: "",
        revenue: "",
        status: "pending",
        reportType: "consultation",
        completedAt: "",
        clientName: "",
        astrologerName: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  // ==================== SAVE / UPDATE ====================
  const handleSave = async () => {
    try {
      if (modalType === "create") {
        await API.post("/reports", formData);
      } else {
        await API.put(`/reports/${formData._id}`, formData);
      }
      await fetchReports();
      await fetchAnalytics();
      closeModal();
    } catch (err) {
      console.error("Save Error:", err.response?.data || err);
      alert("Save failed: " + (err.response?.data?.message || err.message));
    }
  };

  // ==================== DELETE ====================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    try {
      await API.delete(`/reports/${id}`);
      fetchReports();
      fetchAnalytics();
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Delete failed");
    }
  };

  // ==================== RENDER ====================
  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif", color: "#1e293b" }}>
      <h1 style={{ marginBottom: "20px" }}>📊 Reports & Analytics</h1>

      {/* Filters */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          style={inputStyle}
        >
          <option value="">Filter by Service</option>
          {ALL_REPORT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={() => {
            setFilterService("");
            setFilterDate("");
          }}
          style={blueButton}
        >
          Clear Filters
        </button>
        <button onClick={() => openModal("create")} style={greenButton}>
          + Add Report
        </button>
      </div>

      {/* Analytics Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "30px" }}>
        <Card
          title="💰 Total Revenue"
          value={`₹${revenueData.reduce((a, c) => a + (c.totalRevenue || 0), 0)}`}
        />
        <Card title="📈 Top Services" value={topServices.map((s) => s._id).join(", ") || "—"} />
        <Card title="✅ Remedy Completion Rate" value={`${remedyCompletion.rate || 0}%`} />
        <Card title="📞 Call Success Rate" value={`${callSuccess.rate || 0}%`} />
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap", marginBottom: "30px" }}>
        <div>
          <h3>Revenue by Service</h3>
          <PieChart width={350} height={300}>
            <Pie
              data={revenueData}
              dataKey="totalRevenue"
              nameKey="_id"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {revenueData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h3>Top Services by Usage</h3>
          <BarChart width={400} height={300} data={topServices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      {/* Reports Table */}
      <h3>All Reports</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Report Type</th>
            <th>Revenue</th>
            <th>Status</th>
            <th>Client</th>
            <th>Astrologer</th>
            <th>Completed At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((r) => (
            <tr key={r._id}>
              <td>{r.title}</td>
              <td>{r.reportType}</td>
              <td>₹{r.revenue}</td>
              <td>{r.status}</td>
              <td>{r.clientName || "-"}</td>
              <td>{r.astrologerName || "-"}</td>
              <td>{r.completedAt ? new Date(r.completedAt).toLocaleDateString() : "-"}</td>
              <td>
                <button style={smallBlueBtn} onClick={() => openModal("update", r)}>
                  Edit
                </button>
                <button style={smallRedBtn} onClick={() => handleDelete(r._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: { background: "#fff", borderRadius: "10px", padding: "20px", maxWidth: "560px", margin: "auto" },
          overlay: { background: "rgba(0,0,0,0.5)" },
        }}
      >
        <h2>{modalType === "create" ? "Add New Report" : "Edit Report"}</h2>

        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={inputStyle}
        />
        <select
          name="reportType"
          value={formData.reportType}
          onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
          style={inputStyle}
        >
          {ALL_REPORT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
        <input
          name="revenue"
          placeholder="Revenue"
          type="number"
          value={formData.revenue}
          onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
          style={inputStyle}
        />
        <input
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          style={inputStyle}
        />
        <input
          name="astrologerName"
          placeholder="Astrologer Name"
          value={formData.astrologerName}
          onChange={(e) => setFormData({ ...formData, astrologerName: e.target.value })}
          style={inputStyle}
        />
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          style={inputStyle}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="follow-up">Follow-up</option>
        </select>
        <input
          name="completedAt"
          type="date"
          value={formData.completedAt}
          onChange={(e) => setFormData({ ...formData, completedAt: e.target.value })}
          style={inputStyle}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={handleSave} style={greenButton}>
            {modalType === "create" ? "Create" : "Update"}
          </button>
          <button onClick={closeModal} style={smallRedBtn}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

// ==================== STYLES ====================
const Card = ({ title, value }) => (
  <div style={cardStyle}>
    <h3>{title}</h3>
    <p style={valueStyle}>{value}</p>
  </div>
);
const cardStyle = {
  flex: "1 1 200px",
  padding: "20px",
  borderRadius: "10px",
  background: "#f1f5f9",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};
const inputStyle = { padding: "8px", borderRadius: "6px", border: "1px solid #ccc", width: "100%", marginBottom: "10px" };
const blueButton = { padding: "8px 12px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
const greenButton = { padding: "8px 12px", background: "#22c55e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
const smallBlueBtn = { ...blueButton, padding: "5px 8px", fontSize: "12px", marginRight: "5px" };
const smallRedBtn = { ...greenButton, background: "#ef4444", padding: "5px 8px", fontSize: "12px" };
const valueStyle = { fontSize: "22px", fontWeight: "bold", marginTop: "10px" };
const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "15px", background: "#fff" };
