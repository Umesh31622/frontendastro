import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/PlanetaryCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function PlanetaryCalculator() {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${API_BASE}/planetary`);
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await axios.put(`${API_BASE}/planetary/${editingId}`, form);
        setEntries(entries.map((e) => (e._id === editingId ? res.data : e)));
        setEditingId(null);
      } else {
        const res = await axios.post(`${API_BASE}/planetary/calculate`, form);
        setEntries([res.data, ...entries]);
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Error calculating planetary positions");
    }
  };

  const handleEdit = (entry) => {
    setForm({
      name: entry.name,
      dateOfBirth: entry.dateOfBirth,
      timeOfBirth: entry.timeOfBirth,
      placeOfBirth: entry.placeOfBirth,
    });
    setEditingId(entry._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`${API_BASE}/planetary/${id}`);
    setEntries(entries.filter((e) => e._id !== id));
  };

  return (
    <div className="calculator-container">
      <h2>Planetary Calculator</h2>
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Entry"}
      </button>

      {showForm && (
        <form className="calculator-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
          <input type="time" name="timeOfBirth" value={form.timeOfBirth} onChange={handleChange} required />
          <input type="text" name="placeOfBirth" placeholder="Place of Birth" value={form.placeOfBirth} onChange={handleChange} required />

          <div className="btn-group">
            <button type="submit" className="save-btn">{editingId ? "Update" : "Calculate & Save"}</button>
            {editingId && <button type="button" className="cancel-btn" onClick={() => { setEditingId(null); setForm({ name:"", dateOfBirth:"", timeOfBirth:"", placeOfBirth:"" }); setShowForm(false); }}>Cancel</button>}
          </div>
        </form>
      )}

      <table className="calculator-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Time</th>
            <th>Place</th>
            <th>Sun</th>
            <th>Moon</th>
            <th>Mars</th>
            <th>Mercury</th>
            <th>Jupiter</th>
            <th>Venus</th>
            <th>Saturn</th>
            <th>Rahu</th>
            <th>Ketu</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e._id}>
              <td data-label="Name">{e.name}</td>
              <td data-label="DOB">{e.dateOfBirth}</td>
              <td data-label="Time">{e.timeOfBirth}</td>
              <td data-label="Place">{e.placeOfBirth}</td>
              {Object.keys(e.planets).map((p) => <td key={p} data-label={p}>{e.planets[p]}</td>)}
              <td data-label="Actions">
                <button className="edit-btn" onClick={() => handleEdit(e)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
