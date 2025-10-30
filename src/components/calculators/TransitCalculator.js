

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/TransitCalculator.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

// const TransitCalculator = () => {
//   const [form, setForm] = useState({
//     name: "",
//     dateOfBirth: "",
//     timeOfBirth: "",
//     placeOfBirth: "",
//   });
//   const [calculations, setCalculations] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const fetchCalculations = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/transits`);
//       setCalculations(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCalculations();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.dateOfBirth || !form.timeOfBirth || !form.placeOfBirth) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       if (editingId) {
//         await axios.put(`${API_BASE}/transits/${editingId}`, form);
//         setEditingId(null);
//       } else {
//         await axios.post(`${API_BASE}/transits/calculate`, form);
//       }
//       setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
//       fetchCalculations();
//     } catch (err) {
//       console.error(err);
//       alert("Calculation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setForm({
//       name: item.name,
//       dateOfBirth: item.dateOfBirth,
//       timeOfBirth: item.timeOfBirth,
//       placeOfBirth: item.placeOfBirth,
//     });
//     setEditingId(item._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this calculation?")) return;
//     try {
//       await axios.delete(`${API_BASE}/transits/${id}`);
//       fetchCalculations();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete");
//     }
//   };

//   const cancelEdit = () => {
//     setEditingId(null);
//     setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
//   };

//   return (
//     <div className="transit-container">
//       <h2>🪐 Transit Calculator</h2>

//       <form className="transit-form" onSubmit={handleSubmit}>
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
//           <button type="submit" className="calculate-btn">
//             {loading ? "Processing..." : editingId ? "Update" : "Calculate & Save"}
//           </button>
//           {editingId && (
//             <button type="button" className="cancel-btn" onClick={cancelEdit}>
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       <h3>📜 Saved Transit Calculations</h3>
//       {calculations.length === 0 ? (
//         <p>No calculations yet</p>
//       ) : (
//         <table className="transit-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>DOB</th>
//               <th>Time</th>
//               <th>Place</th>
//               <th>Sun Transit</th>
//               <th>Moon Transit</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {calculations.map((item) => (
//               <tr key={item._id}>
//                 <td data-label="Name">{item.name}</td>
//                 <td data-label="DOB">{item.dateOfBirth}</td>
//                 <td data-label="Time">{item.timeOfBirth}</td>
//                 <td data-label="Place">{item.placeOfBirth}</td>
//                 <td data-label="Sun Transit">{item.transitData?.sunTransit}</td>
//                 <td data-label="Moon Transit">{item.transitData?.moonTransit}</td>
//                 <td data-label="Description">{item.transitData?.description}</td>
//                 <td data-label="Actions">
//                   <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
//                   <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default TransitCalculator;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/TransitCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

const TransitCalculator = () => {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [transits, setTransits] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); // form initially hidden

  // Fetch all saved transit results
  const fetchTransits = async () => {
    try {
      const res = await axios.get(`${API_BASE}/transits`);
      setTransits(res.data);
    } catch (err) {
      console.error("❌ Error fetching transits:", err);
    }
  };

  useEffect(() => {
    fetchTransits();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/transits/${editingId}`, form);
        alert("✅ Transit updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/transits/calculate`, form);
        alert("✅ Transit calculated & saved successfully!");
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false); // hide form after submission
      fetchTransits();
    } catch (err) {
      console.error("❌ Error calculating/updating transit:", err);
      alert("Calculation failed. Please check your input.");
    }
  };

  const handleEdit = (transit) => {
    setForm({
      name: transit.name,
      dateOfBirth: transit.dateOfBirth,
      timeOfBirth: transit.timeOfBirth,
      placeOfBirth: transit.placeOfBirth,
    });
    setEditingId(transit._id);
    setShowForm(true); // show form when editing
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Transit?")) return;
    try {
      await axios.delete(`${API_BASE}/transits/${id}`);
      fetchTransits();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  };

  return (
    <div className="transit-container">
      <h2>🪐 Transit Calculator</h2>

      {/* Add Transit Button */}
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Transit"}
      </button>

      {/* Form */}
      {showForm && (
        <form className="transit-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="calculate-btn">
              {editingId ? "Update Transit" : "Calculate & Save"}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Saved Transits */}
      <h3>📜 All Saved Transits</h3>
      {transits.length === 0 ? (
        <p>No Transit data found.</p>
      ) : (
        <table className="transit-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Time</th>
              <th>Place</th>
              <th>Transit Data</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transits.map((t) => (
              <tr key={t._id}>
                <td data-label="Name">{t.name}</td>
                <td data-label="DOB">{t.dateOfBirth}</td>
                <td data-label="Time">{t.timeOfBirth}</td>
                <td data-label="Place">{t.placeOfBirth}</td>
                <td data-label="Transit Data">
                  {t.transitData ? JSON.stringify(t.transitData) : "-"}
                </td>
                <td data-label="Actions">
                  <button className="edit-btn" onClick={() => handleEdit(t)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(t._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransitCalculator;
