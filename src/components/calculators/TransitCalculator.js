import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/TransitCalculator.css";

const API_BASE =
  process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

const TransitCalculator = () => {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [transits, setTransits] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 🔄 Fetch Transits */
  const fetchTransits = async () => {
    try {
      const res = await axios.get(`${API_BASE}/transits`);
      setTransits(res.data?.data || res.data || []);
    } catch (err) {
      console.error("❌ Error fetching transits:", err);
      alert("Failed to fetch transits. Please check API connection.");
    }
  };

  useEffect(() => {
    fetchTransits();
  }, []);

  /* 📝 Handle Input */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* 🧮 Handle Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/transits/${editingId}`, form);
        alert("✅ Transit updated successfully!");
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/transits/calculate`, form);
        alert("✅ Transit calculated & saved successfully!");
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false);
      fetchTransits();
    } catch (err) {
      console.error("❌ Error calculating/updating transit:", err);
      alert("Failed to calculate transit. Check details or server.");
    } finally {
      setLoading(false);
    }
  };

  /* ✏️ Edit Mode */
  const handleEdit = (transit) => {
    setForm({
      name: transit.name,
      dateOfBirth: transit.dateOfBirth,
      timeOfBirth: transit.timeOfBirth,
      placeOfBirth: transit.placeOfBirth,
    });
    setEditingId(transit._id);
    setShowForm(true);
  };

  /* ❌ Delete */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transit permanently?")) return;
    try {
      await axios.delete(`${API_BASE}/transits/${id}`);
      fetchTransits();
    } catch (err) {
      console.error(err);
      alert("Failed to delete transit.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  };

  return (
    <div className="transit-container">
      <h2 className="heading">🪐 Transit Calculator</h2>

      {/* ➕ Add Button */}
      <button
        className={`add-btn ${showForm ? "active" : ""}`}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Hide Form" : "Add Transit"}
      </button>

      {/* ✨ Input Form */}
      {showForm && (
        <form className="transit-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="timeOfBirth"
            value={form.timeOfBirth}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="placeOfBirth"
            placeholder="Place of Birth"
            value={form.placeOfBirth}
            onChange={handleChange}
            required
          />

          <div className="btn-group">
            <button type="submit" className="calculate-btn" disabled={loading}>
              {loading
                ? "Calculating..."
                : editingId
                ? "Update Transit"
                : "Calculate & Save"}
            </button>
            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* 📜 Results */}
      <h3 className="subheading">📜 All Saved Transits</h3>

      {transits.length === 0 ? (
        <p className="empty">No Transit data found yet.</p>
      ) : (
        <table className="transit-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Time</th>
              <th>Place</th>
              <th>Transit Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transits.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.dateOfBirth}</td>
                <td>{t.timeOfBirth}</td>
                <td>{t.placeOfBirth}</td>

                <td>
                  {t.transitData ? (
                    <div className="transit-details">
                      <p>
                        🌞 <b>Sun:</b> {t.transitData.sunTransit || "-"}
                      </p>
                      <p>
                        🌙 <b>Moon:</b> {t.transitData.moonTransit || "-"}
                      </p>
                      <p>
                        📖 <b>Note:</b>{" "}
                        {t.transitData.description || "No description."}
                      </p>

                      {t.transitData.planets &&
                        t.transitData.planets.length > 0 && (
                          <details>
                            <summary>🔭 View All Planets</summary>
                            <ul>
                              {t.transitData.planets.map((p, idx) => (
                                <li key={idx}>
                                  <b>{p.name}</b> → {p.sign} (
                                  {p.longitude}°)
                                  {p.retrograde === "Yes"
                                    ? " 🔁 Retrograde"
                                    : ""}
                                </li>
                              ))}
                            </ul>
                          </details>
                        )}
                    </div>
                  ) : (
                    "-"
                  )}
                </td>

                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransitCalculator;
