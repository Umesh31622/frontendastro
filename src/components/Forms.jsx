

// import React, { useEffect, useState } from "react";
// import { formApi } from "../api/api";

// export default function Forms({ token }) {
//   const [forms, setForms] = useState([]);
//   const [formData, setFormData] = useState({ title: "", fields: [] });
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchForms();
//   }, []);

//   const fetchForms = async () => {
//     try {
//       const res = await formApi.get("/", { headers: { Authorization: `Bearer ${token}` } });
//       if (res.data.success) setForms(res.data.forms);
//     } catch (err) {
//       console.error("Error fetching forms:", err);
//     }
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

//   const handleEdit = (form) => {
//     setFormData({
//       title: form.title,
//       fields: form.fields,
//     });
//     setEditingId(form._id);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this form?")) return;
//     await formApi.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     fetchForms();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await formApi.put(`/${editingId}`, formData, { headers: { Authorization: `Bearer ${token}` } });
//         setEditingId(null);
//       } else {
//         await formApi.post("/", formData, { headers: { Authorization: `Bearer ${token}` } });
//       }
//       setFormData({ title: "", fields: [] });
//       fetchForms();
//     } catch (err) {
//       console.error("Error saving form:", err);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Forms</h2>

//       <form className="form-box" onSubmit={handleSubmit}>
//         <input
//           name="title"
//           placeholder="Form Title"
//           value={formData.title}
//           onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//           required
//         />

//         <button type="button" onClick={addField}>
//           Add Field
//         </button>

//         {formData.fields.map((f, i) => (
//           <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
//             <input
//               placeholder="Label"
//               value={f.label}
//               onChange={(e) => handleFieldChange(i, "label", e.target.value)}
//               required
//             />
//             <select value={f.type} onChange={(e) => handleFieldChange(i, "type", e.target.value)}>
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

//         <button type="submit">{editingId ? "Update" : "Add"} Form</button>
//       </form>

//       <h3>Existing Forms</h3>
//       {forms.length === 0 ? (
//         <p>No forms available</p>
//       ) : (
//         forms.map((f) => (
//           <div key={f._id} style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}>
//             <strong>{f.title}</strong>
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
import React, { useEffect, useState } from "react";
import { formApi } from "../api/api";

export default function Forms({ token }) {
  const [forms, setForms] = useState([]);
  const [formData, setFormData] = useState({ title: "", fields: [] });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await formApi.get("/", { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) setForms(res.data.forms);
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  const addField = () => {
    setFormData({
      ...formData,
      fields: [...formData.fields, { label: "", type: "text", required: false }],
    });
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...formData.fields];
    newFields[index][key] = value;
    setFormData({ ...formData, fields: newFields });
  };

  const removeField = (index) => {
    const newFields = formData.fields.filter((_, i) => i !== index);
    setFormData({ ...formData, fields: newFields });
  };

  const handleEdit = (form) => {
    setFormData({
      title: form.title,
      fields: form.fields,
    });
    setEditingId(form._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this form?")) return;
    await formApi.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchForms();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
    <div className="container">
      <h2>Form Builder</h2>
      <form className="form-box" onSubmit={handleSubmit}>
        <input
          name="title"
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

        <button type="submit" className="submit-btn">
          {editingId ? "Update" : "Add"} Form
        </button>
      </form>

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

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 20px auto;
          padding: 20px;
          background: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        h2, h3 {
          text-align: center;
          color: #1f2937;
        }
        .form-box {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 30px;
        }
        .form-box input, .form-box select {
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
        .form-title {
          font-size: 16px;
          color: #111827;
        }
        .fields-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin: 10px 0;
        }
        .field-item {
          background: #f3f4f6;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 13px;
        }
        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        .edit-btn, .delete-btn {
          padding: 6px 12px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          color: #fff;
        }
        .edit-btn { background: #10b981; }
        .edit-btn:hover { opacity: 0.85; }
        .delete-btn { background: #ef4444; }
        .delete-btn:hover { opacity: 0.85; }

        .no-forms {
          text-align: center;
          color: #6b7280;
          margin-top: 10px;
        }

        @media (max-width: 768px) {
          .field-row { flex-direction: column; }
          .form-actions { flex-direction: column; gap: 5px; }
          .fields-list { flex-direction: column; gap: 5px; }
        }
      `}</style>
    </div>
  );
}
