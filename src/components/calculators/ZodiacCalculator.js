import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ZodiacCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function ZodiacCalculator() {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [zodiacs, setZodiacs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchZodiacs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/zodiac`);
      setZodiacs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchZodiacs();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        // UPDATE
        res = await axios.put(`${API_BASE}/zodiac/${editingId}`, form, {
          headers: { "Content-Type": "application/json" },
        });
        setZodiacs(zodiacs.map(z => z._id === editingId ? res.data : z));
        setEditingId(null);
      } else {
        // CREATE
        res = await axios.post(`${API_BASE}/zodiac/calculate`, form, {
          headers: { "Content-Type": "application/json" },
        });
        setZodiacs([res.data, ...zodiacs]);
      }
      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save zodiac");
    }
  };

  const handleEdit = (zodiac) => {
    setForm({
      name: zodiac.name,
      dateOfBirth: zodiac.dateOfBirth,
      timeOfBirth: zodiac.timeOfBirth,
      placeOfBirth: zodiac.placeOfBirth,
    });
    setEditingId(zodiac._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`${API_BASE}/zodiac/${id}`);
    setZodiacs(zodiacs.filter((z) => z._id !== id));
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
    setShowForm(false);
  };

  return (
    <div className="calculator-container">
      <h2>Zodiac Calculator</h2>
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : editingId ? "Edit Zodiac" : "Add Zodiac"}
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
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} required />
          <input type="time" name="timeOfBirth" value={form.timeOfBirth} onChange={handleChange} required />
          <input type="text" name="placeOfBirth" placeholder="Place of Birth" value={form.placeOfBirth} onChange={handleChange} required />
          <div className="btn-group">
            <button type="submit">{editingId ? "Update" : "Calculate & Save"}</button>
            {editingId && <button type="button" className="cancel-btn" onClick={cancelEdit}>Cancel</button>}
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
            <th>Zodiac</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {zodiacs.map((z) => (
            <tr key={z._id}>
              <td data-label="Name">{z.name}</td>
              <td data-label="DOB">{z.dateOfBirth}</td>
              <td data-label="Time">{z.timeOfBirth}</td>
              <td data-label="Place">{z.placeOfBirth}</td>
              <td data-label="Zodiac">{z.zodiacSign}</td>
              <td data-label="Actions">
                <button className="edit-btn" onClick={() => handleEdit(z)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(z._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
