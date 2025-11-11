import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminContent.css";

export default function CareersAdmin() {
  const [careers, setCareers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://adminastrotalk-1.onrender.com/api/careers";

  // 🔹 Fetch all careers
  const fetchCareers = async () => {
    try {
      const res = await axios.get(API_BASE);
      setCareers(res.data || []);
    } catch (err) {
      console.error("Error fetching careers:", err);
      alert("❌ Error loading careers list");
    }
  };

  // 🔹 Add new career
  const addCareer = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("⚠️ Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(API_BASE, { title, description });
      alert(res.data.message || "✅ Career added successfully!");
      setTitle("");
      setDescription("");
      fetchCareers();
    } catch (err) {
      console.error("Error adding career:", err);
      alert("❌ Failed to add career");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete career
  const deleteCareer = async (id) => {
    if (!window.confirm("Are you sure you want to delete this career?")) return;

    try {
      await axios.delete(`${API_BASE}/${id}`);
      alert("🗑️ Career deleted successfully!");
      fetchCareers();
    } catch (err) {
      console.error("Error deleting career:", err);
      alert("❌ Failed to delete career");
    }
  };

  // Load on mount
  useEffect(() => {
    fetchCareers();
  }, []);

  return (
    <div className="admin-content-container">
      <h2 className="admin-title">💼 Careers Management</h2>

      {/* Add Career Form */}
      <form onSubmit={addCareer} className="admin-form">
        <input
          type="text"
          placeholder="Enter Career Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="admin-input"
        />
        <textarea
          placeholder="Enter Career Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          className="admin-textarea"
        />
        <button type="submit" className="admin-btn" disabled={loading}>
          {loading ? "Saving..." : "➕ Add Career"}
        </button>
      </form>

      {/* List of Careers */}
      <div className="admin-list">
        <h3 className="admin-subtitle">Existing Careers</h3>
        {careers.length === 0 ? (
          <p className="admin-empty">No careers found.</p>
        ) : (
          <ul className="admin-ul">
            {careers.map((career) => (
              <li key={career._id} className="admin-list-item">
                <div className="admin-list-info">
                  <strong>{career.title}</strong>
                  <p>{career.description}</p>
                </div>
                <button
                  className="admin-delete-btn"
                  onClick={() => deleteCareer(career._id)}
                >
                  ❌ Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
