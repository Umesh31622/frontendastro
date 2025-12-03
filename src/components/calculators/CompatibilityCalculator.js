
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/calculator.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api/compatibility";

// export default function CompatibilityCalculator() {
//   const [formVisible, setFormVisible] = useState(false);
//   const [form, setForm] = useState({
//     boyName: "", boyDob: "", boyTob: "", boyPlace: "",
//     girlName: "", girlDob: "", girlTob: "", girlPlace: "",
//   });
//   const [records, setRecords] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [result, setResult] = useState(null);

//   // Fetch saved records
//   const fetchData = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setRecords(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let res;
//       if(editId){
//         res = await axios.put(`${API_BASE}/${editId}`, form);
//         setEditId(null);
//       } else {
//         res = await axios.post(`${API_BASE}/calculate`, form);
//       }
//       setResult(res.data);
//       setForm({
//         boyName: "", boyDob: "", boyTob: "", boyPlace: "",
//         girlName: "", girlDob: "", girlTob: "", girlPlace: "",
//       });
//       setFormVisible(false);
//       fetchData();
//     } catch(err){
//       console.error(err);
//       setResult({ error: err.message });
//     }
//   };

//   const handleEdit = (r) => {
//     setForm({
//       boyName: r.boyName, boyDob: r.boyDob, boyTob: r.boyTob, boyPlace: r.boyPlace,
//       girlName: r.girlName, girlDob: r.girlDob, girlTob: r.girlTob, girlPlace: r.girlPlace,
//     });
//     setEditId(r._id);
//     setFormVisible(true);
//     setResult(null);
//   };

//   const handleDelete = async (id) => {
//     if(!window.confirm("Delete this record?")) return;
//     try { await axios.delete(`${API_BASE}/${id}`); fetchData(); } 
//     catch(err){ console.error(err); }
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setForm({
//       boyName: "", boyDob: "", boyTob: "", boyPlace: "",
//       girlName: "", girlDob: "", girlTob: "", girlPlace: "",
//     });
//     setResult(null);
//     setFormVisible(false);
//   };

//   return (
//     <div className="calculator-container">
//       <h2>💞 Compatibility Calculator</h2>
      
//       <button className="toggle-btn" onClick={()=>setFormVisible(!formVisible)}>
//         {formVisible ? "Close Form" : editId ? "Edit Compatibility" : "Add Compatibility"}
//       </button>

//       {formVisible && (
//         <form className="calculator-form" onSubmit={handleSubmit}>
//           <h4>Boy’s Details</h4>
//           <input name="boyName" placeholder="Name" value={form.boyName} onChange={handleChange} required />
//           <input type="date" name="boyDob" value={form.boyDob} onChange={handleChange} required />
//           <input type="time" name="boyTob" value={form.boyTob} onChange={handleChange} required />
//           <input name="boyPlace" placeholder="Place" value={form.boyPlace} onChange={handleChange} required />

//           <h4>Girl’s Details</h4>
//           <input name="girlName" placeholder="Name" value={form.girlName} onChange={handleChange} required />
//           <input type="date" name="girlDob" value={form.girlDob} onChange={handleChange} required />
//           <input type="time" name="girlTob" value={form.girlTob} onChange={handleChange} required />
//           <input name="girlPlace" placeholder="Place" value={form.girlPlace} onChange={handleChange} required />

//           <div className="btn-group">
//             <button type="submit">{editId ? "Update" : "Calculate"}</button>
//             {editId && <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>}
//           </div>
//         </form>
//       )}

//       {result && (
//         <div className="result-box">
//           <h4>Compatibility Result</h4>
//           {result.error ? <p style={{color:"red"}}>{result.error}</p> : (
//             <p><strong>Score:</strong> {result.score} / 100 <br /><strong>Message:</strong> {result.message}</p>
//           )}
//         </div>
//       )}

//       <h3>📜 Saved Records</h3>
//       <table className="calculator-table">
//         <thead>
//           <tr>
//             <th>Boy Name</th><th>DOB</th><th>Time</th><th>Place</th>
//             <th>Girl Name</th><th>DOB</th><th>Time</th><th>Place</th>
//             <th>Score</th><th>Message</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length===0 && <tr><td colSpan="11">No records found</td></tr>}
//           {records.map(r => (
//             <tr key={r._id}>
//               <td data-label="Boy Name">{r.boyName}</td>
//               <td data-label="DOB">{r.boyDob}</td>
//               <td data-label="Time">{r.boyTob}</td>
//               <td data-label="Place">{r.boyPlace}</td>
//               <td data-label="Girl Name">{r.girlName}</td>
//               <td data-label="DOB">{r.girlDob}</td>
//               <td data-label="Time">{r.girlTob}</td>
//               <td data-label="Place">{r.girlPlace}</td>
//               <td data-label="Score">{r.score}</td>
//               <td data-label="Message">{r.message}</td>
//               <td data-label="Actions">
//                 <button className="edit-btn" onClick={()=>handleEdit(r)}>Edit</button>
//                 <button className="delete-btn" onClick={()=>handleDelete(r._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Confetti from "react-confetti";
// import { motion } from "framer-motion";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import "../../styles/calculator.css";

// const API_BASE =
//   process.env.REACT_APP_API_URL ||
//   "https://adminastrotalk-1.onrender.com/api/compatibility";

// export default function CompatibilityCalculator() {
//   const [formVisible, setFormVisible] = useState(false);
//   const [form, setForm] = useState({
//     boyName: "",
//     boyDob: "",
//     boyTob: "",
//     boyPlace: "",
//     girlName: "",
//     girlDob: "",
//     girlTob: "",
//     girlPlace: "",
//   });
//   const [records, setRecords] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [celebrate, setCelebrate] = useState(false);

//   // Fetch saved records
//   const fetchData = async () => {
//     try {
//       const res = await axios.get(API_BASE);
//       setRecords(res.data);
//     } catch (err) {
//       console.error("❌ Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);
//     try {
//       let res;
//       if (editId) {
//         res = await axios.put(`${API_BASE}/${editId}`, form);
//         setEditId(null);
//       } else {
//         res = await axios.post(`${API_BASE}/calculate`, form, {
//           headers: { "Content-Type": "application/json" },
//         });
//       }

//       setLoading(false);

//       if (res.data.success) {
//         setResult({
//           score: res.data.score || 0,
//           message: res.data.message || "Compatibility calculated!",
//         });

//         // Trigger celebration for high scores
//         if ((res.data.score || 0) >= 60) {
//           setCelebrate(true);
//           setTimeout(() => setCelebrate(false), 4000);
//         }
//       } else {
//         setResult({ error: res.data.error || "Calculation failed" });
//       }

//       setForm({
//         boyName: "",
//         boyDob: "",
//         boyTob: "",
//         boyPlace: "",
//         girlName: "",
//         girlDob: "",
//         girlTob: "",
//         girlPlace: "",
//       });
//       setFormVisible(false);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       setResult({ error: err.message });
//     }
//   };

//   const handleEdit = (r) => {
//     setForm({
//       boyName: r.boyName,
//       boyDob: r.boyDob,
//       boyTob: r.boyTob,
//       boyPlace: r.boyPlace,
//       girlName: r.girlName,
//       girlDob: r.girlDob,
//       girlTob: r.girlTob,
//       girlPlace: r.girlPlace,
//     });
//     setEditId(r._id);
//     setFormVisible(true);
//     setResult(null);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this record?")) return;
//     try {
//       await axios.delete(`${API_BASE}/${id}`);
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const cancelEdit = () => {
//     setEditId(null);
//     setForm({
//       boyName: "",
//       boyDob: "",
//       boyTob: "",
//       boyPlace: "",
//       girlName: "",
//       girlDob: "",
//       girlTob: "",
//       girlPlace: "",
//     });
//     setResult(null);
//     setFormVisible(false);
//   };

//   return (
//     <div className="calculator-container">
//       {celebrate && <Confetti recycle={false} numberOfPieces={200} />}
//       <h2 className="title">💞 Compatibility Calculator</h2>

//       <button
//         className="toggle-btn"
//         onClick={() => setFormVisible(!formVisible)}
//       >
//         {formVisible
//           ? "Close Form"
//           : editId
//           ? "Edit Compatibility"
//           : "Add Compatibility"}
//       </button>

//       {formVisible && (
//         <motion.form
//           className="calculator-form"
//           onSubmit={handleSubmit}
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//         >
//           <h4>Boy’s Details</h4>
//           <input
//             name="boyName"
//             placeholder="Name"
//             value={form.boyName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="date"
//             name="boyDob"
//             value={form.boyDob}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="time"
//             name="boyTob"
//             value={form.boyTob}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="boyPlace"
//             placeholder="Place"
//             value={form.boyPlace}
//             onChange={handleChange}
//             required
//           />

//           <h4>Girl’s Details</h4>
//           <input
//             name="girlName"
//             placeholder="Name"
//             value={form.girlName}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="date"
//             name="girlDob"
//             value={form.girlDob}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="time"
//             name="girlTob"
//             value={form.girlTob}
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="girlPlace"
//             placeholder="Place"
//             value={form.girlPlace}
//             onChange={handleChange}
//             required
//           />

//           <div className="btn-group">
//             <button type="submit" disabled={loading}>
//               {loading
//                 ? "Calculating..."
//                 : editId
//                 ? "Update"
//                 : "Calculate"}
//             </button>
//             {editId && (
//               <button
//                 type="button"
//                 className="cancel-btn"
//                 onClick={cancelEdit}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </motion.form>
//       )}

//       {result && (
//         <motion.div
//           className="result-box"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h4>Compatibility Result</h4>
//           {result.error ? (
//             <p style={{ color: "red" }}>{result.error}</p>
//           ) : (
//             <div className="result-display">
//               <div style={{ width: 100, margin: "auto" }}>
//                 <CircularProgressbar
//                   value={result.score}
//                   text={`${result.score}%`}
//                   styles={buildStyles({
//                     textColor: "#333",
//                     pathColor:
//                       result.score >= 75
//                         ? "#4caf50"
//                         : result.score >= 50
//                         ? "#ffc107"
//                         : "#f44336",
//                     trailColor: "#eee",
//                   })}
//                 />
//               </div>
//               <p className="result-text">{result.message}</p>
//             </div>
//           )}
//         </motion.div>
//       )}

//       <h3>📜 Saved Records</h3>
//       <table className="calculator-table">
//         <thead>
//           <tr>
//             <th>Boy Name</th>
//             <th>DOB</th>
//             <th>Time</th>
//             <th>Place</th>
//             <th>Girl Name</th>
//             <th>DOB</th>
//             <th>Time</th>
//             <th>Place</th>
//             <th>Score</th>
//             <th>Message</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {records.length === 0 && (
//             <tr>
//               <td colSpan="11">No records found</td>
//             </tr>
//           )}
//           {records.map((r) => (
//             <tr key={r._id}>
//               <td>{r.boyName}</td>
//               <td>{r.boyDob}</td>
//               <td>{r.boyTob}</td>
//               <td>{r.boyPlace}</td>
//               <td>{r.girlName}</td>
//               <td>{r.girlDob}</td>
//               <td>{r.girlTob}</td>
//               <td>{r.girlPlace}</td>
//               <td>{r.score}</td>
//               <td>{r.message}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => handleEdit(r)}>
//                   Edit
//                 </button>
//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(r._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../styles/calculator.css";


const API_BASE =
  process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/compatibility`
    : "https://adminastrotalk-1.onrender.com/api/compatibility";

export default function CompatibilityCalculator() {
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    boyName: "",
    boyDob: "",
    boyTob: "",
    boyPlace: "",
    girlName: "",
    girlDob: "",
    girlTob: "",
    girlPlace: "",
  });
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  // 📜 Fetch saved records
  const fetchData = async () => {
    try {
      const res = await axios.get(API_BASE, { timeout: 60000 });
      setRecords(res.data);
    } catch (err) {
      console.error("❌ Fetch error:", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🧮 Calculate Compatibility
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      let res;
      if (editId) {
        res = await axios.put(`${API_BASE}/${editId}`, form, { timeout: 60000 });
        setEditId(null);
      } else {
        res = await axios.post(`${API_BASE}/calculate`, form, {
          headers: { "Content-Type": "application/json" },
          timeout: 100000,
        });
      }

      setLoading(false);

      if (res.data.success) {
        const score = res.data.score || res.data.record?.score || 0;
        const maxScore = res.data.maxScore || 36;
        const percentage = Math.round((score / maxScore) * 100);

        setResult({
          score: percentage,
          rawScore: score,
          maxScore,
          message:
            res.data.message ||
            res.data.record?.message ||
            "Compatibility calculated successfully ✅",
        });

        if (percentage >= 70) {
          setCelebrate(true);
          setTimeout(() => setCelebrate(false), 4000);
        }
      } else {
        setResult({
          error: res.data.error || "Compatibility calculation failed ❌",
        });
      }

      // Reset form
      setForm({
        boyName: "",
        boyDob: "",
        boyTob: "",
        boyPlace: "",
        girlName: "",
        girlDob: "",
        girlTob: "",
        girlPlace: "",
      });
      setFormVisible(false);
      fetchData();
    } catch (err) {
      console.error("🚨 Error:", err.message);
      setLoading(false);
      setResult({
        error:
          err.message === "timeout of 100000ms exceeded"
            ? "⏳ The calculation took too long. Please try again (server slow)."
            : err.message,
      });
    }
  };

  const handleEdit = (r) => {
    setForm({
      boyName: r.boyName,
      boyDob: r.boyDob,
      boyTob: r.boyTob,
      boyPlace: r.boyPlace,
      girlName: r.girlName,
      girlDob: r.girlDob,
      girlTob: r.girlTob,
      girlPlace: r.girlPlace,
    });
    setEditId(r._id);
    setFormVisible(true);
    setResult(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`, { timeout: 30000 });
      fetchData();
    } catch (err) {
      console.error("❌ Delete error:", err.message);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      boyName: "",
      boyDob: "",
      boyTob: "",
      boyPlace: "",
      girlName: "",
      girlDob: "",
      girlTob: "",
      girlPlace: "",
    });
    setResult(null);
    setFormVisible(false);
  };

  return (
    <div className="calculator-container">
      {celebrate && <Confetti recycle={false} numberOfPieces={200} />}
      <h2 className="title">💞 Compatibility Calculator</h2>

      <button
        className="toggle-btn"
        onClick={() => setFormVisible(!formVisible)}
      >
        {formVisible
          ? "Close Form"
          : editId
          ? "Edit Compatibility"
          : "Add Compatibility"}
      </button>

      {formVisible && (
        <motion.form
          className="calculator-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4>Boy’s Details</h4>
          <input
            name="boyName"
            placeholder="Name"
            value={form.boyName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="boyDob"
            value={form.boyDob}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="boyTob"
            value={form.boyTob}
            onChange={handleChange}
            required
          />
          <input
            name="boyPlace"
            placeholder="Place"
            value={form.boyPlace}
            onChange={handleChange}
            required
          />

          <h4>Girl’s Details</h4>
          <input
            name="girlName"
            placeholder="Name"
            value={form.girlName}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="girlDob"
            value={form.girlDob}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="girlTob"
            value={form.girlTob}
            onChange={handleChange}
            required
          />
          <input
            name="girlPlace"
            placeholder="Place"
            value={form.girlPlace}
            onChange={handleChange}
            required
          />

          <div className="btn-group">
            <button type="submit" disabled={loading}>
              {loading
                ? "🔮 Calculating compatibility..."
                : editId
                ? "Update"
                : "Calculate"}
            </button>
            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </motion.form>
      )}

      {/* 🌟 RESULT DISPLAY */}
      {result && (
        <motion.div
          className="result-box"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h4>Compatibility Result</h4>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <div className="result-display">
              <div style={{ width: 120, margin: "auto" }}>
                <CircularProgressbar
                  value={result.score}
                  text={`${result.rawScore}/${result.maxScore}`}
                  styles={buildStyles({
                    textColor: "#333",
                    pathColor:
                      result.score >= 70
                        ? "#4caf50"
                        : result.score >= 50
                        ? "#ffc107"
                        : "#f44336",
                    trailColor: "#eee",
                  })}
                />
              </div>
              <p className="result-text">
                💞 Compatibility Score:{" "}
                <strong>
                  {result.rawScore}/{result.maxScore}
                </strong>
                <br />
                {result.message}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* 🧾 SAVED RECORDS */}
      <h3>📜 Saved Records</h3>
      <table className="calculator-table">
        <thead>
          <tr>
            <th>Boy Name</th>
            <th>DOB</th>
            <th>Time</th>
            <th>Place</th>
            <th>Girl Name</th>
            <th>DOB</th>
            <th>Time</th>
            <th>Place</th>
            <th>Score</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td colSpan="11">No records found</td>
            </tr>
          )}
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.boyName}</td>
              <td>{r.boyDob}</td>
              <td>{r.boyTob}</td>
              <td>{r.boyPlace}</td>
              <td>{r.girlName}</td>
              <td>{r.girlDob}</td>
              <td>{r.girlTob}</td>
              <td>{r.girlPlace}</td>
              <td>{r.score}</td>
              <td>{r.message}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(r)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
