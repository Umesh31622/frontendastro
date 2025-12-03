import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://adminastrotalk-1.onrender.com/api/contact";

export default function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Load Data
  const loadData = async () => {
    try {
      const res = await axios.get(API);
      if (res.data.success) setMessages(res.data.messages);
    } catch (err) {
      console.error("Loading error:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Form Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create
  const handleCreate = async () => {
    try {
      const res = await axios.post(API, form);
      if (res.data.success) {
        loadData();
        resetForm();
      }
    } catch (err) {
      console.error("Create failed:", err);
    }
  };

  // Update
  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/${editing}`, form);
      resetForm();
      loadData();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // Delete
  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      loadData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Edit → Open form + fill data
  const editMsg = (msg) => {
    setEditing(msg._id);
    setShowForm(true); // open the form
    setForm({
      fullName: msg.fullName,
      email: msg.email,
      phone: msg.phone,
      service: msg.service,
      message: msg.message,
    });
  };

  // Reset Form
  const resetForm = () => {
    setEditing(null);
    setShowForm(false); // hide form
    setForm({
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <div className="card">
      <h2>📩 Contact Messages</h2>

      {/* Add New Message Button */}
      <button
        className="add-btn"
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        style={{
          marginBottom: "15px",
          padding: "8px 18px",
          background: "#4f46e5",
          color: "#fff",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
        }}
      >
        ➕ Add New Message
      </button>

      {/* Show/Hide Form */}
      {showForm && (
        <div className="crud-form" style={{ marginBottom: "25px" }}>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <select name="service" value={form.service} onChange={handleChange}>
            <option value="">Select Service</option>
            <option value="love">Love & Relationship</option>
            <option value="career">Career Astrology</option>
            <option value="vastu">Vastu Consultation</option>
            <option value="numerology">Numerology Reading</option>
          </select>

          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
          />

          <button onClick={editing ? handleUpdate : handleCreate}>
            {editing ? "Update Message" : "Save Message"}
          </button>

          <button onClick={resetForm} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      )}

      {/* Table */}
      <table className="crud-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Service</th>
            <th>Message</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {messages.length ? (
            messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.fullName}</td>
                <td>{msg.email}</td>
                <td>{msg.phone}</td>
                <td>{msg.service}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => editMsg(msg)}>✏️</button>
                  <button onClick={() => deleteMsg(msg._id)}>🗑</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No messages found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
