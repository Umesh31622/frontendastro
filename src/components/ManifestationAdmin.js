import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManifestationAdmin() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const API_URL = "https://adminastrotalk-1.onrender.com/api/manifestation";

  const [form, setForm] = useState({
    label: "",
    description: "",
    fullDesc: "",
    deliverable: "",
    category: "manifestation",
  });

  // FETCH ALL FROM BACKEND
  const fetchServices = async () => {
    const res = await axios.get(`${API_URL}/all`);
    if (res.data.status) {
      const combined = [
        ...res.data.manifestation.map((s) => ({ ...s, type: "Manifestation" })),
        ...res.data.wellbeing.map((s) => ({ ...s, type: "Well-being" })),
      ];

      setServices(combined);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // SUBMIT HANDLER (ADD + UPDATE)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE
      const res = await axios.put(`${API_URL}/update/${editingId}`, form);
      if (res.data.status) {
        alert("Updated Successfully!");
        setEditingId(null);
        resetForm();
        fetchServices();
      }
    } else {
      // ADD NEW
      const res = await axios.post(`${API_URL}/add`, form);
      if (res.data.status) {
        alert("Added Successfully!");
        resetForm();
        fetchServices();
      }
    }
  };

  // DELETE ENTRY
  const deleteService = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchServices();
  };

  // EDIT HANDLER
  const editService = (s) => {
    setEditingId(s._id);
    setForm({
      label: s.label,
      description: s.description,
      fullDesc: s.fullDesc,
      deliverable: s.deliverable,
      category: s.category,
    });
  };

  // RESET FORM
  const resetForm = () => {
    setForm({
      label: "",
      description: "",
      fullDesc: "",
      deliverable: "",
      category: "manifestation",
    });
  };

  return (
    <div>
      <h2>Manifestation & Well-being Admin Panel</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          style={{ padding: "8px" }}
        >
          <option value="manifestation">Manifestation</option>
          <option value="well-being">Well-being</option>
        </select>

        <input
          type="text"
          placeholder="Label"
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Short Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <textarea
          placeholder="Full Description"
          value={form.fullDesc}
          onChange={(e) => setForm({ ...form, fullDesc: e.target.value })}
          required
        ></textarea>

        <input
          type="text"
          placeholder="Deliverable (PDF / Call / Session)"
          value={form.deliverable}
          onChange={(e) => setForm({ ...form, deliverable: e.target.value })}
          required
        />

        <button type="submit">
          {editingId ? "Update" : "Add New"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              resetForm();
            }}
            style={{ marginLeft: "10px", background: "#777" }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* TABLE */}
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Category</th>
            <th>Label</th>
            <th>Description</th>
            <th>Deliverable</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td>{s.category}</td>
              <td>{s.label}</td>
              <td>{s.description}</td>
              <td>{s.deliverable}</td>

              <td>
                <button
                  onClick={() => editService(s)}
                  style={{ color: "blue", marginRight: "10px" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(s._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
