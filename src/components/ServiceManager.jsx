import React, { useState, useEffect } from "react";
import { serviceApi } from "../api";

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: 0, timeline: "" });

  const fetchServices = async () => {
    const res = await serviceApi.get("/");
    setServices(res.data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await serviceApi.post("/", form);
    setForm({ title: "", description: "", price: 0, timeline: "" });
    fetchServices();
  };

  const handleDelete = async (id) => {
    await serviceApi.delete(`/${id}`);
    fetchServices();
  };

  return (
    <div>
      <h2>Services</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Timeline" value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} />
        <button type="submit">Add Service</button>
      </form>

      <ul>
        {services.map(s => (
          <li key={s._id}>
            {s.title} - {s.price} - {s.timeline}
            <button onClick={() => handleDelete(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
