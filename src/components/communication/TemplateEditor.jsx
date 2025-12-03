
// import React, { useEffect, useState } from "react";
// import {
//   fetchTemplates,
//   saveTemplate,
//   updateTemplate,
//   deleteTemplate,
// } from "../../api/api";

// export default function TemplateEditor() {
//   const [templates, setTemplates] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState(null);
//   const [name, setName] = useState("");
//   const [type, setType] = useState("email");
//   const [subject, setSubject] = useState("");
//   const [body, setBody] = useState("");

//   // Load templates on mount
//   useEffect(() => {
//     loadTemplates();
//   }, []);

//   const loadTemplates = async () => {
//     try {
//       const res = await fetchTemplates();
//       setTemplates(res.data.data || []);
//     } catch (err) {
//       console.error("Error fetching templates:", err);
//       setTemplates([]);
//     }
//   };

//   const resetForm = () => {
//     setName("");
//     setType("email");
//     setSubject("");
//     setBody("");
//     setEditingId(null);
//   };

//   const handleSave = async () => {
//     if (!name.trim() || !body.trim()) return alert("Name and body are required!");

//     setLoading(true);
//     try {
//       const payload = { name, type, body };
//       if (type === "email") payload.subject = subject;

//       if (editingId) {
//         await updateTemplate(editingId, payload);
//         alert("Template updated successfully!");
//       } else {
//         await saveTemplate(payload);
//         alert("Template created successfully!");
//       }

//       resetForm();
//       loadTemplates();
//     } catch (err) {
//       console.error("Error saving template:", err);
//       alert("Failed to save template.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (template) => {
//     setEditingId(template._id);
//     setName(template.name);
//     setType(template.type);
//     setSubject(template.subject || "");
//     setBody(template.body);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this template?")) return;
//     try {
//       await deleteTemplate(id);
//       alert("Template deleted!");
//       loadTemplates();
//     } catch (err) {
//       console.error("Error deleting template:", err);
//       alert("Failed to delete template.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 700, margin: "auto", padding: 20 }}>
//       <h2>{editingId ? "Edit Template" : "Create Template"}</h2>

//       <input
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         style={styles.input}
//       />

//       <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
//         <option value="email">Email</option>
//         <option value="whatsapp">WhatsApp</option>
//       </select>

//       {type === "email" && (
//         <input
//           placeholder="Subject"
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           style={styles.input}
//         />
//       )}

//       <textarea
//         placeholder="Body"
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//         style={{ ...styles.input, height: 100 }}
//       />

//       <button onClick={handleSave} disabled={loading} style={styles.button}>
//         {loading ? "Saving..." : editingId ? "Update Template" : "Save Template"}
//       </button>

//       <hr style={{ margin: "20px 0" }} />

//       <h3>All Templates</h3>
//       {templates.length === 0 && <p>No templates found.</p>}
//       {templates.map((t) => (
//         <div key={t._id} style={styles.templateCard}>
//           <strong>{t.name}</strong> ({t.type})
//           {t.type === "email" && <div>Subject: {t.subject}</div>}
//           <div>Body: {t.body}</div>
//           <button onClick={() => handleEdit(t)} style={styles.smallButton}>
//             Edit
//           </button>
//           <button onClick={() => handleDelete(t._id)} style={styles.smallButtonDelete}>
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// const styles = {
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 12,
//     borderRadius: 6,
//     border: "1px solid #ccc",
//   },
//   button: {
//     padding: 10,
//     width: "100%",
//     border: "none",
//     borderRadius: 6,
//     backgroundColor: "#3b82f6",
//     color: "#fff",
//     cursor: "pointer",
//     marginBottom: 20,
//   },
//   templateCard: {
//     background: "#f1f5f9",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 6,
//   },
//   smallButton: {
//     marginRight: 10,
//     padding: "4px 8px",
//     cursor: "pointer",
//   },
//   smallButtonDelete: {
//     padding: "4px 8px",
//     cursor: "pointer",
//     backgroundColor: "#ef4444",
//     color: "#fff",
//     border: "none",
//     borderRadius: 4,
//   },
// };

import React, { useEffect, useState } from "react";
import { fetchTemplates, saveTemplate, updateTemplate, deleteTemplate } from "../../api/api";

export default function TemplateEditor({ onSaved }) {
  const [type, setType] = useState("email");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("Hello {{name}}, your order {{orderId}} is confirmed.");
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await fetchTemplates();
      setTemplates(res.data.data || []); // important: use res.data.data
    } catch (err) {
      console.error("Error loading templates:", err);
    }
  };

  const resetForm = () => {
    setName("");
    setSubject("");
    setBody("Hello {{name}}, your order {{orderId}} is confirmed.");
  };

  const save = async () => {
    if (!name.trim() || !body.trim()) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      const payload = { name, type, body };
      if (type === "email") payload.subject = subject;

      await saveTemplate(payload);
      alert("✅ Template saved successfully!");
      resetForm();
      loadTemplates();
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Save template error:", err.response?.data || err.message);
      alert("❌ Error saving template.");
    } finally {
      setLoading(false);
    }
  };

  const removeTemplate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;
    try {
      await deleteTemplate(id);
      alert("Template deleted.");
      loadTemplates();
    } catch (err) {
      console.error(err);
      alert("Error deleting template");
    }
  };

  return (
    <div style={{ background: "#e3e8efff", padding: 20, borderRadius: 10, color: "#fff", maxWidth: 600, margin: "auto" }}>
      <h2>🧩 Message Templates</h2>

      <label>Name *</label>
      <input value={name} onChange={(e) => setName(e.target.value)} style={styles.input} placeholder="Template Name" />

      <label>Type *</label>
      <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
        <option value="email">Email</option>
        <option value="whatsapp">WhatsApp</option>
      </select>

      {type === "email" && (
        <>
          <label>Subject *</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input} placeholder="Email Subject" />
        </>
      )}

      <label>Body *</label>
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={6} style={{ ...styles.input, height: 120 }} placeholder="Message Body" />

      <button onClick={save} disabled={loading} style={{ ...styles.button, backgroundColor: loading ? "#64748b" : "#3b82f6" }}>
        {loading ? "Saving..." : "💾 Save Template"}
      </button>

      <h3 style={{ marginTop: 20 }}>Existing Templates</h3>
      {templates.length === 0 && <p>No templates yet.</p>}
      <ul>
        {templates.map((t) => (
          <li key={t._id} style={{ marginBottom: 10 }}>
            <b>{t.name}</b> ({t.type}){" "}
            <button onClick={() => removeTemplate(t._id)} style={{ marginLeft: 10, color: "red" }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  input: { width: "100%", padding: 8, marginBottom: 10, borderRadius: 6, border: "1px solid #eceef1ff", background: "#f3f4f5ff", color: "#e2e8f0" },
  button: { width: "100%", padding: 10, border: "none", borderRadius: 6, color: "#fff", fontWeight: "bold", cursor: "pointer" },
};
