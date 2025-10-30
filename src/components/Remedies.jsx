import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Remedies.css";

export default function Remedies({ token }) {
  const API_URL = "https://adminastrotalk-1.onrender.com/api/remedies";

  const [remedies, setRemedies] = useState([]);
  const [editingRemedy, setEditingRemedy] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    email: "",
    remedyType: "Gemstone",
    description: "",
    status: "Pending",
    file: null,
  });
  const [search, setSearch] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  // Fetch remedies with optional search
  const fetchRemedies = async () => {
    try {
      const res = await axios.get(`${API_URL}${search ? `?search=${search}` : ""}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setRemedies(res.data);
    } catch (err) {
      console.error("Error fetching remedies:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchRemedies();
  }, [search]);

  // Add or Update Remedy
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.clientName || !formData.email) {
      return alert("Client Name and Email are required");
    }

    const data = new FormData();
    data.append("clientName", formData.clientName);
    data.append("email", formData.email);
    data.append("remedyType", formData.remedyType);
    data.append("description", formData.description);
    data.append("status", formData.status);
    if (formData.file) data.append("file", formData.file);

    try {
      if (editingRemedy) {
        await axios.put(`${API_URL}/${editingRemedy._id}`, data, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        alert("✅ Remedy updated successfully");
        setEditingRemedy(null);
      } else {
        await axios.post(API_URL, data, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        alert("✅ Remedy added successfully");
      }

      // Reset form
      setFormData({ clientName: "", email: "", remedyType: "Gemstone", description: "", status: "Pending", file: null });
      setSelectedFileName("");
      fetchRemedies();
    } catch (err) {
      console.error("Error saving remedy:", err.response?.data || err.message);
      alert("❌ " + (err.response?.data?.message || err.message));
    }
  };

  // Edit remedy
  const handleEdit = (remedy) => {
    setEditingRemedy(remedy);
    setFormData({
      clientName: remedy.clientName,
      email: remedy.email,
      remedyType: remedy.remedyType,
      description: remedy.description,
      status: remedy.status,
      file: null,
    });
    setSelectedFileName("");
  };

  // Delete remedy
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this remedy?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("✅ Remedy deleted successfully");
      fetchRemedies();
    } catch (err) {
      console.error("Error deleting remedy:", err.response?.data || err.message);
      alert("❌ " + (err.response?.data?.message || err.message));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });
    setSelectedFileName(file ? file.name : "");
  };

  const statusBadge = (status) => (status === "Pending" ? "badge pending" : "badge completed");

  return (
    <div className="remedies-container">
      <h2>Remedies Management</h2>

      <input
        type="text"
        placeholder="Search by client name..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form className="remedy-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Client Name"
          value={formData.clientName}
          required
          onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
        />
        <input
          type="email"
          placeholder="Client Email"
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <select value={formData.remedyType} onChange={(e) => setFormData({ ...formData, remedyType: e.target.value })}>
          <option value="Gemstone">Gemstone</option>
          <option value="Yantra">Yantra</option>
          <option value="Mantra">Mantra</option>
          <option value="Homa">Homa</option>
          <option value="Rahu Yantra">Rahuu Yantra</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        {selectedFileName && <p className="file-preview">Selected File: {selectedFileName}</p>}
        <button type="submit">{editingRemedy ? "Update" : "Add"} Remedy</button>
      </form>

      <div className="table-responsive">
        <table className="remedies-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {remedies.length > 0 ? (
              remedies.map((r) => (
                <tr key={r._id}>
                  <td>{r.clientName}</td>
                  <td>{r.email}</td>
                  <td>{r.remedyType}</td>
                  <td>{r.description}</td>
                  <td>
                    <span className={statusBadge(r.status)}>{r.status}</span>
                  </td>
                  <td>
                    {r.fileUrl ? (
                      <a href={`https://adminastrotalk-1.onrender.com${r.fileUrl}`} target="_blank" rel="noreferrer">
                        View File
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(r)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(r._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No remedies found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
