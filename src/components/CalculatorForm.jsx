// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export default function CalculatorForm({ fetchCalculators, editing, setEditing }) {
//   const [form, setForm] = useState({
//     name: "",
//     type: "",
//     description: "",
//     inputs: [],
//     formula: "",
//     active: true,
//   });
//   const [preview, setPreview] = useState(null);
//   const token = localStorage.getItem("adminToken");

//   useEffect(() => {
//     if (editing) setForm(editing);
//     else setForm({ name: "", type: "", description: "", inputs: [], formula: "", active: true });
//     setPreview(null);
//   }, [editing]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editing) {
//         await axios.put(`/api/calculators/${editing._id}`, form, { headers: { Authorization: `Bearer ${token}` } });
//         setEditing(null);
//       } else {
//         await axios.post("/api/calculators", form, { headers: { Authorization: `Bearer ${token}` } });
//       }
//       setForm({ name: "", type: "", description: "", inputs: [], formula: "", active: true });
//       fetchCalculators();
//     } catch (err) { console.error(err); }
//   };

//   const addInputField = () => setForm({ ...form, inputs: [...form.inputs, { name: "", type: "text" }] });

//   const updateInputField = (index, key, value) => {
//     const newInputs = [...form.inputs];
//     newInputs[index][key] = value;
//     setForm({ ...form, inputs: newInputs });
//   };

//   const handlePreview = () => {
//     if (!form.formula) return setPreview("No formula");
//     try {
//       const fn = new Function(...form.inputs.map(i => i.name), `return ${form.formula};`);
//       const args = form.inputs.map(i => i.type === "number" ? 1 : "test"); // dummy values
//       setPreview(fn(...args));
//     } catch { setPreview("Error in formula"); }
//   };

//   return (
//     <form className="calc-form" onSubmit={handleSubmit}>
//       <h3>{editing ? "Edit Calculator" : "Add Calculator"}</h3>
//       <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//       <input type="text" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} required />
//       <input type="text" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
//       <input type="text" placeholder="Formula (JS)" value={form.formula} onChange={e => setForm({ ...form, formula: e.target.value })} />
//       <label>Active:
//         <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
//       </label>

//       <div className="input-fields">
//         <h4>Inputs:</h4>
//         {form.inputs.map((input, idx) => (
//           <div key={idx} className="input-row">
//             <input type="text" placeholder="Input Name" value={input.name} onChange={e => updateInputField(idx, "name", e.target.value)} />
//             <select value={input.type} onChange={e => updateInputField(idx, "type", e.target.value)}>
//               <option value="text">Text</option>
//               <option value="number">Number</option>
//               <option value="date">Date</option>
//             </select>
//           </div>
//         ))}
//         <button type="button" onClick={addInputField} className="btn-add-input">+ Add Input</button>
//       </div>

//       <button type="button" onClick={handlePreview} className="btn-preview">Preview</button>
//       {preview !== null && <div className="preview">Preview Result: {preview}</div>}

//       <button type="submit" className="btn-submit">{editing ? "Update" : "Add"}</button>
//     </form>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CalculatorForm({ fetchCalculators, editing, setEditing, setShowForm }) {
  const [form, setForm] = useState({ name: "", type: "", description: "", inputs: [], formula: "", active: true });
  const [preview, setPreview] = useState(null);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ name: "", type: "", description: "", inputs: [], formula: "", active: true });
    setPreview(null);
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) await axios.put(`/api/calculators/${editing._id}`, form, { headers: { Authorization: `Bearer ${token}` } });
      else await axios.post("/api/calculators", form, { headers: { Authorization: `Bearer ${token}` } });
      setForm({ name: "", type: "", description: "", inputs: [], formula: "", active: true });
      fetchCalculators();
      setShowForm(false);
      setEditing(null);
    } catch (err) { console.error(err); }
  };

  const addInputField = () => setForm({ ...form, inputs: [...form.inputs, { name: "", type: "text" }] });
  const updateInputField = (index, key, value) => { const newInputs = [...form.inputs]; newInputs[index][key] = value; setForm({ ...form, inputs: newInputs }); };
  const handlePreview = () => { try { const fn = new Function(...form.inputs.map(i => i.name), `return ${form.formula};`); const args = form.inputs.map(i => i.type==="number"?1:"test"); setPreview(fn(...args)); } catch { setPreview("Error"); } };

  return (
    <form className="calc-form" onSubmit={handleSubmit}>
      <h3>{editing ? "Edit Calculator" : "Add Calculator"}</h3>
      <input type="text" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
      <input type="text" placeholder="Type" value={form.type} onChange={e=>setForm({...form,type:e.target.value})} required />
      <input type="text" placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
      <input type="text" placeholder="Formula (JS)" value={form.formula} onChange={e=>setForm({...form,formula:e.target.value})} />
      <label>Active: <input type="checkbox" checked={form.active} onChange={e=>setForm({...form,active:e.target.checked})} /></label>

      <div className="input-fields">
        <h4>Inputs:</h4>
        {form.inputs.map((input,idx)=>
          <div key={idx} className="input-row">
            <input type="text" placeholder="Input Name" value={input.name} onChange={e=>updateInputField(idx,"name",e.target.value)} />
            <select value={input.type} onChange={e=>updateInputField(idx,"type",e.target.value)}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
          </div>
        )}
        <button type="button" onClick={addInputField} className="btn-add-input">+ Add Input</button>
      </div>

      <button type="button" onClick={handlePreview} className="btn-preview">Preview</button>
      {preview!==null && <div className="preview">Preview Result: {preview}</div>}

      <button type="submit" className="btn-submit">{editing?"Update":"Add"}</button>
    </form>
  );
}
