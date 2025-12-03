

// import React, { useEffect, useState } from "react";
// import { fetchTemplates, triggerAutomation } from "../../api/api";

// export default function Triggers() {
//   const [templates, setTemplates] = useState([]);
//   const [triggerType, setTriggerType] = useState("order_confirmation");
//   const [selectedTemplate, setSelectedTemplate] = useState("");
//   const [loading, setLoading] = useState(false);

//   const triggerOptions = [
//     { value: "order_confirmation", label: "Order Confirmation" },
//     { value: "pdf_delivery", label: "PDF Delivery" },
//     { value: "remedy_start", label: "Remedy Start" },
//     { value: "feedback_request", label: "Feedback Request" },
//     { value: "follow_up", label: "Follow-up Nudges" },
//     { value: "missed_alert", label: "Missed Remedy/Call Alerts" },
//   ];

//   useEffect(() => {
//     loadTemplates();
//   }, []);

//   const loadTemplates = async () => {
//     try {
//       const res = await fetchTemplates();
//       setTemplates(res.data.data || []);
//     } catch (err) {
//       console.error("Error loading templates:", err);
//       alert("Failed to load templates");
//     }
//   };

//   const saveTrigger = async () => {
//     if (!selectedTemplate) return alert("Select a template first");
//     setLoading(true);
//     try {
//       await triggerAutomation(triggerType, { templateId: selectedTemplate });
//       alert("✅ Trigger saved successfully!");
//       setSelectedTemplate("");
//     } catch (err) {
//       console.error("Error saving trigger:", err.response?.data || err.message);
//       alert("❌ Error saving trigger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20, background: "#1e293b", borderRadius: 8, color: "#fff" }}>
//       <h2>Automated Triggers</h2>

//       <label>Trigger Type</label>
//       <select
//         value={triggerType}
//         onChange={(e) => setTriggerType(e.target.value)}
//         style={styles.input}
//       >
//         {triggerOptions.map((opt) => (
//           <option key={opt.value} value={opt.value}>{opt.label}</option>
//         ))}
//       </select>

//       <label>Select Template</label>
//       <select
//         value={selectedTemplate}
//         onChange={(e) => setSelectedTemplate(e.target.value)}
//         style={styles.input}
//       >
//         <option value="">-- choose template --</option>
//         {templates.map((t) => (
//           <option key={t._id} value={t._id}>{t.name} ({t.type})</option>
//         ))}
//       </select>

//       <button onClick={saveTrigger} disabled={loading} style={{ ...styles.button, backgroundColor: loading ? "#64748b" : "#3b82f6" }}>
//         {loading ? "Saving..." : "💾 Save Trigger"}
//       </button>
//     </div>
//   );
// }

// const styles = {
//   input: {
//     width: "100%",
//     padding: 8,
//     marginBottom: 12,
//     borderRadius: 6,
//     border: "1px solid #334155",
//     background: "#0f172a",
//     color: "#e2e8f0",
//   },
//   button: {
//     width: "100%",
//     padding: 10,
//     border: "none",
//     borderRadius: 6,
//     fontWeight: "bold",
//     color: "#fff",
//     cursor: "pointer",
//   },
// };

import React, { useEffect, useState } from "react";
import { fetchTemplates, triggerAutomation } from "../../api/api";
import axios from "../../api/api"; // for fetching triggers & delete

export default function Triggers() {
  const [templates, setTemplates] = useState([]);
  const [triggerType, setTriggerType] = useState("order_confirmation");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [loading, setLoading] = useState(false);
  const [triggersList, setTriggersList] = useState([]);

  const triggerOptions = [
    { value: "order_confirmation", label: "Order Confirmation" },
    { value: "pdf_delivery", label: "PDF Delivery" },
    { value: "remedy_start", label: "Remedy Start" },
    { value: "feedback_request", label: "Feedback Request" },
    { value: "follow_up", label: "Follow-up Nudges" },
    { value: "missed_alert", label: "Missed Remedy/Call Alerts" },
  ];

  useEffect(() => {
    loadTemplates();
    loadTriggers();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await fetchTemplates();
      setTemplates(res.data.data || []);
    } catch (err) {
      console.error("Error loading templates:", err);
      alert("Failed to load templates");
    }
  };

  const loadTriggers = async () => {
    try {
      const res = await axios.get("/communication/triggers");
      setTriggersList(res.data.data || []);
    } catch (err) {
      console.error("Error loading triggers:", err);
      setTriggersList([]);
    }
  };

  const saveTrigger = async () => {
    if (!selectedTemplate) return alert("Select a template first");
    setLoading(true);
    try {
      await triggerAutomation(triggerType, { templateId: selectedTemplate });
      alert("✅ Trigger saved successfully!");
      setSelectedTemplate("");
      loadTriggers();
    } catch (err) {
      console.error("Error saving trigger:", err.response?.data || err.message);
      alert("❌ Error saving trigger");
    } finally {
      setLoading(false);
    }
  };

  const deleteTrigger = async (eventType) => {
    if (!window.confirm("Are you sure you want to delete this trigger?")) return;
    try {
      await axios.delete(`/communication/trigger/${eventType}`);
      alert("Trigger deleted!");
      loadTriggers();
    } catch (err) {
      console.error("Error deleting trigger:", err.response?.data || err.message);
      alert("❌ Error deleting trigger");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Automated Triggers</h2>

      <label>Trigger Type</label>
      <select value={triggerType} onChange={(e) => setTriggerType(e.target.value)} style={styles.input}>
        {triggerOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label>Select Template</label>
      <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} style={styles.input}>
        <option value="">-- choose template --</option>
        {templates.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name} ({t.type})
          </option>
        ))}
      </select>

      <button
        onClick={saveTrigger}
        disabled={loading}
        style={{ ...styles.button, backgroundColor: loading ? "#64748b" : "#3b82f6" }}
      >
        {loading ? "Saving..." : "💾 Save Trigger"}
      </button>

      <h3>Existing Triggers</h3>
      {triggersList.length === 0 && <p>No triggers set.</p>}
      {triggersList.map((trg) => (
        <div key={trg.eventType} style={styles.triggerCard}>
          <strong>{trg.eventType}</strong> → Template: {trg.templateId?.name || "N/A"}
          <button onClick={() => deleteTrigger(trg.eventType)} style={styles.smallButtonDelete}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "auto",
    padding: 20,
    background: "#1e293b",
    borderRadius: 8,
    color: "#fff",
  },
  input: {
    width: "100%",
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #334155",
    background: "#0f172a",
    color: "#e2e8f0",
  },
  button: {
    width: "100%",
    padding: 10,
    border: "none",
    borderRadius: 6,
    fontWeight: "bold",
    color: "#fff",
    cursor: "pointer",
    marginBottom: 20,
  },
  triggerCard: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    background: "#0f172a",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallButtonDelete: {
    padding: "4px 8px",
    cursor: "pointer",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 4,
  },
};
