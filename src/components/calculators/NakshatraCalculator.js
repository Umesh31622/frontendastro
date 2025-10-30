import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/NakshatraCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function NakshatraCalculator() {
  const [form, setForm] = useState({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${API_BASE}/nakshatra`);
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await axios.put(`${API_BASE}/nakshatra/${editingId}`, form);
        setEntries(entries.map(ent => ent._id === editingId ? res.data : ent));
        setEditingId(null);
      } else {
        const res = await axios.post(`${API_BASE}/nakshatra/calculate`, form);
        setEntries([res.data, ...entries]);
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save entry");
    }
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`${API_BASE}/nakshatra/${id}`);
    setEntries(entries.filter(e => e._id !== id));
  };

  const handleEdit = entry => {
    setForm({ name: entry.name, dateOfBirth: entry.dateOfBirth, timeOfBirth: entry.timeOfBirth, placeOfBirth: entry.placeOfBirth });
    setEditingId(entry._id);
    setShowForm(true);
  };

  return (
    <div className="calculator-container">
      <h2>Nakshatra Calculator</h2>
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : (editingId ? "Edit Entry" : "Add Entry")}
      </button>

      {showForm && (
        <form className="calculator-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
          <input type="time" name="timeOfBirth" value={form.timeOfBirth} onChange={handleChange} required />
          <input type="text" name="placeOfBirth" placeholder="Place of Birth" value={form.placeOfBirth} onChange={handleChange} required />
          <div className="btn-group">
            <button type="submit">{editingId ? "Update" : "Calculate & Save"}</button>
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
            <th>Nakshatra</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(e => (
            <tr key={e._id}>
              <td>{e.name}</td>
              <td>{e.dateOfBirth}</td>
              <td>{e.timeOfBirth}</td>
              <td>{e.placeOfBirth}</td>
              <td>{e.nakshatra}</td>
              <td>
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
