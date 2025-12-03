// import React from "react";
// import axios from "axios";

// export default function CalculatorTable({ calculators, fetchCalculators, setEditing, page, setPage, total, limit }) {
//   const token = localStorage.getItem("adminToken");

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     await axios.delete(`/api/calculators/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     fetchCalculators();
//   };

//   const toggleActive = async (calc) => {
//     await axios.put(`/api/calculators/${calc._id}`, { ...calc, active: !calc.active }, { headers: { Authorization: `Bearer ${token}` } });
//     fetchCalculators();
//   };

//   const cloneCalculator = async (id) => {
//     await axios.post(`/api/calculators/clone/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
//     fetchCalculators();
//   };

//   const exportCSV = () => {
//     const csv = [
//       ["Name", "Type", "Description", "Formula", "Active"],
//       ...calculators.map(c => [c.name, c.type, c.description, c.formula, c.active])
//     ].map(e => e.join(",")).join("\n");

//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute("download", "calculators.csv");
//     link.click();
//   };

//   const totalPages = Math.ceil(total / limit);

//   return (
//     <div className="table-section">
//       <button onClick={exportCSV} className="btn-export">Export CSV</button>
//       <table className="calc-table">
//         <thead>
//           <tr>
//             <th>Name</th><th>Type</th><th>Description</th><th>Formula</th><th>Active</th><th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {calculators.map(c => (
//             <tr key={c._id} className={c.active ? "" : "inactive"}>
//               <td>{c.name}</td>
//               <td>{c.type}</td>
//               <td>{c.description}</td>
//               <td>{c.formula}</td>
//               <td><input type="checkbox" checked={c.active} onChange={() => toggleActive(c)} /></td>
//               <td>
//                 <button onClick={() => setEditing(c)} className="btn-edit">Edit</button>
//                 <button onClick={() => handleDelete(c._id)} className="btn-delete">Delete</button>
//                 <button onClick={() => cloneCalculator(c._id)} className="btn-clone">Clone</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="pagination">
//         <button disabled={page<=1} onClick={()=>setPage(page-1)}>Prev</button>
//         <span>{page} / {totalPages}</span>
//         <button disabled={page>=totalPages} onClick={()=>setPage(page+1)}>Next</button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function FormulaTester({ calculators }) {
  const [selected, setSelected] = useState(null);
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  const handleTest = () => {
    if (!selected) return;
    try {
      const fn = new Function(...selected.inputs.map(i => i.name), `return ${selected.formula};`);
      const args = selected.inputs.map(i => i.type==="number"?Number(inputs[i.name]||0):inputs[i.name]||"");
      setResult(fn(...args));
    } catch { setResult("Error"); }
  };

  return (
    <div className="formula-tester">
      <h3>Formula Tester</h3>
      <select onChange={(e)=>{ const calc=calculators.find(c=>c._id===e.target.value); setSelected(calc); setInputs({}); setResult(null); }} defaultValue="">
        <option value="">Select Calculator</option>
        {calculators.map(c=><option key={c._id} value={c._id}>{c.name}</option>)}
      </select>

      {selected && selected.inputs.map((i,idx)=>(
        <input key={idx} type={i.type==="number"?"number":"text"} placeholder={i.name} value={inputs[i.name]||""} onChange={e=>setInputs({...inputs,[i.name]:e.target.value})} />
      ))}

      <button onClick={handleTest}>Run</button>
      {result!==null && <div className="tester-result">Result: {result}</div>}
    </div>
  );
}
