// // import React, { useState, useEffect } from "react";
// // import { formApi, serviceApi } from "../api";

// // export default function FormBuilder() {
// //   const [services, setServices] = useState([]);
// //   const [formData, setFormData] = useState({ title: "", serviceId: "", fields: [] });

// //   const fetchServices = async () => {
// //     const res = await serviceApi.get("/");
// //     setServices(res.data);
// //   };

// //   useEffect(() => { fetchServices(); }, []);

// //   const addField = () => {
// //     setFormData({ ...formData, fields: [...formData.fields, { label: "", type: "text", required: false }] });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await formApi.post("/", formData);
// //     setFormData({ title: "", serviceId: "", fields: [] });
// //   };

// //   return (
// //     <div>
// //       <h2>Form Builder</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input placeholder="Form Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
// //         <select value={formData.serviceId} onChange={e => setFormData({ ...formData, serviceId: e.target.value })}>
// //           <option value="">Select Service</option>
// //           {services.map(s => <option key={s._id} value={s._id}>{s.title}</option>)}
// //         </select>
// //         <button type="button" onClick={addField}>Add Field</button>

// //         {formData.fields.map((f, i) => (
// //           <div key={i}>
// //             <input placeholder="Label" value={f.label} onChange={e => {
// //               const fields = [...formData.fields];
// //               fields[i].label = e.target.value;
// //               setFormData({ ...formData, fields });
// //             }} />
// //             <select value={f.type} onChange={e => {
// //               const fields = [...formData.fields];
// //               fields[i].type = e.target.value;
// //               setFormData({ ...formData, fields });
// //             }}>
// //               <option value="text">Text</option>
// //               <option value="number">Number</option>
// //               <option value="select">Select</option>
// //               <option value="date">Date</option>
// //               <option value="file">File</option>
// //             </select>
// //           </div>
// //         ))}

// //         <button type="submit">Save Form</button>
// //       </form>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import { formApi, serviceApi } from "../api";

// export default function FormBuilder() {
//   const [services, setServices] = useState([]);
//   const [formData, setFormData] = useState({ title: "", serviceId: "", fields: [] });
//   const [forms, setForms] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchServices();
//     fetchForms();
//   }, []);

//   const fetchServices = async () => {
//     const res = await serviceApi.get("/");
//     setServices(res.data);
//   };

//   const fetchForms = async () => {
//     const res = await formApi.get("/");
//     if (res.data.success) setForms(res.data.forms);
//   };

//   const addField = () => {
//     setFormData({
//       ...formData,
//       fields: [...formData.fields, { label: "", type: "text", required: false }],
//     });
//   };

//   const handleFieldChange = (index, key, value) => {
//     const newFields = [...formData.fields];
//     newFields[index][key] = key === "required" ? value : value;
//     setFormData({ ...formData, fields: newFields });
//   };

//   const removeField = (index) => {
//     const newFields = formData.fields.filter((_, i) => i !== index);
//     setFormData({ ...formData, fields: newFields });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await formApi.put(`/${editingId}`, formData);
//         setEditingId(null);
//       } else {
//         await formApi.post("/", formData);
//       }
//       setFormData({ title: "", serviceId: "", fields: [] });
//       fetchForms();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleEdit = (form) => {
//     setFormData({
//       title: form.title,
//       serviceId: form.serviceId || "",
//       fields: form.fields,
//     });
//     setEditingId(form._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this form?")) return;
//     await formApi.delete(`/${id}`);
//     fetchForms();
//   };

//   return (
//     <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
//       <h2>Form Builder</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
//         <input
//           placeholder="Form Title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           required
//           style={{ padding: 10, marginBottom: 10, width: "100%" }}
//         />

//         <select
//           value={formData.serviceId}
//           onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
//           style={{ padding: 10, marginBottom: 10, width: "100%" }}
//         >
//           <option value="">Select Service</option>
//           {services.map((s) => (
//             <option key={s._id} value={s._id}>
//               {s.title}
//             </option>
//           ))}
//         </select>

//         <button type="button" onClick={addField} style={{ marginBottom: 10 }}>
//           Add Field
//         </button>

//         {formData.fields.map((f, i) => (
//           <div key={i} style={{ marginBottom: 10, display: "flex", gap: 10 }}>
//             <input
//               placeholder="Label"
//               value={f.label}
//               onChange={(e) => handleFieldChange(i, "label", e.target.value)}
//               required
//             />
//             <select
//               value={f.type}
//               onChange={(e) => handleFieldChange(i, "type", e.target.value)}
//             >
//               <option value="text">Text</option>
//               <option value="number">Number</option>
//               <option value="select">Select</option>
//               <option value="date">Date</option>
//               <option value="file">File</option>
//             </select>
//             <label>
//               Required
//               <input
//                 type="checkbox"
//                 checked={f.required}
//                 onChange={(e) => handleFieldChange(i, "required", e.target.checked)}
//               />
//             </label>
//             <button type="button" onClick={() => removeField(i)}>
//               Remove
//             </button>
//           </div>
//         ))}

//         <button type="submit">{editingId ? "Update" : "Save"} Form</button>
//       </form>

//       <h3>Existing Forms</h3>
//       {forms.length === 0 ? (
//         <p>No forms available</p>
//       ) : (
//         forms.map((f) => (
//           <div key={f._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
//             <strong>{f.title}</strong>
//             <div>Service: {f.serviceId || "N/A"}</div>
//             <div>
//               Fields:
//               <ul>
//                 {f.fields.map((field, idx) => (
//                   <li key={idx}>
//                     {field.label} ({field.type}) {field.required ? "- required" : ""}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <button onClick={() => handleEdit(f)}>Edit</button>
//             <button onClick={() => handleDelete(f._id)}>Delete</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { formApi, serviceApi } from "../api/api";

export default function FormDashboard({ token }) {
  const [forms, setForms] = useState([]);
  const [formData, setFormData] = useState({ title: "", fields: [] });
  const [editingId, setEditingId] = useState(null);

  // Fetch all forms
  const fetchForms = async () => {
    try {
      const res = await formApi.get("/", { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) setForms(res.data.forms);
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  useEffect(() => { fetchForms(); }, []);

  // Add a new field
  const addField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, { label: "", type: "text", required: false }],
    });
  };

  // Handle field change
  const handleFieldChange = (index, key, value) => {
    const newFields = [...formData.fields];
    newFields[index][key] = value;
    setFormData({ ...formData, fields: newFields });
  };

  // Remove a field
  const removeField = (index) => {
    const newFields = formData.fields.filter((_, i) => i !== index);
    setFormData({ ...formData, fields: newFields });
  };

  // Edit existing form
  const handleEdit = (form) => {
    setFormData({ title: form.title, fields: form.fields });
    setEditingId(form._id);
  };

  // Delete form
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this form?")) return;
    await formApi.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchForms();
  };

  // Submit form (create/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.title.trim()) return alert("Form title is required");
      if (editingId) {
        await formApi.put(`/${editingId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
        setEditingId(null);
      } else {
        await formApi.post("/", formData, { headers: { Authorization: `Bearer ${token}` } });
      }
      setFormData({ title: "", fields: [] });
      fetchForms();
    } catch (err) {
      console.error("Error saving form:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Form Builder & Management</h2>

      <div className="builder-section">
        <h3>{editingId ? "Edit Form" : "Create New Form"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Form Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <button type="button" className="add-field-btn" onClick={addField}>
            + Add Field
          </button>

          {formData.fields.map((f, i) => (
            <div key={i} className="field-row">
              <input
                placeholder="Label"
                value={f.label}
                onChange={(e) => handleFieldChange(i, "label", e.target.value)}
                required
              />
              <select value={f.type} onChange={(e) => handleFieldChange(i, "type", e.target.value)}>
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="select">Select</option>
                <option value="date">Date</option>
                <option value="file">File</option>
              </select>
              <label className="required-label">
                <input
                  type="checkbox"
                  checked={f.required}
                  onChange={(e) => handleFieldChange(i, "required", e.target.checked)}
                />
                Required
              </label>
              <button type="button" className="remove-btn" onClick={() => removeField(i)}>
                Remove
              </button>
            </div>
          ))}

          <button type="submit" className="submit-btn">{editingId ? "Update" : "Add"} Form</button>
        </form>
      </div>

      <div className="list-section">
        <h3>Existing Forms</h3>
        {forms.length === 0 ? (
          <p className="no-forms">No forms available</p>
        ) : (
          forms.map((f) => (
            <div key={f._id} className="form-card">
              <strong className="form-title">{f.title}</strong>
              <div className="fields-list">
                {f.fields.map((field, idx) => (
                  <span key={idx} className="field-item">
                    {field.label} ({field.type}) {field.required ? "- required" : ""}
                  </span>
                ))}
              </div>
              <div className="form-actions">
                <button className="edit-btn" onClick={() => handleEdit(f)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(f._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1000px;
          margin: 20px auto;
          padding: 20px;
          background: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        h2, h3 { text-align: center; color: #1f2937; }

        .builder-section, .list-section {
          margin-bottom: 40px;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        input, select {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }
        .add-field-btn, .submit-btn {
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          background-color: #3b82f6;
          color: #fff;
          cursor: pointer;
          font-weight: 500;
        }
        .add-field-btn:hover, .submit-btn:hover { background-color: #2563eb; }

        .field-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
        }
        .required-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 14px;
        }
        .remove-btn {
          padding: 5px 10px;
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .remove-btn:hover { opacity: 0.85; }

        .form-card {
          background: #fff;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 15px;
        }
        .form-title { font-size: 16px; color: #111827; }
        .fields-list { display: flex; flex-wrap: wrap; gap: 10px; margin: 10px 0; }
        .field-item { background: #f3f4f6; padding: 5px 10px; border-radius: 5px; font-size: 13px; }
        .form-actions { display: flex; gap: 10px; justify-content: flex-end; }
        .edit-btn { padding: 6px 12px; border-radius: 5px; border: none; cursor: pointer; background: #10b981; color: #fff; }
        .edit-btn:hover { opacity: 0.85; }
        .delete-btn { padding: 6px 12px; border-radius: 5px; border: none; cursor: pointer; background: #ef4444; color: #fff; }
        .delete-btn:hover { opacity: 0.85; }
        .no-forms { text-align: center; color: #6b7280; margin-top: 10px; }

        @media (max-width: 768px) {
          .field-row { flex-direction: column; }
          .form-actions { flex-direction: column; gap: 5px; }
          .fields-list { flex-direction: column; gap: 5px; }
        }
      `}</style>
    </div>
  );
}
