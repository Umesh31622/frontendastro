import React, { useEffect, useState } from "react";
import { serviceApi } from "../api/api";

export default function Services({ token }) {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    timeline: "",
    media: null, // for file upload
  });

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await serviceApi.get("/", { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) setServices(res.data.services);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (editingService) {
        await serviceApi.put(`/${editingService._id}`, data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setEditingService(null);
      } else {
        await serviceApi.post("/", data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }
      setFormData({ name: "", description: "", price: "", timeline: "", media: null });
      fetchServices();
    } catch (err) {
      console.error("Failed to submit service:", err);
    }
  };

  // Populate form for editing
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price || "",
      timeline: service.timeline || "",
      media: null,
    });
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await serviceApi.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  return (
    <div className="services-container">
      <h2>Services</h2>

      {/* Service Form */}
      <form className="service-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service Name"
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Timeline"
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFormData({ ...formData, media: e.target.files })}
        />

        {/* Show current files if editing */}
        {editingService && editingService.media && editingService.media.length > 0 && (
          <div className="current-files">
            {editingService.media.map((file, idx) => (
              <a
                key={idx}
                href={`https://adminastrotalk-1.onrender.com/${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📎 View File {idx + 1}
              </a>
            ))}
          </div>
        )}

        <button type="submit">{editingService ? "Update" : "Add"} Service</button>
      </form>

      {/* Services Table */}
      <table className="services-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Timeline</th>
            <th>Media</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.description}</td>
              <td>₹{s.price || "N/A"}</td>
              <td>{s.timeline || "N/A"}</td>
              <td>
                {s.media && s.media.length > 0 ? (
                  s.media.map((file, idx) => (
                    <a
                      key={idx}
                      href={`https://adminastrotalk-1.onrender.com/${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      📎 File {idx + 1}
                    </a>
                  ))
                ) : (
                  <span>No file uploaded</span>
                )}
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .services-container {
          max-width: 1000px;
          margin: 20px auto;
          padding: 20px;
          background: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        h2 { text-align: center; margin-bottom: 20px; color: #1f2937; }
        .service-form {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .service-form input, .service-form button {
          flex: 1 1 200px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #d1d5db;
        }
        .service-form button {
          flex: 1 1 100px;
          background-color: #3b82f6;
          color: white;
          border: none;
          cursor: pointer;
        }
        .service-form button:hover { background-color: #2563eb; }
        .current-files a {
          display: block;
          margin: 5px 0;
          color: #2563eb;
        }
        .services-table {
          width: 100%;
          border-collapse: collapse;
        }
        .services-table th, .services-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .services-table th { background-color: #f3f4f6; }
        .file-link { display: block; color: #2563eb; }
        .edit-btn { background-color: #10b981; color: white; border: none; padding: 5px 10px; margin-right: 5px; cursor: pointer; }
        .delete-btn { background-color: #ef4444; color: white; border: none; padding: 5px 10px; cursor: pointer; }
        .edit-btn:hover, .delete-btn:hover { opacity: 0.85; }

        @media (max-width: 768px) {
          .service-form { flex-direction: column; }
          .service-form input, .service-form button { flex: 1 1 100%; }
        }
      `}</style>
    </div>
  );
}
