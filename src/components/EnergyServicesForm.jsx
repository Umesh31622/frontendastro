import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EnergyServicesForm() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    key: "",
    title: "",
    short: "",
    desc: "",
    price: "",
    tag: "",
  });

  const API_URL = "https://adminastrotalk-1.onrender.com/api/energy-services";

  // FETCH ALL SERVICES
  const fetchServices = async () => {
    const res = await axios.get(`${API_URL}/all`);
    if (res.data.status) setServices(res.data.services);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // HANDLE FORM SUBMIT — CREATE + UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // UPDATE SERVICE
      const res = await axios.put(`${API_URL}/update/${editingId}`, form);
      if (res.data.status) {
        alert("Service Updated ✔");
        setEditingId(null);
        setForm({
          key: "",
          title: "",
          short: "",
          desc: "",
          price: "",
          tag: "",
        });
        fetchServices();
      }
    } else {
      // CREATE SERVICE
      const res = await axios.post(`${API_URL}/add`, form);
      if (res.data.status) {
        alert("Service Added ✔");
        setForm({
          key: "",
          title: "",
          short: "",
          desc: "",
          price: "",
          tag: "",
        });
        fetchServices();
      }
    }
  };

  // DELETE SERVICE
  const deleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await axios.delete(`${API_URL}/delete/${id}`);
    fetchServices();
  };

  // EDIT SERVICE — Prefill form
  const editService = (s) => {
    setEditingId(s._id);
    setForm({
      key: s.key,
      title: s.title,
      short: s.short,
      desc: s.desc,
      price: s.price,
      tag: s.tag,
    });
  };

  return (
    <div>
      <h2>Energy Services - Full CRUD</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Unique Key"
          value={form.key}
          onChange={(e) => setForm({ ...form, key: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Short Description"
          value={form.short}
          onChange={(e) => setForm({ ...form, short: e.target.value })}
          required
        />
        <textarea
          placeholder="Full Description"
          value={form.desc}
          onChange={(e) => setForm({ ...form, desc: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Tag"
          value={form.tag}
          onChange={(e) => setForm({ ...form, tag: e.target.value })}
        />

        <button type="submit" style={{ marginRight: "10px" }}>
          {editingId ? "Update Service" : "Add Service"}
        </button>

        {/* CANCEL EDIT BUTTON */}
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                key: "",
                title: "",
                short: "",
                desc: "",
                price: "",
                tag: "",
              });
            }}
            style={{ background: "gray", color: "white" }}
          >
            Cancel Edit
          </button>
        )}
      </form>

      {/* TABLE */}
      <h3>All Services</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Key</th>
            <th>Title</th>
            <th>Short</th>
            <th>Price</th>
            <th>Tag</th>
            <th>Actions</th> {/* Edit + Delete in SAME BOX */}
          </tr>
        </thead>

        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td>{s.key}</td>
              <td>{s.title}</td>
              <td>{s.short}</td>
              <td>₹{s.price}</td>
              <td>{s.tag}</td>

              {/* EDIT + DELETE SAME CELL */}
              <td style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => editService(s)}
                  style={{
                    padding: "4px 10px",
                    background: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteService(s._id)}
                  style={{
                    padding: "4px 10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
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
