import React, { useEffect, useState } from "react";
import { fetchAnalytics, createAnalytics, updateAnalytics, deleteAnalytics } from "../api/analyticsApi";

export default function Analytics() {
  const [analyticsList, setAnalyticsList] = useState([]);
  const [type, setType] = useState("");
  const [data, setData] = useState("{}");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await fetchAnalytics();
      setAnalyticsList(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load analytics");
    }
  };

  const saveAnalytics = async () => {
    if (!type) return alert("Enter type");
    let parsedData = {};
    try { parsedData = JSON.parse(data); } catch { return alert("Invalid JSON"); }
    setLoading(true);
    try {
      await createAnalytics({ type, data: parsedData });
      setType(""); setData("{}");
      loadAnalytics();
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving");
    } finally { setLoading(false); }
  };

  const removeAnalytics = async (id) => {
    if (!window.confirm("Delete this analytics?")) return;
    try {
      await deleteAnalytics(id);
      loadAnalytics();
      alert("Deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reports & Analytics</h2>

      <input placeholder="Type (e.g. revenue)" value={type} onChange={e => setType(e.target.value)} style={styles.input} />
      <textarea placeholder='Data as JSON' value={data} onChange={e => setData(e.target.value)} rows={4} style={styles.input} />
      <button onClick={saveAnalytics} style={styles.button} disabled={loading}>{loading ? "Saving..." : "Save Analytics"}</button>

      <h3>All Analytics</h3>
      {analyticsList.length === 0 ? <p>No records.</p> : (
        analyticsList.map(a => (
          <div key={a._id} style={styles.card}>
            <strong>{a.type}</strong>
            <pre>{JSON.stringify(a.data, null, 2)}</pre>
            <button onClick={() => removeAnalytics(a._id)} style={styles.deleteBtn}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: { maxWidth: 800, margin: "auto", padding: 20, background: "#1e293b", color: "#fff", borderRadius: 8 },
  input: { width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #334155", background: "#0f172a", color: "#e2e8f0" },
  button: { width: "100%", padding: 10, border: "none", borderRadius: 6, background: "#3b82f6", color: "#fff", fontWeight: "bold", cursor: "pointer", marginBottom: 20 },
  card: { background: "#0f172a", padding: 10, marginBottom: 12, borderRadius: 6 },
  deleteBtn: { padding: "4px 8px", background: "#ef4444", border: "none", borderRadius: 4, color: "#fff", cursor: "pointer", marginTop: 8 }
};
