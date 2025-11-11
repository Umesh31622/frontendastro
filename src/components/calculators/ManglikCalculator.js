import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/ManglikCalculator.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

const ManglikCalculator = () => {
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [calculations, setCalculations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // form initially hidden

  // Fetch all calculations
  const fetchCalculations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/manglik`);
      setCalculations(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch calculations");
    }
  };

  useEffect(() => {
    fetchCalculations();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.dateOfBirth || !form.timeOfBirth || !form.placeOfBirth) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        // Update existing
        await axios.put(`${API_BASE}/manglik/${editId}`, form);
        setEditId(null);
      } else {
        // Create new
        await axios.post(`${API_BASE}/manglik/calculate`, form);
      }

      setForm({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
      setShowForm(false); // hide form after submission
      fetchCalculations();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (calc) => {
    setForm({
      name: calc.name,
      dateOfBirth: calc.dateOfBirth,
      timeOfBirth: calc.timeOfBirth,
      placeOfBirth: calc.placeOfBirth,
    });
    setEditId(calc._id);
    setShowForm(true); // show form when editing
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this calculation?")) return;

    try {
      await axios.delete(`${API_BASE}/manglik/${id}`);
      fetchCalculations();
    } catch (err) {
      console.error(err);
      setError("Failed to delete calculation");
    }
  };

  return (
    <div className="manglik-calculator-container">
      <h2>🔯 Manglik Calculator</h2>

      {/* Add Manglik Button */}
      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Manglik"}
      </button>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="manglik-form">
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
          <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} />
          <input type="time" name="timeOfBirth" value={form.timeOfBirth} onChange={handleChange} />
          <input type="text" name="placeOfBirth" placeholder="Place of Birth" value={form.placeOfBirth} onChange={handleChange} />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : editId ? "Update" : "Calculate"}
          </button>
        </form>
      )}

      {error && <div className="error-message">{error}</div>}

      <h3>Saved Calculations</h3>
      <table className="manglik-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Time</th>
            <th>Place</th>
            <th>Manglik</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {calculations.length === 0 && <tr><td colSpan="6">No calculations yet</td></tr>}
          {calculations.map((calc) => (
            <tr key={calc._id}>
              <td data-label="Name">{calc.name}</td>
              <td data-label="DOB">{calc.dateOfBirth}</td>
              <td data-label="Time">{calc.timeOfBirth}</td>
              <td data-label="Place">{calc.placeOfBirth}</td>
              <td data-label="Manglik">{calc.isManglik ? "Yes" : "No"}</td>
              <td data-label="Actions">
                <button onClick={() => handleEdit(calc)}>Edit</button>
                <button onClick={() => handleDelete(calc._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManglikCalculator;
