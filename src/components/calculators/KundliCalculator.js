// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/KundliCalculator.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

// const KundliCalculator = () => {
//   const [form, setForm] = useState({
//     name: "",
//     dateOfBirth: "",
//     timeOfBirth: "",
//     placeOfBirth: "",
//   });
//   const [kundlis, setKundlis] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false); // form initially hidden

//   // Fetch all saved kundlis
//   const fetchKundlis = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/kundlis`);
//       setKundlis(res.data);
//     } catch (err) {
//       console.error("❌ Error fetching kundlis:", err);
//     }
//   };

//   useEffect(() => {
//     fetchKundlis();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(`${API_BASE}/kundlis/${editingId}`, form);
//         alert("✅ Kundli updated successfully!");
//         setEditingId(null);
//       } else {
//         await axios.post(`${API_BASE}/kundlis/calculate`, form);
//         alert("✅ Kundli calculated & saved successfully!");
//       }
//       setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
//       setShowForm(false); // hide form after submission
//       fetchKundlis();
//     } catch (err) {
//       console.error("❌ Error calculating/updating Kundli:", err);
//       alert("Calculation failed. Please check your input.");
//     }
//   };

//   const handleEdit = (kundli) => {
//     setForm({
//       name: kundli.name,
//       dateOfBirth: kundli.dateOfBirth,
//       timeOfBirth: kundli.timeOfBirth,
//       placeOfBirth: kundli.placeOfBirth,
//     });
//     setEditingId(kundli._id);
//     setShowForm(true); // show form when editing
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this Kundli?")) return;
//     try {
//       await axios.delete(`${API_BASE}/kundlis/${id}`);
//       fetchKundlis();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
//   };

//   return (
//     <div className="kundli-container">
//       <h2>🪔 Kundli Calculator</h2>

//       {/* Add Kundli Button */}
//       <button className="add-btn" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Hide Form" : "Add Kundli"}
//       </button>

//       {/* Form */}
//       {showForm && (
//         <form className="kundli-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={form.dateOfBirth}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="time"
//             name="timeOfBirth"
//             value={form.timeOfBirth}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             name="placeOfBirth"
//             placeholder="Place of Birth"
//             value={form.placeOfBirth}
//             onChange={handleChange}
//             required
//           />
//           <div className="btn-group">
//             <button type="submit">{editingId ? "Update Kundli" : "Calculate & Save"}</button>
//             {editingId && (
//               <button type="button" className="cancel-btn" onClick={cancelEdit}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       )}

//       {/* Saved Kundlis */}
//       <h3>📜 All Saved Kundlis</h3>
//       {kundlis.length === 0 ? (
//         <p>No Kundli data found.</p>
//       ) : (
//         <table className="kundli-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>DOB</th>
//               <th>Time</th>
//               <th>Place</th>
//               <th>Sun Sign</th>
//               <th>Moon Sign</th>
//               <th>Ascendant</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {kundlis.map((k) => (
//               <tr key={k._id}>
//                 <td data-label="Name">{k.name}</td>
//                 <td data-label="DOB">{k.dateOfBirth}</td>
//                 <td data-label="Time">{k.timeOfBirth}</td>
//                 <td data-label="Place">{k.placeOfBirth}</td>
//                 <td data-label="Sun Sign">{k.kundliData?.sunSign || "-"}</td>
//                 <td data-label="Moon Sign">{k.kundliData?.moonSign || "-"}</td>
//                 <td data-label="Ascendant">{k.kundliData?.ascendant || "-"}</td>
//                 <td data-label="Description">{k.kundliData?.description || "-"}</td>
//                 <td data-label="Actions">
//                   <button className="edit-btn" onClick={() => handleEdit(k)}>Edit</button>
//                   <button className="delete-btn" onClick={() => handleDelete(k._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default KundliCalculator;

import React, { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../../styles/KundliCalculator.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function KundliCalculator() {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [kundlis, setKundlis] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedKundli, setSelectedKundli] = useState(null);

  const fetchKundlis = async () => {
    try {
      const res = await axios.get(`${API_BASE}/kundlis`);
      setKundlis(res.data.data || res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchKundlis();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/kundlis/${editingId}`, form);
        alert("✅ Kundli updated successfully!");
      } else {
        await axios.post(`${API_BASE}/kundlis/calculate`, form);
        alert("✅ Kundli calculated successfully!");
      }
      setEditingId(null);
      setShowForm(false);
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      fetchKundlis();
    } catch (err) {
      console.error("❌ Error:", err);
      alert("Kundli calculation failed!");
    }
  };

  const handleEdit = (k) => {
    setEditingId(k._id);
    setForm({
      name: k.name,
      dateOfBirth: k.dateOfBirth,
      timeOfBirth: k.timeOfBirth,
      placeOfBirth: k.placeOfBirth,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this Kundli?")) return;
    try {
      await axios.delete(`${API_BASE}/kundlis/${id}`);
      fetchKundlis();
    } catch (err) {
      console.error(err);
    }
  };

  const normalize = (k) => {
    const d = k.kundliData || {};
    return {
      sunSign: d.sunSign || d.sun_sign || "-",
      moonSign: d.moonSign || d.moon_sign || "-",
      ascendant: d.ascendant?.name || d.ascendant || "-",
      description: d.description || "-",
      planets: d.planets || [],
      houses: d.houses || [],
    };
  };

  // 📄 Download PDF
  const downloadPDF = () => {
    const element = document.getElementById("kundli-report");
    if (!element) return;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`${selectedKundli.name}-Kundli.pdf`);
    });
  };

  return (
    <div className="kundli-container">
      <h2>🪔 Kundli Calculator</h2>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Kundli"}
      </button>

      {showForm && (
        <form className="kundli-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="timeOfBirth"
            value={form.timeOfBirth}
            onChange={handleChange}
            required
          />
          <input
            name="placeOfBirth"
            placeholder="Place of Birth"
            value={form.placeOfBirth}
            onChange={handleChange}
            required
          />
          <div className="btn-group">
            <button type="submit">
              {editingId ? "Update Kundli" : "Calculate & Save"}
            </button>
            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditingId(null)}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <h3>📜 All Saved Kundlis</h3>
      {kundlis.length === 0 ? (
        <p>No Kundli data found.</p>
      ) : (
        <table className="kundli-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Time</th>
              <th>Place</th>
              <th>Sun</th>
              <th>Moon</th>
              <th>Ascendant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kundlis.map((k) => {
              const d = normalize(k);
              return (
                <tr key={k._id}>
                  <td>{k.name}</td>
                  <td>{k.dateOfBirth}</td>
                  <td>{k.timeOfBirth}</td>
                  <td>{k.placeOfBirth}</td>
                  <td>{d.sunSign}</td>
                  <td>{d.moonSign}</td>
                  <td>{d.ascendant}</td>
                  <td>
                    <button onClick={() => setSelectedKundli(k)}>View</button>
                    <button onClick={() => handleEdit(k)}>Edit</button>
                    <button onClick={() => handleDelete(k._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* 🌌 Modal for Detailed Kundli */}
      {selectedKundli && (
        <div className="kundli-modal">
          <div className="modal-content" id="kundli-report">
            <button
              className="close-btn"
              onClick={() => setSelectedKundli(null)}
            >
              ✖
            </button>

            <h3>{selectedKundli.name}’s Kundli Report</h3>
            {(() => {
              const d = normalize(selectedKundli);
              return (
                <>
                  <div className="kundli-summary">
                    <p><b>Sun Sign:</b> {d.sunSign}</p>
                    <p><b>Moon Sign:</b> {d.moonSign}</p>
                    <p><b>Ascendant:</b> {d.ascendant}</p>
                  </div>
                  <hr />

                  <h4>🌞 Planetary Details</h4>
                  {d.planets.length === 0 ? (
                    <p>No planetary data.</p>
                  ) : (
                    <table className="kundli-detail-table">
                      <thead>
                        <tr>
                          <th>Planet</th>
                          <th>Zodiac Sign</th>
                          <th>House</th>
                          <th>Degree</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.planets.map((p, i) => (
                          <tr key={i}>
                            <td>{p.name}</td>
                            <td><span className="sign-badge">{p.sign}</span></td>
                            <td>{p.house}</td>
                            <td>{p.degree}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  <h4>🏠 House Details</h4>
                  {d.houses.length === 0 ? (
                    <p>No house data.</p>
                  ) : (
                    <table className="kundli-detail-table">
                      <thead>
                        <tr>
                          <th>House</th>
                          <th>Zodiac Sign</th>
                          <th>Start Degree</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.houses.map((h, i) => (
                          <tr key={i}>
                            <td>{h.house}</td>
                            <td><span className="sign-badge">{h.sign}</span></td>
                            <td>{h.startDegree}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </>
              );
            })()}
          </div>

          <div className="modal-footer">
            <button className="download-btn" onClick={downloadPDF}>
              📄 Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
