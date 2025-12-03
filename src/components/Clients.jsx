
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./Clients.css";

Modal.setAppElement("#root");

const API_URL = "https://adminastrotalk-1.onrender.com/api"; // 🔧 Change to your backend

export default function ClientManagement() {
  const emptyForm = {
    name: "", email: "", phone: "", dob: "", tob: "", pob: "", gender: "",
    location: "", maritalStatus: "", occupation: "", industry: "",
    notes: "", clientType: "", channel: ""
  };

  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);

  // Fetch clients
  const fetchClients = async () => {
    try {
      const res = await axios.get(`${API_URL}/clients${search ? `?search=${search}` : ""}`);
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
    }
  };

  useEffect(() => { fetchClients(); }, [search]);

  // Add / Update client
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.name) return alert("Name is required");

      if (editingId) {
        await axios.put(`${API_URL}/clients/${editingId}`, formData);
        alert("Client updated successfully");
      } else {
        await axios.post(`${API_URL}/clients`, formData);
        alert("Client added successfully");
      }

      setFormData(emptyForm);
      setEditingId(null);
      fetchClients();
    } catch (err) {
      console.error("Error saving client:", err);
      alert("Failed to save client");
    }
  };

  const handleEdit = (client) => {
    setFormData(client);
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/clients/${id}`);
      fetchClients();
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  return (
    <div className="clients-container">
      <h2>Client Management</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* --- Form --- */}
      <form className="client-form" onSubmit={handleSubmit}>
        {Object.entries({
          name: "Full Name", email: "Email", phone: "Phone", dob: "Date of Birth",
          tob: "Time of Birth", pob: "Place of Birth", location: "Location",
          maritalStatus: "Marital Status", occupation: "Occupation",
          industry: "Industry", notes: "Notes", channel: "Channel"
        }).map(([key, label]) => (
          <input
            key={key}
            type={key === "dob" ? "date" : key === "tob" ? "time" : "text"}
            placeholder={label}
            value={formData[key]}
            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
          />
        ))}

        <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <select value={formData.clientType} onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}>
          <option value="">Client Type</option>
          <option value="New">New</option>
          <option value="Repeat">Repeat</option>
          <option value="High-Value">High-Value</option>
          <option value="Dormant">Dormant</option>
        </select>

        <button type="submit">{editingId ? "Update" : "Add"} Client</button>
      </form>

      {/* --- Table --- */}
      <table className="clients-table">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>DOB</th><th>Gender</th><th>Location</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c._id}>
              <td onClick={() => setSelectedClient(c)} style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>{c.name}</td>
              <td>{c.email}</td><td>{c.phone}</td><td>{c.dob}</td><td>{c.gender}</td><td>{c.location}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- Modal --- */}
      <Modal isOpen={!!selectedClient} onRequestClose={() => setSelectedClient(null)}>
        {selectedClient && (
          <div>
            <h2>{selectedClient.name} - Profile</h2>
            {[
              ["Email", selectedClient.email],
              ["Phone", selectedClient.phone],
              ["DOB", selectedClient.dob],
              ["TOB", selectedClient.tob],
              ["POB", selectedClient.pob],
              ["Gender", selectedClient.gender],
              ["Location", selectedClient.location],
              ["Marital Status", selectedClient.maritalStatus],
              ["Occupation", selectedClient.occupation],
              ["Industry", selectedClient.industry],
              ["Notes", selectedClient.notes],
              ["Client Type", selectedClient.clientType],
              ["Channel", selectedClient.channel]
            ].map(([label, value]) => (
              <p key={label}><strong>{label}:</strong> {value || "-"}</p>
            ))}
            <button onClick={() => setSelectedClient(null)}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
