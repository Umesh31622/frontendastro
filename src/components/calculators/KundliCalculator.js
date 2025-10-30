

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

//   // 🧭 Fetch all saved kundlis
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

//   // 💫 Handle Kundli Calculation or Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         // 🟢 Update existing kundli
//         await axios.put(`${API_BASE}/kundlis/${editingId}`, form);
//         alert("✅ Kundli updated successfully!");
//         setEditingId(null);
//       } else {
//         // 🆕 Calculate & save new kundli
//         await axios.post(`${API_BASE}/kundlis/calculate`, form);
//         alert("✅ Kundli calculated & saved successfully!");
//       }
//       setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
//       fetchKundlis();
//     } catch (err) {
//       console.error("❌ Error calculating/updating Kundli:", err);
//       alert("Calculation failed. Please check your input.");
//     }
//   };

//   // ✏️ Load kundli data into form for editing
//   const handleEdit = (kundli) => {
//     setForm({
//       name: kundli.name,
//       dateOfBirth: kundli.dateOfBirth,
//       timeOfBirth: kundli.timeOfBirth,
//       placeOfBirth: kundli.placeOfBirth,
//     });
//     setEditingId(kundli._id);
//   };

//   // ❌ Delete Kundli
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE}/kundlis/${id}`);
//       fetchKundlis();
//     } catch (err) {
//       console.error("❌ Error deleting kundli:", err);
//     }
//   };

//   // 🔄 Cancel edit mode
//   const cancelEdit = () => {
//     setEditingId(null);
//     setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
//   };

//   return (
//     <div className="kundli-container">
//       <h2>🪔 Kundli Calculator</h2>

//       <form className="kundli-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={form.dateOfBirth}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="time"
//           name="timeOfBirth"
//           value={form.timeOfBirth}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="placeOfBirth"
//           placeholder="Place of Birth"
//           value={form.placeOfBirth}
//           onChange={handleChange}
//           required
//         />
//         <div className="btn-group">
//           <button type="submit">{editingId ? "Update Kundli" : "Calculate & Save"}</button>
//           {editingId && (
//             <button type="button" className="cancel-btn" onClick={cancelEdit}>
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       <h3>📜 All Saved Kundlis</h3>
//       <div className="kundli-list">
//         {kundlis.length === 0 ? (
//           <p>No Kundli data found.</p>
//         ) : (
//           kundlis.map((k) => (
//             <div key={k._id} className="kundli-card">
//               <h4>{k.name}</h4>
//               <p><strong>DOB:</strong> {k.dateOfBirth}</p>
//               <p><strong>Time:</strong> {k.timeOfBirth}</p>
//               <p><strong>Place:</strong> {k.placeOfBirth}</p>
//               {k.kundliData && (
//                 <>
//                   <p><strong>Sun Sign:</strong> {k.kundliData.sunSign}</p>
//                   <p><strong>Moon Sign:</strong> {k.kundliData.moonSign}</p>
//                   <p><strong>Ascendant:</strong> {k.kundliData.ascendant}</p>
//                   <p><strong>Description:</strong> {k.kundliData.description}</p>
//                 </>
//               )}
//               <div className="action-buttons">
//                 <button className="edit-btn" onClick={() => handleEdit(k)}>Edit</button>
//                 <button className="delete-btn" onClick={() => handleDelete(k._id)}>Delete</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default KundliCalculator;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/KundliCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

const KundliCalculator = () => {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [kundlis, setKundlis] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); // form initially hidden

  // Fetch all saved kundlis
  const fetchKundlis = async () => {
    try {
      const res = await axios.get(`${API_BASE}/kundlis`);
      setKundlis(res.data);
    } catch (err) {
      console.error("❌ Error fetching kundlis:", err);
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
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/kundlis/calculate`, form);
        alert("✅ Kundli calculated & saved successfully!");
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false); // hide form after submission
      fetchKundlis();
    } catch (err) {
      console.error("❌ Error calculating/updating Kundli:", err);
      alert("Calculation failed. Please check your input.");
    }
  };

  const handleEdit = (kundli) => {
    setForm({
      name: kundli.name,
      dateOfBirth: kundli.dateOfBirth,
      timeOfBirth: kundli.timeOfBirth,
      placeOfBirth: kundli.placeOfBirth,
    });
    setEditingId(kundli._id);
    setShowForm(true); // show form when editing
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Kundli?")) return;
    try {
      await axios.delete(`${API_BASE}/kundlis/${id}`);
      fetchKundlis();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  };

  return (
    <div className="kundli-container">
      <h2>🪔 Kundli Calculator</h2>

      {/* Add Kundli Button */}
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Kundli"}
      </button>

      {/* Form */}
      {showForm && (
        <form className="kundli-form" onSubmit={handleSubmit}>
          <input
            type="text"
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
            type="text"
            name="placeOfBirth"
            placeholder="Place of Birth"
            value={form.placeOfBirth}
            onChange={handleChange}
            required
          />
          <div className="btn-group">
            <button type="submit">{editingId ? "Update Kundli" : "Calculate & Save"}</button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Saved Kundlis */}
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
              <th>Sun Sign</th>
              <th>Moon Sign</th>
              <th>Ascendant</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {kundlis.map((k) => (
              <tr key={k._id}>
                <td data-label="Name">{k.name}</td>
                <td data-label="DOB">{k.dateOfBirth}</td>
                <td data-label="Time">{k.timeOfBirth}</td>
                <td data-label="Place">{k.placeOfBirth}</td>
                <td data-label="Sun Sign">{k.kundliData?.sunSign || "-"}</td>
                <td data-label="Moon Sign">{k.kundliData?.moonSign || "-"}</td>
                <td data-label="Ascendant">{k.kundliData?.ascendant || "-"}</td>
                <td data-label="Description">{k.kundliData?.description || "-"}</td>
                <td data-label="Actions">
                  <button className="edit-btn" onClick={() => handleEdit(k)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(k._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default KundliCalculator;
