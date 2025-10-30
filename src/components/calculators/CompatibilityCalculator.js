
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../styles/calculator.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api/calculators/compatibility";

// export default function CompatibilityCalculator() {
//   const [form, setForm] = useState({
//     boyName:"", boyDob:"", boyTob:"", boyPlace:"",
//     girlName:"", girlDob:"", girlTob:"", girlPlace:""
//   });
//   const [list, setList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const fetchData = async () => {
//     const res = await axios.get(API_BASE);
//     setList(res.data);
//   };

//   useEffect(()=>{ fetchData(); },[]);

//   const handleChange = e => setForm({...form, [e.target.name]: e.target.value });

//   const handleSubmit = async e => {
//     e.preventDefault();
//     if(editId){
//       await axios.put(`${API_BASE}/${editId}`, form);
//     } else {
//       await axios.post(`${API_BASE}/calculate`, form);
//     }
//     setForm({boyName:"", boyDob:"", boyTob:"", boyPlace:"", girlName:"", girlDob:"", girlTob:"", girlPlace:""});
//     setEditId(null);
//     setShowForm(false);
//     fetchData();
//   };

//   const handleEdit = item => { setForm(item); setEditId(item._id); setShowForm(true); };
//   const handleDelete = async id => { await axios.delete(`${API_BASE}/${id}`); fetchData(); };

//   return (
//     <div className="calculator-container">
//       <h2>💞 Compatibility Calculator</h2>
//       <button className="add-btn" onClick={()=>setShowForm(!showForm)}>
//         {showForm ? "Hide Form" : "Add Compatibility"}
//       </button>

//       {showForm && (
//         <form className="calculator-form" onSubmit={handleSubmit}>
//           <h4>Boy’s Details</h4>
//           <input type="text" name="boyName" placeholder="Boy's Name" value={form.boyName} onChange={handleChange} required />
//           <input type="date" name="boyDob" value={form.boyDob} onChange={handleChange} required />
//           <input type="time" name="boyTob" value={form.boyTob} onChange={handleChange} required />
//           <input type="text" name="boyPlace" placeholder="Boy's Place" value={form.boyPlace} onChange={handleChange} required />

//           <h4>Girl’s Details</h4>
//           <input type="text" name="girlName" placeholder="Girl's Name" value={form.girlName} onChange={handleChange} required />
//           <input type="date" name="girlDob" value={form.girlDob} onChange={handleChange} required />
//           <input type="time" name="girlTob" value={form.girlTob} onChange={handleChange} required />
//           <input type="text" name="girlPlace" placeholder="Girl's Place" value={form.girlPlace} onChange={handleChange} required />

//           <div className="btn-group">
//             <button type="submit">{editId ? "Update & Save" : "Calculate & Save"}</button>
//             {editId && <button type="button" className="cancel-btn" onClick={()=>{ setEditId(null); setForm({boyName:"", boyDob:"", boyTob:"", boyPlace:"", girlName:"", girlDob:"", girlTob:"", girlPlace:""}); setShowForm(false); }}>Cancel</button>}
//           </div>
//         </form>
//       )}

//       {list.length === 0 ? <p>No records found.</p> : (
//         <table className="calculator-table">
//           <thead>
//             <tr>
//               <th>Boy Name</th><th>DOB</th><th>TOB</th><th>Place</th>
//               <th>Girl Name</th><th>DOB</th><th>TOB</th><th>Place</th>
//               <th>Score</th><th>Message</th><th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map(item=>(
//               <tr key={item._id}>
//                 <td data-label="Boy Name">{item.boyName}</td>
//                 <td data-label="Boy DOB">{item.boyDob}</td>
//                 <td data-label="Boy TOB">{item.boyTob}</td>
//                 <td data-label="Boy Place">{item.boyPlace}</td>
//                 <td data-label="Girl Name">{item.girlName}</td>
//                 <td data-label="Girl DOB">{item.girlDob}</td>
//                 <td data-label="Girl TOB">{item.girlTob}</td>
//                 <td data-label="Girl Place">{item.girlPlace}</td>
//                 <td data-label="Score">{item.score}</td>
//                 <td data-label="Message">{item.message}</td>
//                 <td data-label="Actions">
//                   <button className="edit-btn" onClick={()=>handleEdit(item)}>Edit</button>
//                   <button className="delete-btn" onClick={()=>handleDelete(item._id)}>Delete</button>
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
import "../../styles/calculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api/compatibility";

export default function CompatibilityCalculator() {
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    boyName: "", boyDob: "", boyTob: "", boyPlace: "",
    girlName: "", girlDob: "", girlTob: "", girlPlace: "",
  });
  const [records, setRecords] = useState([]);
  const [editId, setEditId] = useState(null);
  const [result, setResult] = useState(null);

  // Fetch saved records
  const fetchData = async () => {
    try {
      const res = await axios.get(API_BASE);
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if(editId){
        res = await axios.put(`${API_BASE}/${editId}`, form);
        setEditId(null);
      } else {
        res = await axios.post(`${API_BASE}/calculate`, form);
      }
      setResult(res.data);
      setForm({
        boyName: "", boyDob: "", boyTob: "", boyPlace: "",
        girlName: "", girlDob: "", girlTob: "", girlPlace: "",
      });
      setFormVisible(false);
      fetchData();
    } catch(err){
      console.error(err);
      setResult({ error: err.message });
    }
  };

  const handleEdit = (r) => {
    setForm({
      boyName: r.boyName, boyDob: r.boyDob, boyTob: r.boyTob, boyPlace: r.boyPlace,
      girlName: r.girlName, girlDob: r.girlDob, girlTob: r.girlTob, girlPlace: r.girlPlace,
    });
    setEditId(r._id);
    setFormVisible(true);
    setResult(null);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this record?")) return;
    try { await axios.delete(`${API_BASE}/${id}`); fetchData(); } 
    catch(err){ console.error(err); }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      boyName: "", boyDob: "", boyTob: "", boyPlace: "",
      girlName: "", girlDob: "", girlTob: "", girlPlace: "",
    });
    setResult(null);
    setFormVisible(false);
  };

  return (
    <div className="calculator-container">
      <h2>💞 Compatibility Calculator</h2>
      
      <button className="toggle-btn" onClick={()=>setFormVisible(!formVisible)}>
        {formVisible ? "Close Form" : editId ? "Edit Compatibility" : "Add Compatibility"}
      </button>

      {formVisible && (
        <form className="calculator-form" onSubmit={handleSubmit}>
          <h4>Boy’s Details</h4>
          <input name="boyName" placeholder="Name" value={form.boyName} onChange={handleChange} required />
          <input type="date" name="boyDob" value={form.boyDob} onChange={handleChange} required />
          <input type="time" name="boyTob" value={form.boyTob} onChange={handleChange} required />
          <input name="boyPlace" placeholder="Place" value={form.boyPlace} onChange={handleChange} required />

          <h4>Girl’s Details</h4>
          <input name="girlName" placeholder="Name" value={form.girlName} onChange={handleChange} required />
          <input type="date" name="girlDob" value={form.girlDob} onChange={handleChange} required />
          <input type="time" name="girlTob" value={form.girlTob} onChange={handleChange} required />
          <input name="girlPlace" placeholder="Place" value={form.girlPlace} onChange={handleChange} required />

          <div className="btn-group">
            <button type="submit">{editId ? "Update" : "Calculate"}</button>
            {editId && <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      )}

      {result && (
        <div className="result-box">
          <h4>Compatibility Result</h4>
          {result.error ? <p style={{color:"red"}}>{result.error}</p> : (
            <p><strong>Score:</strong> {result.score} / 100 <br /><strong>Message:</strong> {result.message}</p>
          )}
        </div>
      )}

      <h3>📜 Saved Records</h3>
      <table className="calculator-table">
        <thead>
          <tr>
            <th>Boy Name</th><th>DOB</th><th>Time</th><th>Place</th>
            <th>Girl Name</th><th>DOB</th><th>Time</th><th>Place</th>
            <th>Score</th><th>Message</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.length===0 && <tr><td colSpan="11">No records found</td></tr>}
          {records.map(r => (
            <tr key={r._id}>
              <td data-label="Boy Name">{r.boyName}</td>
              <td data-label="DOB">{r.boyDob}</td>
              <td data-label="Time">{r.boyTob}</td>
              <td data-label="Place">{r.boyPlace}</td>
              <td data-label="Girl Name">{r.girlName}</td>
              <td data-label="DOB">{r.girlDob}</td>
              <td data-label="Time">{r.girlTob}</td>
              <td data-label="Place">{r.girlPlace}</td>
              <td data-label="Score">{r.score}</td>
              <td data-label="Message">{r.message}</td>
              <td data-label="Actions">
                <button className="edit-btn" onClick={()=>handleEdit(r)}>Edit</button>
                <button className="delete-btn" onClick={()=>handleDelete(r._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
