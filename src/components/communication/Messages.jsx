
// import React, { useEffect, useState } from "react";
// import { fetchTemplates, fetchMessages, sendMessage } from "../../api/api";

// export default function Messages({ defaultChannel = "email" }) {
//   const [templates, setTemplates] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [to, setTo] = useState("");
//   const [templateId, setTemplateId] = useState("");
//   const [variables, setVariables] = useState("{}");
//   const [channel, setChannel] = useState(defaultChannel);

//   useEffect(() => {
//     loadTemplates();
//     loadLogs();
//   }, []);

//   const loadTemplates = async () => {
//     try {
//       const res = await fetchTemplates();
//       setTemplates(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const loadLogs = async () => {
//     try {
//       const res = await fetchMessages();
//       setLogs(res.data.data || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const send = async () => {
//     if (!to || !templateId) return alert("Fill 'To' and select a template.");
//     let vars = {};
//     try {
//       vars = JSON.parse(variables);
//     } catch {
//       return alert("Variables must be valid JSON");
//     }

//     try {
//       await sendMessage({ to, templateId, channel, variables: vars });
//       alert("Message sent!");
//       setTo("");
//       setTemplateId("");
//       setVariables("{}");
//       loadLogs();
//     } catch (err) {
//       console.error(err);
//       alert("Error sending message");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Send Message</h2>

//       <input
//         placeholder="To (email/whatsapp:+91...)"
//         value={to}
//         onChange={(e) => setTo(e.target.value)}
//         style={styles.input}
//       />

//       <select value={channel} onChange={(e) => setChannel(e.target.value)} style={styles.input}>
//         <option value="email">Email</option>
//         <option value="whatsapp">WhatsApp</option>
//       </select>

//       <select value={templateId} onChange={(e) => setTemplateId(e.target.value)} style={styles.input}>
//         <option value="">-- choose template --</option>
//         {templates.map((t) => (
//           <option key={t._id} value={t._id}>
//             {t.name} ({t.type})
//           </option>
//         ))}
//       </select>

//       <textarea
//         rows={3}
//         placeholder='Variables as JSON, e.g. {"name":"Rinku"}'
//         value={variables}
//         onChange={(e) => setVariables(e.target.value)}
//         style={{ ...styles.input, height: 80 }}
//       />

//       <button onClick={send} style={styles.button}>
//         Send
//       </button>

//       <h3 style={styles.subheading}>Recent Logs</h3>
//       {logs.length === 0 ? (
//         <p>No logs yet.</p>
//       ) : (
//         <ul style={styles.logList}>
//           {logs.map((l) => (
//             <li key={l._id} style={styles.logItem}>
//               <strong>{(l.channel ?? "N/A").toUpperCase()}</strong> → {l.receiver ?? "Unknown"}{" "}
//               <span style={styles.status}>[{l.status ?? "sent"}]</span>
//               <br />
//               <small>{l.createdAt ? new Date(l.createdAt).toLocaleString() : "Unknown date"}</small>
//               <br />
//               <span>{l.message ?? ""}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// // ===================== STYLES =====================
// const styles = {
//   container: {
//     background: "#1e293b",
//     padding: 20,
//     borderRadius: 8,
//     color: "#fff",
//     maxWidth: 600,
//     margin: "20px auto",
//     fontFamily: "Arial, sans-serif",
//   },
//   heading: { marginBottom: 15, fontSize: 24, textAlign: "center" },
//   subheading: { marginTop: 20, fontSize: 20 },
//   input: {
//     width: "100%",
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 6,
//     border: "1px solid #334155",
//     background: "#0f172a",
//     color: "#e2e8f0",
//   },
//   button: {
//     width: "100%",
//     padding: 12,
//     borderRadius: 6,
//     border: "none",
//     background: "#3b82f6",
//     color: "#fff",
//     fontWeight: "bold",
//     cursor: "pointer",
//     marginBottom: 20,
//   },
//   logList: { listStyle: "none", paddingLeft: 0 },
//   logItem: {
//     background: "#334155",
//     padding: 10,
//     borderRadius: 6,
//     marginBottom: 10,
//   },
//   status: { color: "#fbbf24" },
// };


import React, { useEffect, useState } from "react";
import { fetchTemplates, triggerAutomation } from "../../api/api";

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
      // TODO: Replace with actual API call to fetch triggers
      // Example: GET /communication/triggers
      // const res = await commApi.get("/triggers");
      // setTriggersList(res.data.data || []);
      setTriggersList([
        // Placeholder triggers for demo
        { eventType: "order_confirmation", templateName: "Order Confirmed" },
        { eventType: "feedback_request", templateName: "Feedback Form" },
      ]);
    } catch (err) {
      console.error("Failed to load triggers:", err);
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
      loadTriggers(); // reload triggers after saving
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
      // TODO: Replace with actual API call to delete trigger
      // await commApi.delete(`/trigger/${eventType}`);
      alert(`Trigger "${eventType}" deleted!`);
      loadTriggers();
    } catch (err) {
      console.error("Error deleting trigger:", err);
      alert("❌ Error deleting trigger");
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        background: "#1e293b",
        borderRadius: 8,
        color: "#fff",
      }}
    >
      <h2>Automated Triggers</h2>

      <label>Trigger Type</label>
      <select
        value={triggerType}
        onChange={(e) => setTriggerType(e.target.value)}
        style={styles.input}
      >
        {triggerOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <label>Select Template</label>
      <select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        style={styles.input}
      >
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
        style={{
          ...styles.button,
          backgroundColor: loading ? "#64748b" : "#3b82f6",
        }}
      >
        {loading ? "Saving..." : "💾 Save Trigger"}
      </button>

      <h3>Existing Triggers</h3>
      {triggersList.length === 0 ? (
        <p>No triggers set.</p>
      ) : (
        triggersList.map((trg) => (
          <div key={trg.eventType} style={styles.triggerCard}>
            <div>
              <strong>{trg.eventType}</strong> → Template: {trg.templateName}
            </div>
            <button
              onClick={() => deleteTrigger(trg.eventType)}
              style={styles.smallButtonDelete}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
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
    color: "#e2e8f0",
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
