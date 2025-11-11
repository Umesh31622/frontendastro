

// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import FullCalendar from "@fullcalendar/react";
// // // // import dayGridPlugin from "@fullcalendar/daygrid";
// // // // import timeGridPlugin from "@fullcalendar/timegrid";
// // // // import interactionPlugin from "@fullcalendar/interaction";
// // // // import "./ConsultationManagement.css";

// // // // const initialForm = {
// // // //   clientName: "",
// // // //   clientEmail: "",
// // // //   astrologerName: "",
// // // //   type: "Chat",
// // // //   status: "Pending",
// // // //   scheduledAt: "",
// // // //   notes: "",
// // // //   meetingLink: "",
// // // // };

// // // // export default function ConsultationManagement() {
// // // //   const [consultations, setConsultations] = useState([]);
// // // //   const [formData, setFormData] = useState(initialForm);
// // // //   const [editingId, setEditingId] = useState(null);
// // // //   const [showForm, setShowForm] = useState(false);
// // // //   const [search, setSearch] = useState("");
// // // //   const [filterAstrologer, setFilterAstrologer] = useState("");
// // // //   const [loading, setLoading] = useState(false);

// // // //   const API_URL = "https://adminastrotalk-1.onrender.com/api/consultations"; // ✅ Correct backend URL

// // // //   // Fetch all consultations
// // // //   useEffect(() => {
// // // //     fetchConsultations();
// // // //   }, []);

// // // //   const fetchConsultations = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const res = await axios.get(API_URL);
// // // //       setConsultations(res.data);
// // // //     } catch (err) {
// // // //       console.error("Error fetching consultations:", err);
// // // //       alert("❌ Error fetching consultations from backend.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Add / Update consultation
// // // //   const handleSubmit = async (e) => {
// // // //     e.preventDefault();
// // // //     if (!formData.clientName || !formData.astrologerName)
// // // //       return alert("Please fill all required fields.");

// // // //     try {
// // // //       setLoading(true);
// // // //       if (editingId) {
// // // //         await axios.put(`${API_URL}/${editingId}`, formData);
// // // //         alert("✅ Consultation updated successfully!");
// // // //       } else {
// // // //         const res = await axios.post(API_URL, formData);
// // // //         alert("✅ Consultation added successfully! Email & Meet link sent.");
// // // //         console.log("New consultation:", res.data);
// // // //       }
// // // //       setFormData(initialForm);
// // // //       setEditingId(null);
// // // //       setShowForm(false);
// // // //       fetchConsultations();
// // // //     } catch (err) {
// // // //       console.error("❌ Error saving consultation:", err.response?.data || err.message);
// // // //       alert("❌ Error saving consultation. Check backend logs.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleEdit = (c) => {
// // // //     setFormData({
// // // //       ...c,
// // // //       scheduledAt: c.scheduledAt
// // // //         ? new Date(c.scheduledAt).toISOString().slice(0, 16)
// // // //         : "",
// // // //     });
// // // //     setEditingId(c._id);
// // // //     setShowForm(true);
// // // //   };

// // // //   const handleDelete = async (id) => {
// // // //     if (!window.confirm("Are you sure you want to delete this consultation?")) return;
// // // //     try {
// // // //       await axios.delete(`${API_URL}/${id}`);
// // // //       fetchConsultations();
// // // //       alert("🗑️ Consultation deleted successfully");
// // // //     } catch (err) {
// // // //       console.error("Error deleting consultation:", err);
// // // //       alert("❌ Error deleting consultation.");
// // // //     }
// // // //   };

// // // //   const filteredConsultations = consultations
// // // //     .filter(
// // // //       (c) =>
// // // //         (c.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
// // // //         (c.astrologerName || "").toLowerCase().includes(search.toLowerCase())
// // // //     )
// // // //     .filter((c) => !filterAstrologer || c.astrologerName === filterAstrologer);

// // // //   const allAstrologers = Array.from(
// // // //     new Set(consultations.map((c) => c.astrologerName).filter(Boolean))
// // // //   );

// // // //   const calendarEvents = consultations.map((c) => ({
// // // //     id: c._id,
// // // //     title: `${c.clientName || "Client"} — ${c.status}`,
// // // //     start: c.scheduledAt,
// // // //   }));

// // // //   const onEventClick = (info) => {
// // // //     const c = consultations.find((x) => x._id === info.event.id);
// // // //     if (c) handleEdit(c);
// // // //   };

// // // //   return (
// // // //     <div className="consultation-management-main">
// // // //       <div className="consultation-card">
// // // //         <div className="consultation-header-row">
// // // //           <h2>Consultation Management</h2>
// // // //           <button
// // // //             className="add-btn"
// // // //             onClick={() => setShowForm(!showForm)}
// // // //             disabled={loading}
// // // //           >
// // // //             {showForm ? "Close Form" : "Add Consultation"}
// // // //           </button>
// // // //         </div>

// // // //         {showForm && (
// // // //           <form className="consultation-form" onSubmit={handleSubmit}>
// // // //             <input
// // // //               type="text"
// // // //               required
// // // //               placeholder="Client Name"
// // // //               value={formData.clientName}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, clientName: e.target.value })
// // // //               }
// // // //             />
// // // //             <input
// // // //               type="email"
// // // //               placeholder="Client Email"
// // // //               value={formData.clientEmail}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, clientEmail: e.target.value })
// // // //               }
// // // //             />
// // // //             <input
// // // //               type="text"
// // // //               required
// // // //               placeholder="Astrologer Name"
// // // //               value={formData.astrologerName}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, astrologerName: e.target.value })
// // // //               }
// // // //             />
// // // //             <select
// // // //               value={formData.type}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, type: e.target.value })
// // // //               }
// // // //             >
// // // //               <option value="Chat">Chat</option>
// // // //               <option value="Audio">Audio</option>
// // // //               <option value="Video">Video</option>
// // // //             </select>
// // // //             <select
// // // //               value={formData.status}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, status: e.target.value })
// // // //               }
// // // //             >
// // // //               <option value="Pending">Pending</option>
// // // //               <option value="In Progress">In Progress</option>
// // // //               <option value="Completed">Completed</option>
// // // //             </select>
// // // //             <input
// // // //               type="datetime-local"
// // // //               value={formData.scheduledAt}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, scheduledAt: e.target.value })
// // // //               }
// // // //             />
// // // //             <textarea
// // // //               placeholder="Notes"
// // // //               value={formData.notes}
// // // //               onChange={(e) =>
// // // //                 setFormData({ ...formData, notes: e.target.value })
// // // //               }
// // // //             />
// // // //             <div className="form-actions">
// // // //               <button type="submit" disabled={loading}>
// // // //                 {editingId ? "Update" : "Add"}
// // // //               </button>
// // // //               {editingId && (
// // // //                 <button
// // // //                   type="button"
// // // //                   className="cancel-btn"
// // // //                   onClick={() => {
// // // //                     setFormData(initialForm);
// // // //                     setEditingId(null);
// // // //                     setShowForm(false);
// // // //                   }}
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //               )}
// // // //             </div>
// // // //           </form>
// // // //         )}

// // // //         <div className="search-row">
// // // //           <input
// // // //             type="text"
// // // //             className="search-bar"
// // // //             placeholder="Search client or astrologer..."
// // // //             value={search}
// // // //             onChange={(e) => setSearch(e.target.value)}
// // // //           />
// // // //           <select
// // // //             value={filterAstrologer}
// // // //             onChange={(e) => setFilterAstrologer(e.target.value)}
// // // //           >
// // // //             <option value="">All Astrologers</option>
// // // //             {allAstrologers.map((a) => (
// // // //               <option key={a} value={a}>
// // // //                 {a}
// // // //               </option>
// // // //             ))}
// // // //           </select>
// // // //         </div>

// // // //         {loading ? (
// // // //           <p>Loading...</p>
// // // //         ) : (
// // // //           <div className="consultation-layout">
// // // //             <div className="table-container">
// // // //               <table className="consultations-table">
// // // //                 <thead>
// // // //                   <tr>
// // // //                     <th>Client</th>
// // // //                     <th>Email</th>
// // // //                     <th>Astrologer</th>
// // // //                     <th>Type</th>
// // // //                     <th>Status</th>
// // // //                     <th>Schedule</th>
// // // //                     <th>Meet Link</th>
// // // //                     <th>Actions</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody>
// // // //                   {filteredConsultations.length === 0 ? (
// // // //                     <tr>
// // // //                       <td colSpan={8}>No consultations found.</td>
// // // //                     </tr>
// // // //                   ) : (
// // // //                     filteredConsultations.map((c) => (
// // // //                       <tr key={c._id}>
// // // //                         <td>{c.clientName}</td>
// // // //                         <td>{c.clientEmail}</td>
// // // //                         <td>{c.astrologerName}</td>
// // // //                         <td>{c.type}</td>
// // // //                         <td>{c.status}</td>
// // // //                         <td>
// // // //                           {c.scheduledAt
// // // //                             ? new Date(c.scheduledAt).toLocaleString()
// // // //                             : ""}
// // // //                         </td>
// // // //                         <td>
// // // //                           {c.meetingLink ? (
// // // //                             <a
// // // //                               href={c.meetingLink}
// // // //                               target="_blank"
// // // //                               rel="noopener noreferrer"
// // // //                             >
// // // //                               Join
// // // //                             </a>
// // // //                           ) : (
// // // //                             "-"
// // // //                           )}
// // // //                         </td>
// // // //                         <td>
// // // //                           <button onClick={() => handleEdit(c)}>Edit</button>
// // // //                           <button onClick={() => handleDelete(c._id)}>
// // // //                             Delete
// // // //                           </button>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))
// // // //                   )}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>

// // // //             <div className="calendar-wrapper">
// // // //               <FullCalendar
// // // //                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// // // //                 initialView="timeGridWeek"
// // // //                 events={calendarEvents}
// // // //                 eventClick={onEventClick}
// // // //                 height={550}
// // // //               />
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import FullCalendar from "@fullcalendar/react";
// // // import dayGridPlugin from "@fullcalendar/daygrid";
// // // import timeGridPlugin from "@fullcalendar/timegrid";
// // // import interactionPlugin from "@fullcalendar/interaction";
// // // import "./ConsultationManagement.css";

// // // const initialForm = {
// // //   clientName: "",
// // //   clientEmail: "",
// // //   astrologerName: "",
// // //   type: "Chat",
// // //   status: "Pending",
// // //   scheduledAt: "",
// // //   notes: "",
// // //   meetingLink: "",
// // // };

// // // export default function ConsultationManagement() {
// // //   const [consultations, setConsultations] = useState([]);
// // //   const [formData, setFormData] = useState(initialForm);
// // //   const [editingId, setEditingId] = useState(null);
// // //   const [showForm, setShowForm] = useState(false);
// // //   const [search, setSearch] = useState("");
// // //   const [filterAstrologer, setFilterAstrologer] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const API_URL = "https://adminastrotalk-1.onrender.com/api/consultations";

// // //   useEffect(() => {
// // //     fetchConsultations();
// // //   }, []);

// // //   const fetchConsultations = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await axios.get(API_URL);
// // //       setConsultations(res.data);
// // //     } catch (err) {
// // //       console.error("Error fetching consultations:", err);
// // //       alert("❌ Error fetching consultations from backend.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!formData.clientName || !formData.astrologerName)
// // //       return alert("Please fill all required fields.");

// // //     try {
// // //       setLoading(true);
// // //       if (editingId) {
// // //         await axios.put(`${API_URL}/${editingId}`, formData);
// // //         alert("✅ Consultation updated successfully!");
// // //       } else {
// // //         const res = await axios.post(API_URL, formData);
// // //         alert("✅ Consultation added successfully! Email & Google Meet link sent.");
// // //         console.log("New consultation:", res.data);
// // //       }
// // //       setFormData(initialForm);
// // //       setEditingId(null);
// // //       setShowForm(false);
// // //       fetchConsultations();
// // //     } catch (err) {
// // //       console.error("❌ Error saving consultation:", err.response?.data || err.message);
// // //       alert("❌ Error saving consultation. Check backend logs.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleEdit = (c) => {
// // //     setFormData({
// // //       ...c,
// // //       scheduledAt: c.scheduledAt
// // //         ? new Date(c.scheduledAt).toISOString().slice(0, 16)
// // //         : "",
// // //     });
// // //     setEditingId(c._id);
// // //     setShowForm(true);
// // //   };

// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Are you sure you want to delete this consultation?")) return;
// // //     try {
// // //       await axios.delete(`${API_URL}/${id}`);
// // //       fetchConsultations();
// // //       alert("🗑️ Consultation deleted successfully");
// // //     } catch (err) {
// // //       console.error("Error deleting consultation:", err);
// // //       alert("❌ Error deleting consultation.");
// // //     }
// // //   };

// // //   const filteredConsultations = consultations
// // //     .filter(
// // //       (c) =>
// // //         (c.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
// // //         (c.astrologerName || "").toLowerCase().includes(search.toLowerCase())
// // //     )
// // //     .filter((c) => !filterAstrologer || c.astrologerName === filterAstrologer);

// // //   const allAstrologers = Array.from(
// // //     new Set(consultations.map((c) => c.astrologerName).filter(Boolean))
// // //   );

// // //   const calendarEvents = consultations.map((c) => ({
// // //     id: c._id,
// // //     title: `${c.clientName || "Client"} — ${c.status}`,
// // //     start: c.scheduledAt,
// // //   }));

// // //   const onEventClick = (info) => {
// // //     const c = consultations.find((x) => x._id === info.event.id);
// // //     if (c) handleEdit(c);
// // //   };

// // //   return (
// // //     <div className="consultation-management-main">
// // //       <div className="consultation-card">
// // //         <div className="consultation-header-row">
// // //           <h2>Consultation Management</h2>
// // //           <button
// // //             className="add-btn"
// // //             onClick={() => setShowForm(!showForm)}
// // //             disabled={loading}
// // //           >
// // //             {showForm ? "Close Form" : "Add Consultation"}
// // //           </button>
// // //         </div>

// // //         {showForm && (
// // //           <form className="consultation-form" onSubmit={handleSubmit}>
// // //             <input
// // //               type="text"
// // //               required
// // //               placeholder="Client Name"
// // //               value={formData.clientName}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, clientName: e.target.value })
// // //               }
// // //             />
// // //             <input
// // //               type="email"
// // //               placeholder="Client Email"
// // //               value={formData.clientEmail}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, clientEmail: e.target.value })
// // //               }
// // //             />
// // //             <input
// // //               type="text"
// // //               required
// // //               placeholder="Astrologer Name"
// // //               value={formData.astrologerName}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, astrologerName: e.target.value })
// // //               }
// // //             />
// // //             <select
// // //               value={formData.type}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, type: e.target.value })
// // //               }
// // //             >
// // //               <option value="Chat">Chat</option>
// // //               <option value="Audio">Audio</option>
// // //               <option value="Video">Video</option>
// // //             </select>
// // //             <select
// // //               value={formData.status}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, status: e.target.value })
// // //               }
// // //             >
// // //               <option value="Pending">Pending</option>
// // //               <option value="In Progress">In Progress</option>
// // //               <option value="Completed">Completed</option>
// // //             </select>
// // //             <input
// // //               type="datetime-local"
// // //               value={formData.scheduledAt}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, scheduledAt: e.target.value })
// // //               }
// // //             />
// // //             <textarea
// // //               placeholder="Notes"
// // //               value={formData.notes}
// // //               onChange={(e) =>
// // //                 setFormData({ ...formData, notes: e.target.value })
// // //               }
// // //             />
// // //             <div className="form-actions">
// // //               <button type="submit" disabled={loading}>
// // //                 {loading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update" : "Add"}
// // //               </button>
// // //               {editingId && (
// // //                 <button
// // //                   type="button"
// // //                   className="cancel-btn"
// // //                   onClick={() => {
// // //                     setFormData(initialForm);
// // //                     setEditingId(null);
// // //                     setShowForm(false);
// // //                   }}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               )}
// // //             </div>
// // //           </form>
// // //         )}

// // //         <div className="search-row">
// // //           <input
// // //             type="text"
// // //             className="search-bar"
// // //             placeholder="Search client or astrologer..."
// // //             value={search}
// // //             onChange={(e) => setSearch(e.target.value)}
// // //           />
// // //           <select
// // //             value={filterAstrologer}
// // //             onChange={(e) => setFilterAstrologer(e.target.value)}
// // //           >
// // //             <option value="">All Astrologers</option>
// // //             {allAstrologers.map((a) => (
// // //               <option key={a} value={a}>
// // //                 {a}
// // //               </option>
// // //             ))}
// // //           </select>
// // //         </div>

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : (
// // //           <div className="consultation-layout">
// // //             <div className="table-container">
// // //               <table className="consultations-table">
// // //                 <thead>
// // //                   <tr>
// // //                     <th>Client</th>
// // //                     <th>Email</th>
// // //                     <th>Astrologer</th>
// // //                     <th>Type</th>
// // //                     <th>Status</th>
// // //                     <th>Schedule</th>
// // //                     <th>Meet Link</th>
// // //                     <th>Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody>
// // //                   {filteredConsultations.length === 0 ? (
// // //                     <tr>
// // //                       <td colSpan={8}>No consultations found.</td>
// // //                     </tr>
// // //                   ) : (
// // //                     filteredConsultations.map((c) => (
// // //                       <tr key={c._id}>
// // //                         <td>{c.clientName}</td>
// // //                         <td>{c.clientEmail}</td>
// // //                         <td>{c.astrologerName}</td>
// // //                         <td>{c.type}</td>
// // //                         <td>{c.status}</td>
// // //                         <td>
// // //                           {c.scheduledAt
// // //                             ? new Date(c.scheduledAt).toLocaleString()
// // //                             : ""}
// // //                         </td>
// // //                         <td>
// // //                           {c.meetingLink ? (
// // //                             <div style={{ display: "flex", gap: "5px" }}>
// // //                               <a
// // //                                 href={c.meetingLink}
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                                 style={{
// // //                                   padding: "5px 10px",
// // //                                   backgroundColor: "#34A853",
// // //                                   color: "#fff",
// // //                                   borderRadius: "5px",
// // //                                   textDecoration: "none",
// // //                                 }}
// // //                               >
// // //                                 Join Google Meet
// // //                               </a>
// // //                               <button
// // //                                 onClick={() => navigator.clipboard.writeText(c.meetingLink)}
// // //                                 style={{
// // //                                   padding: "5px 10px",
// // //                                   borderRadius: "5px",
// // //                                   border: "1px solid #ccc",
// // //                                   cursor: "pointer",
// // //                                 }}
// // //                               >
// // //                                 Copy
// // //                               </button>
// // //                             </div>
// // //                           ) : (
// // //                             "-"
// // //                           )}
// // //                         </td>
// // //                         <td>
// // //                           <button onClick={() => handleEdit(c)}>Edit</button>
// // //                           <button onClick={() => handleDelete(c._id)}>Delete</button>
// // //                         </td>
// // //                       </tr>
// // //                     ))
// // //                   )}
// // //                 </tbody>
// // //               </table>
// // //             </div>

// // //             <div className="calendar-wrapper">
// // //               <FullCalendar
// // //                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// // //                 initialView="timeGridWeek"
// // //                 events={calendarEvents}
// // //                 eventClick={onEventClick}
// // //                 height={550}
// // //               />
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import FullCalendar from "@fullcalendar/react";
// // import dayGridPlugin from "@fullcalendar/daygrid";
// // import timeGridPlugin from "@fullcalendar/timegrid";
// // import interactionPlugin from "@fullcalendar/interaction";
// // import "./ConsultationManagement.css";

// // const initialForm = {
// //   clientName: "",
// //   clientEmail: "",
// //   astrologerName: "",
// //   type: "Chat",
// //   status: "Pending",
// //   scheduledAt: "",
// //   notes: "",
// // };

// // export default function ConsultationManagement() {
// //   const [consultations, setConsultations] = useState([]);
// //   const [formData, setFormData] = useState(initialForm);
// //   const [editingId, setEditingId] = useState(null);
// //   const [showForm, setShowForm] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [filterAstrologer, setFilterAstrologer] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const API_URL = "https://adminastrotalk-1.onrender.com/api/consultations"; // Backend URL

// //   // Fetch all consultations
// //   useEffect(() => {
// //     fetchConsultations();
// //   }, []);

// //   const fetchConsultations = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.get(API_URL);
// //       setConsultations(res.data);
// //     } catch (err) {
// //       console.error("Error fetching consultations:", err);
// //       alert("❌ Error fetching consultations from backend.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Add / Update consultation
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.clientName || !formData.astrologerName)
// //       return alert("Please fill all required fields.");

// //     try {
// //       setLoading(true);
// //       if (editingId) {
// //         await axios.put(`${API_URL}/${editingId}`, formData);
// //         alert("✅ Consultation updated successfully!");
// //       } else {
// //         const res = await axios.post(API_URL, formData);
// //         alert("✅ Consultation added! Email & Meet link sent.");
// //         console.log("New consultation:", res.data);
// //       }
// //       setFormData(initialForm);
// //       setEditingId(null);
// //       setShowForm(false);
// //       fetchConsultations();
// //     } catch (err) {
// //       console.error("❌ Error saving consultation:", err.response?.data || err.message);
// //       alert("❌ Error saving consultation. Check backend logs.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (c) => {
// //     setFormData({
// //       ...c,
// //       scheduledAt: c.scheduledAt
// //         ? new Date(c.scheduledAt).toISOString().slice(0, 16)
// //         : "",
// //     });
// //     setEditingId(c._id);
// //     setShowForm(true);
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Are you sure you want to delete this consultation?")) return;
// //     try {
// //       await axios.delete(`${API_URL}/${id}`);
// //       fetchConsultations();
// //       alert("🗑️ Consultation deleted successfully");
// //     } catch (err) {
// //       console.error("Error deleting consultation:", err);
// //       alert("❌ Error deleting consultation.");
// //     }
// //   };

// //   const filteredConsultations = consultations
// //     .filter(
// //       (c) =>
// //         (c.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
// //         (c.astrologerName || "").toLowerCase().includes(search.toLowerCase())
// //     )
// //     .filter((c) => !filterAstrologer || c.astrologerName === filterAstrologer);

// //   const allAstrologers = Array.from(
// //     new Set(consultations.map((c) => c.astrologerName).filter(Boolean))
// //   );

// //   const calendarEvents = consultations.map((c) => ({
// //     id: c._id,
// //     title: `${c.clientName || "Client"} — ${c.status}`,
// //     start: c.scheduledAt,
// //   }));

// //   const onEventClick = (info) => {
// //     const c = consultations.find((x) => x._id === info.event.id);
// //     if (c) handleEdit(c);
// //   };

// //   return (
// //     <div className="consultation-management-main">
// //       <div className="consultation-card">
// //         <div className="consultation-header-row">
// //           <h2>Consultation Management</h2>
// //           <button
// //             className="add-btn"
// //             onClick={() => setShowForm(!showForm)}
// //             disabled={loading}
// //           >
// //             {showForm ? "Close Form" : "Add Consultation"}
// //           </button>
// //         </div>

// //         {showForm && (
// //           <form className="consultation-form" onSubmit={handleSubmit}>
// //             <input
// //               type="text"
// //               required
// //               placeholder="Client Name"
// //               value={formData.clientName}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, clientName: e.target.value })
// //               }
// //             />
// //             <input
// //               type="email"
// //               placeholder="Client Email"
// //               value={formData.clientEmail}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, clientEmail: e.target.value })
// //               }
// //             />
// //             <input
// //               type="text"
// //               required
// //               placeholder="Astrologer Name"
// //               value={formData.astrologerName}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, astrologerName: e.target.value })
// //               }
// //             />
// //             <select
// //               value={formData.type}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, type: e.target.value })
// //               }
// //             >
// //               <option value="Chat">Chat</option>
// //               <option value="Audio">Audio</option>
// //               <option value="Video">Video</option>
// //             </select>
// //             <select
// //               value={formData.status}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, status: e.target.value })
// //               }
// //             >
// //               <option value="Pending">Pending</option>
// //               <option value="In Progress">In Progress</option>
// //               <option value="Completed">Completed</option>
// //             </select>
// //             <input
// //               type="datetime-local"
// //               value={formData.scheduledAt}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, scheduledAt: e.target.value })
// //               }
// //             />
// //             <textarea
// //               placeholder="Notes"
// //               value={formData.notes}
// //               onChange={(e) =>
// //                 setFormData({ ...formData, notes: e.target.value })
// //               }
// //             />
// //             <div className="form-actions">
// //               <button type="submit" disabled={loading}>
// //                 {editingId ? "Update" : "Add"}
// //               </button>
// //               {editingId && (
// //                 <button
// //                   type="button"
// //                   className="cancel-btn"
// //                   onClick={() => {
// //                     setFormData(initialForm);
// //                     setEditingId(null);
// //                     setShowForm(false);
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //               )}
// //             </div>
// //           </form>
// //         )}

// //         <div className="search-row">
// //           <input
// //             type="text"
// //             className="search-bar"
// //             placeholder="Search client or astrologer..."
// //             value={search}
// //             onChange={(e) => setSearch(e.target.value)}
// //           />
// //           <select
// //             value={filterAstrologer}
// //             onChange={(e) => setFilterAstrologer(e.target.value)}
// //           >
// //             <option value="">All Astrologers</option>
// //             {allAstrologers.map((a) => (
// //               <option key={a} value={a}>
// //                 {a}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : (
// //           <div className="consultation-layout">
// //             <div className="table-container">
// //               <table className="consultations-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Client</th>
// //                     <th>Email</th>
// //                     <th>Astrologer</th>
// //                     <th>Type</th>
// //                     <th>Status</th>
// //                     <th>Schedule</th>
// //                     <th>Meet Link</th>
// //                     <th>Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {filteredConsultations.length === 0 ? (
// //                     <tr>
// //                       <td colSpan={8}>No consultations found.</td>
// //                     </tr>
// //                   ) : (
// //                     filteredConsultations.map((c) => (
// //                       <tr key={c._id}>
// //                         <td>{c.clientName}</td>
// //                         <td>{c.clientEmail}</td>
// //                         <td>{c.astrologerName}</td>
// //                         <td>{c.type}</td>
// //                         <td>{c.status}</td>
// //                         <td>
// //                           {c.scheduledAt
// //                             ? new Date(c.scheduledAt).toLocaleString()
// //                             : ""}
// //                         </td>
// //                         <td>
// //                           {c.meetingLink ? (
// //                             <a
// //                               href={c.meetingLink}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                             >
// //                               Join
// //                             </a>
// //                           ) : (
// //                             "-"
// //                           )}
// //                         </td>
// //                         <td>
// //                           <button onClick={() => handleEdit(c)}>Edit</button>
// //                           <button onClick={() => handleDelete(c._id)}>
// //                             Delete
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>

// //             <div className="calendar-wrapper">
// //               <FullCalendar
// //                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
// //                 initialView="timeGridWeek"
// //                 events={calendarEvents}
// //                 eventClick={onEventClick}
// //                 height={550}
// //               />
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./ConsultationManagement.css";

const initialForm = {
  clientName: "",
  clientEmail: "",
  astrologerName: "",
  type: "Chat",
  status: "Pending",
  scheduledAt: "",
  notes: "",
};

export default function ConsultationManagement() {
  const [consultations, setConsultations] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [filterAstrologer, setFilterAstrologer] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://adminastrotalk-1.onrender.com/api/consultations";

  // Fetch all consultations
  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      // ✅ Ensure we always get an array
      setConsultations(Array.isArray(res.data.consultations) ? res.data.consultations : []);
    } catch (err) {
      console.error("Error fetching consultations:", err);
      alert("❌ Backend not responding. Check if server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.astrologerName) return alert("Please fill all required fields.");

    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert("✅ Consultation updated successfully!");
      } else {
        await axios.post(API_URL, formData);
        alert("✅ Consultation added! Email & Meet link sent.");
      }
      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);
      fetchConsultations();
    } catch (err) {
      console.error("❌ Error saving consultation:", err);
      alert("❌ Error saving consultation. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (c) => {
    setFormData({
      ...c,
      scheduledAt: c.scheduledAt ? new Date(c.scheduledAt).toISOString().slice(0, 16) : "",
    });
    setEditingId(c._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this consultation?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchConsultations();
      alert("🗑️ Consultation deleted successfully");
    } catch (err) {
      console.error("Error deleting consultation:", err);
      alert("❌ Error deleting consultation.");
    }
  };

  // ✅ Safely filter consultations
  const filteredConsultations = Array.isArray(consultations)
    ? consultations
        .filter(
          (c) =>
            (c.clientName || "").toLowerCase().includes(search.toLowerCase()) ||
            (c.astrologerName || "").toLowerCase().includes(search.toLowerCase())
        )
        .filter((c) => !filterAstrologer || c.astrologerName === filterAstrologer)
    : [];

  const allAstrologers = Array.from(
    new Set(
      Array.isArray(consultations) ? consultations.map((c) => c.astrologerName).filter(Boolean) : []
    )
  );

  const calendarEvents = Array.isArray(consultations)
    ? consultations.map((c) => ({
        id: c._id,
        title: `${c.clientName || "Client"} — ${c.status}`,
        start: c.scheduledAt,
      }))
    : [];

  const onEventClick = (info) => {
    const c = consultations.find((x) => x._id === info.event.id);
    if (c) handleEdit(c);
  };

  return (
    <div className="consultation-management-main">
      <div className="consultation-card">
        <div className="consultation-header-row">
          <h2>Consultation Management</h2>
          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
            disabled={loading}
          >
            {showForm ? "Close Form" : "Add Consultation"}
          </button>
        </div>

        {showForm && (
          <form className="consultation-form" onSubmit={handleSubmit}>
            <input
              type="text"
              required
              placeholder="Client Name"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            />
            <input
              type="email"
              placeholder="Client Email"
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
            />
            <input
              type="text"
              required
              placeholder="Astrologer Name"
              value={formData.astrologerName}
              onChange={(e) => setFormData({ ...formData, astrologerName: e.target.value })}
            />
            <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <option value="Chat">Chat</option>
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
            </select>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="datetime-local"
              value={formData.scheduledAt}
              onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
            />
            <textarea
              placeholder="Notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {editingId ? "Update" : "Add"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setFormData(initialForm);
                    setEditingId(null);
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        )}

        <div className="search-row">
          <input
            type="text"
            className="search-bar"
            placeholder="Search client or astrologer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={filterAstrologer} onChange={(e) => setFilterAstrologer(e.target.value)}>
            <option value="">All Astrologers</option>
            {allAstrologers.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="consultation-layout">
            <div className="table-container">
              <table className="consultations-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Astrologer</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Schedule</th>
                    <th>Meet Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultations.length === 0 ? (
                    <tr>
                      <td colSpan={8}>No consultations found.</td>
                    </tr>
                  ) : (
                    filteredConsultations.map((c) => (
                      <tr key={c._id}>
                        <td>{c.clientName}</td>
                        <td>{c.clientEmail}</td>
                        <td>{c.astrologerName}</td>
                        <td>{c.type}</td>
                        <td>{c.status}</td>
                        <td>{c.scheduledAt ? new Date(c.scheduledAt).toLocaleString() : ""}</td>
                        <td>
                          {c.meetingLink ? (
                            <a href={c.meetingLink} target="_blank" rel="noopener noreferrer">
                              Join
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <button onClick={() => handleEdit(c)}>Edit</button>
                          <button onClick={() => handleDelete(c._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="calendar-wrapper">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                events={calendarEvents}
                eventClick={onEventClick}
                height={550}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
