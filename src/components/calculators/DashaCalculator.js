import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/DashaCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

const DashaCalculator = () => {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [dashas, setDashas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchDashas = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dashas`);
      setDashas(res.data);
    } catch (err) {
      console.error("❌ Error fetching dashas:", err);
    }
  };

  useEffect(() => {
    fetchDashas();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/dashas/${editingId}`, form);
        setEditingId(null);
        alert("✅ Dasha updated successfully!");
      } else {
        await axios.post(`${API_BASE}/dashas/calculate`, form);
        alert("✅ Dasha calculated & saved successfully!");
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false);
      fetchDashas();
    } catch (err) {
      console.error(err);
      alert("❌ Error calculating/updating Dasha");
    }
  };

  const handleEdit = (dasha) => {
    setForm({
      name: dasha.name,
      dateOfBirth: dasha.dateOfBirth,
      timeOfBirth: dasha.timeOfBirth,
      placeOfBirth: dasha.placeOfBirth,
    });
    setEditingId(dasha._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this Dasha?")) return;
    try {
      await axios.delete(`${API_BASE}/dashas/${id}`);
      fetchDashas();
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  };

  return (
    <div className="dasha-container">
      <h2>🌟 Dasha Calculator</h2>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Dasha"}
      </button>

      {showForm && (
        <form className="dasha-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="calculate-btn">
              {editingId ? "Update Dasha" : "Calculate & Save"}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <h3>📜 All Saved Dashas</h3>
      {dashas.length === 0 ? (
        <p>No Dasha data found.</p>
      ) : (
        <table className="dasha-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Time</th>
              <th>Place</th>
              <th>Mahadasha</th>
              <th>Antardasha</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dashas.map((d) => (
              <tr key={d._id}>
                <td data-label="Name">{d.name}</td>
                <td data-label="DOB">{d.dateOfBirth}</td>
                <td data-label="Time">{d.timeOfBirth}</td>
                <td data-label="Place">{d.placeOfBirth}</td>
                <td data-label="Mahadasha">{d.dashaData?.mahadasha || "-"}</td>
                <td data-label="Antardasha">{d.dashaData?.antardasha || "-"}</td>
                <td data-label="Description">{d.dashaData?.description || "-"}</td>
                <td data-label="Actions">
                  <button className="edit-btn" onClick={() => handleEdit(d)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(d._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashaCalculator;
