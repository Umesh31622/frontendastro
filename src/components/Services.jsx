
import React, { useEffect, useState } from "react";
import { serviceApi } from "../api/api";

export default function Services({ token }) {
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({
    name: "",
    description: "",
    price: "",
    timeline: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [files, setFiles] = useState([]);
  const [modal, setModal] = useState({ open: false, type: "", src: "" });

  const backendURL = "https://adminastrotalk-1.onrender.com/"; // Update if needed

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await serviceApi.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) setServices(res.data.services);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form inputs
  const handleChange = (e) =>
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });

  // Handle multiple file selection (convert FileList → Array)
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", serviceData.name);
      formData.append("description", serviceData.description);
      formData.append("price", serviceData.price);
      formData.append("timeline", serviceData.timeline);

      // Append all selected files
      files.forEach((file) => formData.append("media", file));

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (editingId) {
        await serviceApi.put(`/${editingId}`, formData, config);
        setEditingId(null);
      } else {
        await serviceApi.post("/", formData, config);
      }

      setServiceData({ name: "", description: "", price: "", timeline: "" });
      setFiles([]);
      fetchServices();
    } catch (err) {
      console.error("Error submitting service:", err);
    }
  };

  // Edit existing service
  const handleEdit = (s) => {
    setServiceData({
      name: s.name,
      description: s.description,
      price: s.price || "",
      timeline: s.timeline || "",
    });
    setEditingId(s._id);
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await serviceApi.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices();
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  // Modal control
  const openModal = (type, src) => setModal({ open: true, type, src });
  const closeModal = () => setModal({ open: false, type: "", src: "" });

  return (
    <div className="container">
      <h2>Services Management</h2>

      {/* Service Form */}
      <form className="form-box" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Service Name"
          value={serviceData.name}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={serviceData.description}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          placeholder="Price"
          value={serviceData.price}
          onChange={handleChange}
        />
        <input
          name="timeline"
          placeholder="Timeline"
          value={serviceData.timeline}
          onChange={handleChange}
        />
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>

      {/* Services Table */}
      <div className="table-container">
        <table>
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
            {services.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No services available
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.description}</td>
                  <td>₹{s.price || "N/A"}</td>
                  <td>{s.timeline || "N/A"}</td>
                  <td className="media-cell">
                    {s.media?.map((m, idx) => {
                      // Ensure proper path
                      const filePath = m.startsWith("/uploads/")
                        ? `${backendURL}${m}`
                        : `${backendURL}/uploads/${m}`;

                      const ext = filePath.split(".").pop().toLowerCase();

                      if (["jpg", "jpeg", "png", "gif"].includes(ext))
                        return (
                          <img
                            key={idx}
                            src={filePath}
                            alt="media"
                            onClick={() => openModal("image", filePath)}
                          />
                        );

                      if (["mp4", "webm"].includes(ext))
                        return (
                          <button
                            key={idx}
                            onClick={() => openModal("video", filePath)}
                          >
                            Video
                          </button>
                        );

                      if (["mp3", "wav"].includes(ext))
                        return (
                          <button
                            key={idx}
                            onClick={() => openModal("audio", filePath)}
                          >
                            Audio
                          </button>
                        );

                      return (
                        <a
                          key={idx}
                          href={filePath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          File
                        </a>
                      );
                    })}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {modal.type === "image" && <img src={modal.src} alt="media" />}
            {modal.type === "video" && (
              <video src={modal.src} controls autoPlay />
            )}
            {modal.type === "audio" && (
              <audio src={modal.src} controls autoPlay />
            )}
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        .container {
          max-width: 1100px;
          margin: 20px auto;
          padding: 20px;
          background: #f9fafb;
          border-radius: 10px;
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .form-box {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .form-box input,
        .form-box button {
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #d1d5db;
        }
        .form-box button {
          background-color: #3b82f6;
          color: white;
          border: none;
          cursor: pointer;
        }
        .form-box button:hover {
          background-color: #2563eb;
        }
        .table-container {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          padding: 10px;
          border: 1px solid #d1d5db;
          text-align: left;
        }
        .media-cell img {
          max-width: 50px;
          cursor: pointer;
          margin-right: 5px;
          border-radius: 5px;
        }
        .edit-btn {
          background-color: #10b981;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          margin-right: 5px;
        }
        .delete-btn {
          background-color: #ef4444;
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          position: relative;
          max-width: 90%;
          max-height: 90%;
          overflow: auto;
        }
        .modal-content img,
        .modal-content video,
        .modal-content audio {
          max-width: 100%;
          max-height: 80vh;
          display: block;
          margin: 0 auto;
        }
        .close {
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .form-box {
            flex-direction: column;
          }
          .form-box input,
          .form-box button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
