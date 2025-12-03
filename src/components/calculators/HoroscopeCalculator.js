import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/HoroscopeCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function HoroscopeCalculator() {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [list, setList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get(`${API_BASE}/horoscopes`);
      setList(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load horoscopes.");
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editingId) {
        await axios.put(`${API_BASE}/horoscopes/${editingId}`, form);
        setEditingId(null);
        alert("Horoscope updated.");
      } else {
        const res = await axios.post(`${API_BASE}/horoscopes/calculate`, form);
        setList(prev => [res.data, ...prev]);
        alert("Horoscope calculated and saved.");
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false);
      fetchList();
    } catch (err) {
      console.error(err);
      alert("Save failed.");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setForm({
      name: item.name,
      dateOfBirth: item.dateOfBirth,
      timeOfBirth: item.timeOfBirth,
      placeOfBirth: item.placeOfBirth,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this horoscope?")) return;
    try {
      await axios.delete(`${API_BASE}/horoscopes/${id}`);
      setList(list.filter(i => i._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
    setShowForm(false);
  };

  return (
    <div className="calculator-container">
      <h2>🪔 Horoscope Calculator</h2>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : editingId ? "Edit Horoscope" : "Add Horoscope"}
      </button>

      {showForm && (
        <form className="calculator-form" onSubmit={handleSubmit}>
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
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : editingId ? "Update" : "Calculate & Save"}
            </button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <h3>Saved Horoscopes</h3>
      <table className="calculator-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>TOB</th>
            <th>Place</th>
            <th>Sun</th>
            <th>Moon</th>
            <th>Ascendant</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 ? (
            <tr><td colSpan="9" style={{textAlign:'center', padding:'8px'}}>No horoscopes found.</td></tr>
          ) : (
            list.map((i) => (
              <tr key={i._id}>
                <td data-label="Name">{i.name}</td>
                <td data-label="DOB">{i.dateOfBirth}</td>
                <td data-label="TOB">{i.timeOfBirth}</td>
                <td data-label="Place">{i.placeOfBirth}</td>
                <td data-label="Sun">{i.sunSign || "-"}</td>
                <td data-label="Moon">{i.moonSign || "-"}</td>
                <td data-label="Ascendant">{i.ascendant || "-"}</td>
                <td data-label="Description">{i.description || "-"}</td>
                <td data-label="Actions">
                  <button className="edit-btn" onClick={() => startEdit(i)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(i._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
