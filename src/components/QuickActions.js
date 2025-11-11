

// // import React, { useState } from "react";
// // import Modal from "react-modal";
// // import "../styles/Dashboard.css";

// // Modal.setAppElement("#root"); // For accessibility

// // export default function QuickActions() {
// //   const actions = [
// //     { label: "Upload Report", emoji: "📄" },
// //     { label: "Add Remedy / Ritual", emoji: "💊" },
// //     { label: "Schedule Call", emoji: "📞" },
// //     { label: "Push Broadcast", emoji: "📣" },
// //     { label: "Create New Service / Form", emoji: "📝" },
// //     { label: "Set Consultation Slot", emoji: "🕒" },
// //   ];

// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   const [activeAction, setActiveAction] = useState("");

// //   const openModal = (action) => {
// //     setActiveAction(action);
// //     setModalIsOpen(true);
// //   };

// //   const closeModal = () => {
// //     setModalIsOpen(false);
// //     setActiveAction("");
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     alert(`${activeAction} form submitted!`);
// //     closeModal();
// //   };

// //   return (
// //     <div className="quick-actions">
// //       <h3>Quick Actions</h3>
// //       <div className="actions-grid">
// //         {actions.map((action, i) => (
// //           <button
// //             key={i}
// //             className="action-btn"
// //             onClick={() => openModal(action.label)}
// //           >
// //             <span className="emoji">{action.emoji}</span> {action.label}
// //           </button>
// //         ))}
// //       </div>

// //       <Modal
// //         isOpen={modalIsOpen}
// //         onRequestClose={closeModal}
// //         contentLabel={activeAction}
// //         className="modal"
// //         overlayClassName="overlay"
// //       >
// //         <h2>{activeAction}</h2>
// //         <form onSubmit={handleSubmit} className="modal-form">
// //           <label>
// //             Client Name:
// //             <input type="text" required placeholder="Enter client name" />
// //           </label>

// //           {activeAction === "Upload Report" && (
// //             <label>
// //               Upload File:
// //               <input type="file" required />
// //             </label>
// //           )}

// //           {activeAction === "Schedule Call" && (
// //             <label>
// //               Call Date & Time:
// //               <input type="datetime-local" required />
// //             </label>
// //           )}

// //           {activeAction === "Add Remedy / Ritual" && (
// //             <label>
// //               Remedy Details:
// //               <textarea required placeholder="Enter remedy/ritual details"></textarea>
// //             </label>
// //           )}

// //           {activeAction === "Push Broadcast" && (
// //             <label>
// //               Message:
// //               <textarea required placeholder="Enter broadcast message"></textarea>
// //             </label>
// //           )}

// //           {activeAction === "Create New Service / Form" && (
// //             <label>
// //               Service Name:
// //               <input type="text" required placeholder="Enter service name" />
// //             </label>
// //           )}

// //           {activeAction === "Set Consultation Slot" && (
// //             <label>
// //               Available Slot:
// //               <input type="datetime-local" required />
// //             </label>
// //           )}

// //           <div className="modal-buttons">
// //             <button type="submit" className="submit-btn">
// //               Submit
// //             </button>
// //             <button type="button" className="cancel-btn" onClick={closeModal}>
// //               Cancel
// //             </button>
// //           </div>
// //         </form>
// //       </Modal>
// //     </div>
// //   );
// // }

// // import React, { useState } from "react";
// // import Modal from "react-modal";
// // import "../styles/Dashboard.css";
// // import API from "../api/api";
// // import io from "socket.io-client";
// // import axios from "axios";

// // Modal.setAppElement("#root");

// // const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

// // export default function QuickActions() {
// //   const actions = [
// //     { label: "Upload Report", emoji: "📄" },
// //     { label: "Add Remedy / Ritual", emoji: "💊" },
// //     { label: "Schedule Call", emoji: "📞" },
// //     { label: "Push Broadcast", emoji: "📣" },
// //     { label: "Create New Service / Form", emoji: "📝" },
// //     { label: "Set Consultation Slot", emoji: "🕒" },
// //   ];

// //   const [modalIsOpen, setModalIsOpen] = useState(false);
// //   const [activeAction, setActiveAction] = useState("");
// //   const [formData, setFormData] = useState({
// //     title: "",
// //     reportType: "consultation",
// //     revenue: "",
// //     status: "pending",
// //     completedAt: "",
// //     clientName: "",
// //     astrologerName: "",
// //   });

// //   const [remedyData, setRemedyData] = useState({
// //     clientName: "",
// //     email: "",
// //     remedyType: "Gemstone",
// //     description: "",
// //     status: "Pending",
// //     file: null,
// //   });
// //   const [selectedFileName, setSelectedFileName] = useState("");

// //   // Modal Control
// //   const openModal = (action) => {
// //     setActiveAction(action);
// //     setModalIsOpen(true);
// //   };
// //   const closeModal = () => {
// //     setModalIsOpen(false);
// //     setActiveAction("");
// //     resetForms();
// //   };

// //   const resetForms = () => {
// //     setFormData({
// //       title: "",
// //       reportType: "consultation",
// //       revenue: "",
// //       status: "pending",
// //       completedAt: "",
// //       clientName: "",
// //       astrologerName: "",
// //     });
// //     setRemedyData({
// //       clientName: "",
// //       email: "",
// //       remedyType: "Gemstone",
// //       description: "",
// //       status: "Pending",
// //       file: null,
// //     });
// //     setSelectedFileName("");
// //   };

// //   // 🧾 Upload Report Submit
// //   const handleUploadReport = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await API.post("/reports", formData);
// //       socket.emit("reportUpdate");
// //       alert("✅ Report uploaded successfully!");
// //       closeModal();
// //     } catch (err) {
// //       console.error("Upload Report Error:", err);
// //       alert("❌ Failed to upload report");
// //     }
// //   };

// //   // 💊 Add Remedy Submit
// //   const handleAddRemedy = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const data = new FormData();
// //       data.append("clientName", remedyData.clientName);
// //       data.append("email", remedyData.email);
// //       data.append("remedyType", remedyData.remedyType);
// //       data.append("description", remedyData.description);
// //       data.append("status", remedyData.status);
// //       if (remedyData.file) data.append("file", remedyData.file);

// //       await axios.post("https://adminastrotalk-1.onrender.com/api/remedies", data, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       socket.emit("remedyUpdate"); // 🔁 Notify Remedies.jsx to refresh
// //       alert("✅ Remedy added successfully!");
// //       closeModal();
// //     } catch (err) {
// //       console.error("Remedy Add Error:", err);
// //       alert("❌ Failed to add remedy");
// //     }
// //   };

// //   return (
// //     <div className="quick-actions">
// //       <h3>Quick Actions</h3>
// //       <div className="actions-grid">
// //         {actions.map((action, i) => (
// //           <button key={i} className="action-btn" onClick={() => openModal(action.label)}>
// //             <span className="emoji">{action.emoji}</span> {action.label}
// //           </button>
// //         ))}
// //       </div>

// //       {/* ======================== MODAL ======================== */}
// //       <Modal
// //         isOpen={modalIsOpen}
// //         onRequestClose={closeModal}
// //         contentLabel={activeAction}
// //         className="modal"
// //         overlayClassName="overlay"
// //       >
// //         <h2>{activeAction}</h2>

// //         {/* 📄 Upload Report Form */}
// //         {activeAction === "Upload Report" && (
// //           <form onSubmit={handleUploadReport} className="modal-form">
// //             <label>
// //               Report Title:
// //               <input
// //                 type="text"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                 required
// //               />
// //             </label>
// //             <label>
// //               Report Type:
// //               <select
// //                 name="reportType"
// //                 value={formData.reportType}
// //                 onChange={(e) => setFormData({ ...formData, reportType: e.target.value })}
// //               >
// //                 <option value="consultation">Consultation</option>
// //                 <option value="remedy">Remedy</option>
// //                 <option value="analysis">Analysis</option>
// //                 <option value="custom">Custom</option>
// //               </select>
// //             </label>
// //             <label>
// //               Revenue (₹):
// //               <input
// //                 type="number"
// //                 name="revenue"
// //                 value={formData.revenue}
// //                 onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
// //                 required
// //               />
// //             </label>
// //             <label>
// //               Client Name:
// //               <input
// //                 type="text"
// //                 name="clientName"
// //                 value={formData.clientName}
// //                 onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
// //               />
// //             </label>
// //             <label>
// //               Astrologer Name:
// //               <input
// //                 type="text"
// //                 name="astrologerName"
// //                 value={formData.astrologerName}
// //                 onChange={(e) => setFormData({ ...formData, astrologerName: e.target.value })}
// //               />
// //             </label>
// //             <div className="modal-buttons">
// //               <button type="submit" className="submit-btn">Submit Report</button>
// //               <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
// //             </div>
// //           </form>
// //         )}

// //         {/* 💊 Add Remedy / Ritual Form */}
// //         {activeAction === "Add Remedy / Ritual" && (
// //           <form onSubmit={handleAddRemedy} className="modal-form">
// //             <label>
// //               Client Name:
// //               <input
// //                 type="text"
// //                 value={remedyData.clientName}
// //                 onChange={(e) => setRemedyData({ ...remedyData, clientName: e.target.value })}
// //                 required
// //               />
// //             </label>
// //             <label>
// //               Email:
// //               <input
// //                 type="email"
// //                 value={remedyData.email}
// //                 onChange={(e) => setRemedyData({ ...remedyData, email: e.target.value })}
// //                 required
// //               />
// //             </label>
// //             <label>
// //               Remedy Type:
// //               <select
// //                 value={remedyData.remedyType}
// //                 onChange={(e) => setRemedyData({ ...remedyData, remedyType: e.target.value })}
// //               >
// //                 <option value="Gemstone">Gemstone</option>
// //                 <option value="Yantra">Yantra</option>
// //                 <option value="Mantra">Mantra</option>
// //                 <option value="Homa">Homa</option>
// //                 <option value="Rahu Yantra">Rahu Yantra</option>
// //                 <option value="Other">Other</option>
// //               </select>
// //             </label>
// //             <label>
// //               Description:
// //               <textarea
// //                 value={remedyData.description}
// //                 onChange={(e) => setRemedyData({ ...remedyData, description: e.target.value })}
// //                 required
// //               ></textarea>
// //             </label>
// //             <label>
// //               Status:
// //               <select
// //                 value={remedyData.status}
// //                 onChange={(e) => setRemedyData({ ...remedyData, status: e.target.value })}
// //               >
// //                 <option value="Pending">Pending</option>
// //                 <option value="Completed">Completed</option>
// //               </select>
// //             </label>
// //             <label>
// //               Upload File:
// //               <input
// //                 type="file"
// //                 onChange={(e) => {
// //                   const file = e.target.files[0];
// //                   setRemedyData({ ...remedyData, file });
// //                   setSelectedFileName(file ? file.name : "");
// //                 }}
// //               />
// //             </label>
// //             {selectedFileName && <p className="file-preview">📎 {selectedFileName}</p>}

// //             <div className="modal-buttons">
// //               <button type="submit" className="submit-btn">Submit Remedy</button>
// //               <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
// //             </div>
// //           </form>
// //         )}

// //         {/* Default Form for Other Actions */}
// //         {activeAction !== "Upload Report" && activeAction !== "Add Remedy / Ritual" && (
// //           <form onSubmit={(e) => { e.preventDefault(); alert(`${activeAction} submitted!`); closeModal(); }} className="modal-form">
// //             <label>
// //               Client Name:
// //               <input type="text" required placeholder="Enter client name" />
// //             </label>
// //             <textarea required placeholder={`Enter details for ${activeAction}`}></textarea>
// //             <div className="modal-buttons">
// //               <button type="submit" className="submit-btn">Submit</button>
// //               <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
// //             </div>
// //           </form>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import Modal from "react-modal";
// import "../styles/Dashboard.css";
// import API from "../api/api";
// import axios from "axios";
// import io from "socket.io-client";

// Modal.setAppElement("#root");

// const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

// export default function QuickActions() {
//   const actions = [
//     { label: "Upload Report", emoji: "📄" },
//     { label: "Add Remedy / Ritual", emoji: "💊" },
//     { label: "Schedule Call", emoji: "📞" },
//     { label: "Push Broadcast", emoji: "📣" },
//     { label: "Create New Service / Form", emoji: "📝" },
//     { label: "Set Consultation Slot", emoji: "🕒" },
//   ];

//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [activeAction, setActiveAction] = useState("");

//   // 🧾 Report form
//   const [reportData, setReportData] = useState({
//     title: "",
//     reportType: "consultation",
//     revenue: "",
//     status: "pending",
//     completedAt: "",
//     clientName: "",
//     astrologerName: "",
//   });

//   // 💊 Remedy form
//   const [remedyData, setRemedyData] = useState({
//     clientName: "",
//     email: "",
//     remedyType: "Gemstone",
//     description: "",
//     status: "Pending",
//     file: null,
//   });

//   // 📞 Consultation form (Schedule / Set Slot)
//   const [consultData, setConsultData] = useState({
//     clientName: "",
//     clientEmail: "",
//     astrologerName: "",
//     type: "Chat",
//     status: "Pending",
//     scheduledAt: "",
//     notes: "",
//   });

//   const [selectedFileName, setSelectedFileName] = useState("");

//   const openModal = (action) => {
//     setActiveAction(action);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setActiveAction("");
//     resetForms();
//   };

//   const resetForms = () => {
//     setReportData({
//       title: "",
//       reportType: "consultation",
//       revenue: "",
//       status: "pending",
//       completedAt: "",
//       clientName: "",
//       astrologerName: "",
//     });
//     setRemedyData({
//       clientName: "",
//       email: "",
//       remedyType: "Gemstone",
//       description: "",
//       status: "Pending",
//       file: null,
//     });
//     setConsultData({
//       clientName: "",
//       clientEmail: "",
//       astrologerName: "",
//       type: "Chat",
//       status: "Pending",
//       scheduledAt: "",
//       notes: "",
//     });
//     setSelectedFileName("");
//   };

//   // 📄 Upload Report
//   const handleUploadReport = async (e) => {
//     e.preventDefault();
//     try {
//       await API.post("/reports", reportData);
//       socket.emit("reportUpdate");
//       alert("✅ Report uploaded successfully!");
//       closeModal();
//     } catch (err) {
//       console.error("Upload Report Error:", err);
//       alert("❌ Failed to upload report");
//     }
//   };

//   // 💊 Add Remedy
//   const handleAddRemedy = async (e) => {
//     e.preventDefault();
//     try {
//       const data = new FormData();
//       data.append("clientName", remedyData.clientName);
//       data.append("email", remedyData.email);
//       data.append("remedyType", remedyData.remedyType);
//       data.append("description", remedyData.description);
//       data.append("status", remedyData.status);
//       if (remedyData.file) data.append("file", remedyData.file);

//       await axios.post("https://adminastrotalk-1.onrender.com/api/remedies", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       socket.emit("remedyUpdate");
//       alert("✅ Remedy added successfully!");
//       closeModal();
//     } catch (err) {
//       console.error("Remedy Add Error:", err);
//       alert("❌ Failed to add remedy");
//     }
//   };

//   // 📞 Schedule Call or 🕒 Set Consultation Slot
//   const handleConsultation = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("https://adminastrotalk-1.onrender.com/api/consultations", consultData);
//       socket.emit("consultationUpdate");
//       alert("✅ Consultation Scheduled Successfully!");
//       closeModal();
//     } catch (err) {
//       console.error("Consultation Error:", err);
//       alert("❌ Failed to schedule consultation");
//     }
//   };

//   return (
//     <div className="quick-actions">
//       <h3>Quick Actions</h3>
//       <div className="actions-grid">
//         {actions.map((action, i) => (
//           <button key={i} className="action-btn" onClick={() => openModal(action.label)}>
//             <span className="emoji">{action.emoji}</span> {action.label}
//           </button>
//         ))}
//       </div>

//       {/* =================== MODAL =================== */}
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel={activeAction}
//         className="modal"
//         overlayClassName="overlay"
//       >
//         <h2>{activeAction}</h2>

//         {/* 📄 Upload Report */}
//         {activeAction === "Upload Report" && (
//           <form onSubmit={handleUploadReport} className="modal-form">
//             <label>
//               Report Title:
//               <input
//                 type="text"
//                 value={reportData.title}
//                 onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
//                 required
//               />
//             </label>
//             <label>
//               Report Type:
//               <select
//                 value={reportData.reportType}
//                 onChange={(e) => setReportData({ ...reportData, reportType: e.target.value })}
//               >
//                 <option value="consultation">Consultation</option>
//                 <option value="remedy">Remedy</option>
//                 <option value="analysis">Analysis</option>
//               </select>
//             </label>
//             <label>
//               Revenue (₹):
//               <input
//                 type="number"
//                 value={reportData.revenue}
//                 onChange={(e) => setReportData({ ...reportData, revenue: e.target.value })}
//               />
//             </label>
//             <label>
//               Client Name:
//               <input
//                 type="text"
//                 value={reportData.clientName}
//                 onChange={(e) => setReportData({ ...reportData, clientName: e.target.value })}
//               />
//             </label>
//             <div className="modal-buttons">
//               <button type="submit" className="submit-btn">Submit</button>
//               <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
//             </div>
//           </form>
//         )}

//         {/* 💊 Add Remedy */}
//         {activeAction === "Add Remedy / Ritual" && (
//           <form onSubmit={handleAddRemedy} className="modal-form">
//             <label>Client Name:</label>
//             <input
//               type="text"
//               value={remedyData.clientName}
//               onChange={(e) => setRemedyData({ ...remedyData, clientName: e.target.value })}
//               required
//             />
//             <label>Email:</label>
//             <input
//               type="email"
//               value={remedyData.email}
//               onChange={(e) => setRemedyData({ ...remedyData, email: e.target.value })}
//               required
//             />
//             <label>Remedy Type:</label>
//             <select
//               value={remedyData.remedyType}
//               onChange={(e) => setRemedyData({ ...remedyData, remedyType: e.target.value })}
//             >
//               <option value="Gemstone">Gemstone</option>
//               <option value="Yantra">Yantra</option>
//               <option value="Mantra">Mantra</option>
//               <option value="Homa">Homa</option>
//             </select>
//             <label>Description:</label>
//             <textarea
//               value={remedyData.description}
//               onChange={(e) => setRemedyData({ ...remedyData, description: e.target.value })}
//               required
//             />
//             <label>Status:</label>
//             <select
//               value={remedyData.status}
//               onChange={(e) => setRemedyData({ ...remedyData, status: e.target.value })}
//             >
//               <option value="Pending">Pending</option>
//               <option value="Completed">Completed</option>
//             </select>
//             <label>Upload File:</label>
//             <input
//               type="file"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 setRemedyData({ ...remedyData, file });
//                 setSelectedFileName(file ? file.name : "");
//               }}
//             />
//             {selectedFileName && <p className="file-preview">📎 {selectedFileName}</p>}
//             <div className="modal-buttons">
//               <button type="submit" className="submit-btn">Submit Remedy</button>
//               <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
//             </div>
//           </form>
//         )}

//         {/* 📞 Schedule Call / 🕒 Set Consultation Slot */}
//         {(activeAction === "Schedule Call" || activeAction === "Set Consultation Slot") && (
//           <form onSubmit={handleConsultation} className="modal-form">
//             <label>Client Name:</label>
//             <input
//               type="text"
//               value={consultData.clientName}
//               onChange={(e) => setConsultData({ ...consultData, clientName: e.target.value })}
//               required
//             />
//             <label>Client Email:</label>
//             <input
//               type="email"
//               value={consultData.clientEmail}
//               onChange={(e) => setConsultData({ ...consultData, clientEmail: e.target.value })}
//               required
//             />
//             <label>Astrologer Name:</label>
//             <input
//               type="text"
//               value={consultData.astrologerName}
//               onChange={(e) => setConsultData({ ...consultData, astrologerName: e.target.value })}
//               required
//             />
//             <label>Consultation Type:</label>
//             <select
//               value={consultData.type}
//               onChange={(e) => setConsultData({ ...consultData, type: e.target.value })}
//             >
//               <option value="Chat">Chat</option>
//               <option value="Audio">Audio</option>
//               <option value="Video">Video</option>
//             </select>
//             <label>Status:</label>
//             <select
//               value={consultData.status}
//               onChange={(e) => setConsultData({ ...consultData, status: e.target.value })}
//             >
//               <option value="Pending">Pending</option>
//               <option value="In Progress">In Progress</option>
//               <option value="Completed">Completed</option>
//             </select>
//             <label>Scheduled At:</label>
//             <input
//               type="datetime-local"
//               value={consultData.scheduledAt}
//               onChange={(e) => setConsultData({ ...consultData, scheduledAt: e.target.value })}
//               required
//             />
//             <label>Notes:</label>
//             <textarea
//               placeholder="Enter meeting or consultation notes"
//               value={consultData.notes}
//               onChange={(e) => setConsultData({ ...consultData, notes: e.target.value })}
//             />
//             <div className="modal-buttons">
//               <button type="submit" className="submit-btn">Save Consultation</button>
//               <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
//             </div>
//           </form>
//         )}
//       </Modal>
//     </div>
//   );
// }

import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/Dashboard.css";
import API, { serviceApi } from "../api/api";
import axios from "axios";
import io from "socket.io-client";

Modal.setAppElement("#root");

const socket = io(process.env.REACT_APP_BACKEND_URL || "https://adminastrotalk-1.onrender.com/");

export default function QuickActions() {
  const actions = [
    { label: "Upload Report", emoji: "📄" },
    { label: "Add Remedy / Ritual", emoji: "💊" },
    { label: "Schedule Call", emoji: "📞" },
    { label: "Push Broadcast", emoji: "📣" },
    { label: "Create New Service / Form", emoji: "📝" },
    { label: "Set Consultation Slot", emoji: "🕒" },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState("");

  // ====== Report ======
  const [reportData, setReportData] = useState({
    title: "",
    reportType: "consultation",
    revenue: "",
    status: "pending",
    completedAt: "",
    clientName: "",
    astrologerName: "",
  });

  // ====== Remedy ======
  const [remedyData, setRemedyData] = useState({
    clientName: "",
    email: "",
    remedyType: "Gemstone",
    description: "",
    status: "Pending",
    file: null,
  });

  // ====== Consultation ======
  const [consultData, setConsultData] = useState({
    clientName: "",
    clientEmail: "",
    astrologerName: "",
    type: "Chat",
    status: "Pending",
    scheduledAt: "",
    notes: "",
  });

  // ====== Service ======
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: "",
    timeline: "",
  });
  const [serviceFiles, setServiceFiles] = useState([]);

  const [selectedFileName, setSelectedFileName] = useState("");

  // ====== Handlers ======
  const openModal = (action) => {
    setActiveAction(action);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveAction("");
    resetForms();
  };

  const resetForms = () => {
    setReportData({
      title: "",
      reportType: "consultation",
      revenue: "",
      status: "pending",
      completedAt: "",
      clientName: "",
      astrologerName: "",
    });
    setRemedyData({
      clientName: "",
      email: "",
      remedyType: "Gemstone",
      description: "",
      status: "Pending",
      file: null,
    });
    setConsultData({
      clientName: "",
      clientEmail: "",
      astrologerName: "",
      type: "Chat",
      status: "Pending",
      scheduledAt: "",
      notes: "",
    });
    setServiceData({
      name: "",
      description: "",
      price: "",
      timeline: "",
    });
    setServiceFiles([]);
  };

  // ====== Upload Report ======
  const handleUploadReport = async (e) => {
    e.preventDefault();
    try {
      await API.post("/reports", reportData);
      socket.emit("reportUpdate");
      alert("✅ Report uploaded successfully!");
      closeModal();
    } catch (err) {
      console.error("Upload Report Error:", err);
      alert("❌ Failed to upload report");
    }
  };

  // ====== Add Remedy ======
  const handleAddRemedy = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("clientName", remedyData.clientName);
      data.append("email", remedyData.email);
      data.append("remedyType", remedyData.remedyType);
      data.append("description", remedyData.description);
      data.append("status", remedyData.status);
      if (remedyData.file) data.append("file", remedyData.file);

      await axios.post("https://adminastrotalk-1.onrender.com/api/remedies", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      socket.emit("remedyUpdate");
      alert("✅ Remedy added successfully!");
      closeModal();
    } catch (err) {
      console.error("Remedy Add Error:", err);
      alert("❌ Failed to add remedy");
    }
  };

  // ====== Consultation (Schedule / Slot) ======
  const handleConsultation = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...consultData, createMeet: true };
      const res = await API.post("/consultations", payload);
      if (res.data.success) {
        alert(
          res.data.data.meetingLink
            ? `✅ Consultation Scheduled! \nMeet link: ${res.data.data.meetingLink}`
            : "✅ Consultation Scheduled!"
        );
      }
      socket.emit("consultationUpdate");
      closeModal();
    } catch (err) {
      console.error("Consultation Error:", err);
      alert("❌ Failed to schedule consultation");
    }
  };

  // ====== Create Service ======
  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", serviceData.name);
      formData.append("description", serviceData.description);
      formData.append("price", serviceData.price);
      formData.append("timeline", serviceData.timeline);
      serviceFiles.forEach((f) => formData.append("media", f));

      await serviceApi.post("/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      socket.emit("serviceUpdate");
      alert("✅ Service Created Successfully!");
      closeModal();
    } catch (err) {
      console.error("Service Create Error:", err);
      alert("❌ Failed to create service");
    }
  };

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, i) => (
          <button key={i} className="action-btn" onClick={() => openModal(action.label)}>
            <span className="emoji">{action.emoji}</span> {action.label}
          </button>
        ))}
      </div>

      {/* ===================== MODAL ===================== */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={activeAction}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{activeAction}</h2>

        {/* 📄 Upload Report */}
        {activeAction === "Upload Report" && (
          <form onSubmit={handleUploadReport} className="modal-form">
            <label>Report Title:</label>
            <input
              type="text"
              value={reportData.title}
              onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
              required
            />
            <label>Report Type:</label>
            <select
              value={reportData.reportType}
              onChange={(e) => setReportData({ ...reportData, reportType: e.target.value })}
            >
              <option value="consultation">Consultation</option>
              <option value="remedy">Remedy</option>
              <option value="analysis">Analysis</option>
            </select>
            <label>Revenue (₹):</label>
            <input
              type="number"
              value={reportData.revenue}
              onChange={(e) => setReportData({ ...reportData, revenue: e.target.value })}
            />
            <label>Client Name:</label>
            <input
              type="text"
              value={reportData.clientName}
              onChange={(e) => setReportData({ ...reportData, clientName: e.target.value })}
            />
            <div className="modal-buttons">
              <button type="submit" className="submit-btn">
                Submit
              </button>
              <button type="button" className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* 💊 Add Remedy */}
        {activeAction === "Add Remedy / Ritual" && (
          <form onSubmit={handleAddRemedy} className="modal-form">
            <label>Client Name:</label>
            <input
              type="text"
              value={remedyData.clientName}
              onChange={(e) => setRemedyData({ ...remedyData, clientName: e.target.value })}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              value={remedyData.email}
              onChange={(e) => setRemedyData({ ...remedyData, email: e.target.value })}
              required
            />
            <label>Remedy Type:</label>
            <select
              value={remedyData.remedyType}
              onChange={(e) => setRemedyData({ ...remedyData, remedyType: e.target.value })}
            >
              <option value="Gemstone">Gemstone</option>
              <option value="Yantra">Yantra</option>
              <option value="Mantra">Mantra</option>
              <option value="Homa">Homa</option>
            </select>
            <label>Description:</label>
            <textarea
              value={remedyData.description}
              onChange={(e) => setRemedyData({ ...remedyData, description: e.target.value })}
              required
            />
            <label>Upload File:</label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setRemedyData({ ...remedyData, file });
                setSelectedFileName(file ? file.name : "");
              }}
            />
            {selectedFileName && <p className="file-preview">📎 {selectedFileName}</p>}
            <div className="modal-buttons">
              <button type="submit" className="submit-btn">Submit Remedy</button>
              <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        )}

        {/* 📞 Schedule Call / 🕒 Set Consultation Slot */}
        {(activeAction === "Schedule Call" || activeAction === "Set Consultation Slot") && (
          <form onSubmit={handleConsultation} className="modal-form">
            <label>Client Name:</label>
            <input
              type="text"
              value={consultData.clientName}
              onChange={(e) => setConsultData({ ...consultData, clientName: e.target.value })}
              required
            />
            <label>Client Email:</label>
            <input
              type="email"
              value={consultData.clientEmail}
              onChange={(e) => setConsultData({ ...consultData, clientEmail: e.target.value })}
              required
            />
            <label>Astrologer Name:</label>
            <input
              type="text"
              value={consultData.astrologerName}
              onChange={(e) => setConsultData({ ...consultData, astrologerName: e.target.value })}
              required
            />
            <label>Consultation Type:</label>
            <select
              value={consultData.type}
              onChange={(e) => setConsultData({ ...consultData, type: e.target.value })}
            >
              <option value="Chat">Chat</option>
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
            </select>
            <label>Status:</label>
            <select
              value={consultData.status}
              onChange={(e) => setConsultData({ ...consultData, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <label>Scheduled At:</label>
            <input
              type="datetime-local"
              value={consultData.scheduledAt}
              onChange={(e) => setConsultData({ ...consultData, scheduledAt: e.target.value })}
              required
            />
            <label>Notes:</label>
            <textarea
              placeholder="Enter meeting or consultation notes"
              value={consultData.notes}
              onChange={(e) => setConsultData({ ...consultData, notes: e.target.value })}
            />
            <div className="modal-buttons">
              <button type="submit" className="submit-btn">Save Consultation</button>
              <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        )}

        {/* 📝 Create New Service / Form */}
        {activeAction === "Create New Service / Form" && (
          <form onSubmit={handleCreateService} className="modal-form">
            <label>Service Name:</label>
            <input
              type="text"
              value={serviceData.name}
              onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
              required
            />
            <label>Description:</label>
            <textarea
              value={serviceData.description}
              onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
              required
            />
            <label>Price (₹):</label>
            <input
              type="number"
              value={serviceData.price}
              onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
            />
            <label>Timeline:</label>
            <input
              type="text"
              value={serviceData.timeline}
              onChange={(e) => setServiceData({ ...serviceData, timeline: e.target.value })}
            />
            <label>Upload Media:</label>
            <input type="file" multiple onChange={(e) => setServiceFiles([...e.target.files])} />
            <div className="modal-buttons">
              <button type="submit" className="submit-btn">Create Service</button>
              <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
