// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/DailyPrediction.css"; // Make sure path is correct

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

// export default function DailyPrediction() {
//   const [form, setForm] = useState({ date: "", title: "", description: "", effect: "" });
//   const [predictions, setPredictions] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     fetchPredictions();
//   }, []);

//   const fetchPredictions = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/daily-predictions`);
//       setPredictions(res.data);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to fetch predictions");
//     }
//   };

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(`${API_BASE}/daily-predictions/${editingId}`, form);
//         setEditingId(null);
//       } else {
//         const res = await axios.post(`${API_BASE}/daily-predictions`, form);
//         setPredictions([res.data, ...predictions]);
//       }
//       setForm({ date: "", title: "", description: "", effect: "" });
//       setShowForm(false);
//       fetchPredictions();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save prediction");
//     }
//   };

//   const handleEdit = (p) => {
//     setForm({ date: p.date, title: p.title, description: p.description, effect: p.effect });
//     setEditingId(p._id);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this prediction?")) return;
//     try {
//       await axios.delete(`${API_BASE}/daily-predictions/${id}`);
//       setPredictions(predictions.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete prediction");
//     }
//   };

//   return (
//     <div className="calculator-container">
//       <h2>🌟 Daily Predictions</h2>

//       <button className="add-btn" onClick={() => setShowForm(!showForm)}>
//         {showForm ? "Hide Form" : editingId ? "Edit Prediction" : "Add Prediction"}
//       </button>

//       {showForm && (
//         <form className="calculator-form" onSubmit={handleSubmit}>
//           <input type="date" name="date" value={form.date} onChange={handleChange} required />
//           <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
//           <input type="text" name="effect" placeholder="Effect (optional)" value={form.effect} onChange={handleChange} />
//           <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
//           <div className="btn-group">
//             <button type="submit">{editingId ? "Update Prediction" : "Add Prediction"}</button>
//             {editingId && (
//               <button type="button" className="cancel-btn" onClick={() => { setEditingId(null); setForm({ date: "", title: "", description: "", effect: "" }); setShowForm(false); }}>
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       )}

//       {predictions.length === 0 ? (
//         <p>No predictions found.</p>
//       ) : (
//         <table className="calculator-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Title</th>
//               <th>Effect</th>
//               <th>Description</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {predictions.map((p) => (
//               <tr key={p._id}>
//                 <td data-label="Date">{p.date}</td>
//                 <td data-label="Title">{p.title}</td>
//                 <td data-label="Effect">{p.effect || "-"}</td>
//                 <td data-label="Description">{p.description}</td>
//                 <td data-label="Actions">
//                   <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
//                   <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/DailyPrediction.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function DailyPrediction() {
  const [form, setForm] = useState({ date: "", title: "", description: "", effect: "" });
  const [predictions, setPredictions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [sign, setSign] = useState(""); // 🌟 new: zodiac sign for Prokerala fetch
  const [loading, setLoading] = useState(false);

  const zodiacSigns = [
    "aries", "taurus", "gemini", "cancer", "leo", "virgo",
    "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
  ];

  // ✅ Fetch All Predictions
  const fetchPredictions = async () => {
    try {
      const res = await axios.get(`${API_BASE}/daily-predictions`);
      const data = res.data?.data || res.data;
      setPredictions(data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch predictions");
    }
  };

  useEffect(() => {
    fetchPredictions();
  }, []);

  // ✅ Handle Manual CRUD Form Input
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Add or Update Manual Prediction
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/daily-predictions/${editingId}`, form);
        setEditingId(null);
      } else {
        const res = await axios.post(`${API_BASE}/daily-predictions`, form);
        setPredictions([res.data, ...predictions]);
      }
      setForm({ date: "", title: "", description: "", effect: "" });
      setShowForm(false);
      fetchPredictions();
    } catch (err) {
      console.error(err);
      alert("Failed to save prediction");
    }
  };

  // ✅ Edit Existing Entry
  const handleEdit = (p) => {
    setForm({ date: p.date, title: p.title, description: p.description, effect: p.effect });
    setEditingId(p._id);
    setShowForm(true);
  };

  // ✅ Delete Entry
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this prediction?")) return;
    try {
      await axios.delete(`${API_BASE}/daily-predictions/${id}`);
      setPredictions(predictions.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete prediction");
    }
  };

  // 🌟 Fetch from Prokerala API
  const handleFetchFromProkerala = async () => {
    if (!sign) return alert("Please select a zodiac sign first!");
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/daily-predictions/fetch`, { sign });
      const newData = res.data?.data;
      alert(`✅ Horoscope for ${sign.toUpperCase()} fetched successfully!`);
      setPredictions([newData, ...predictions]);
    } catch (err) {
      console.error("❌ Fetch error:", err.response?.data || err.message);
      alert("Failed to fetch from Prokerala API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <h2>🌞 Daily Horoscope (Prokerala API)</h2>

      {/* 🔮 Fetch from Prokerala Section */}
      <div className="fetch-section">
        <select value={sign} onChange={(e) => setSign(e.target.value)}>
          <option value="">-- Select Zodiac Sign --</option>
          {zodiacSigns.map((s) => (
            <option key={s} value={s}>{s.toUpperCase()}</option>
          ))}
        </select>
        <button onClick={handleFetchFromProkerala} disabled={loading}>
          {loading ? "Fetching..." : "Fetch from Prokerala"}
        </button>
      </div>

      {/* ➕ Manual Form */}
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : editingId ? "Edit Prediction" : "Add Prediction"}
      </button>

      {showForm && (
        <form className="calculator-form" onSubmit={handleSubmit}>
          <input type="date" name="date" value={form.date} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input type="text" name="effect" placeholder="Effect (optional)" value={form.effect} onChange={handleChange} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
          <div className="btn-group">
            <button type="submit">{editingId ? "Update Prediction" : "Add Prediction"}</button>
            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingId(null);
                  setForm({ date: "", title: "", description: "", effect: "" });
                  setShowForm(false);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* 📜 Data Table */}
      {predictions.length === 0 ? (
        <p>No predictions found.</p>
      ) : (
        <table className="calculator-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Effect</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((p) => (
              <tr key={p._id}>
                <td data-label="Date">{p.date}</td>
                <td data-label="Title">{p.title}</td>
                <td data-label="Effect">{p.effect || "-"}</td>
                <td data-label="Description">{p.description}</td>
                <td data-label="Actions">
                  <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

