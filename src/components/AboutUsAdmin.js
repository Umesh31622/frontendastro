// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/AdminContent.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

// export default function AboutUsAdmin() {
//   const [title, setTitle] = useState("About Us");
//   const [content, setContent] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch existing About Us content
//   useEffect(() => {
//     fetchAboutData();
//   }, []);

//   const fetchAboutData = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/about`);
//       if (res.data) {
//         setTitle(res.data.title || "About Us");
//         setContent(res.data.content || "");
//         setPreview(res.data.image || "");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching About data:", err.message);
//     }
//   };

//   // 🔹 Handle image upload (preview before save)
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setFile(file);
//     setPreview(URL.createObjectURL(file));
//   };

//   // 🔹 Save / Update About Us Data
//   const handleSave = async () => {
//     if (!content.trim()) return alert("⚠️ Please enter About Us content!");

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       if (file) formData.append("file", file);

//       await axios.post(`${API_BASE}/about`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("✅ About Us updated successfully!");
//       fetchAboutData();
//       setFile(null);
//     } catch (err) {
//       console.error("❌ Error updating About:", err.message);
//       alert("❌ Failed to update About Us.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-content-page">
//       <h2>🪐 Edit “About Us” Section</h2>

//       <label className="admin-label">Title</label>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter title (e.g., About Us)"
//         className="admin-input"
//       />

//       <label className="admin-label">Description</label>
//       <textarea
//         rows="8"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Write About Us content..."
//         className="admin-textarea"
//       ></textarea>

//       <label className="admin-label">Upload Image (Optional)</label>
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       {preview && (
//         <div className="image-preview">
//           <img src={preview} alt="Preview" />
//         </div>
//       )}

//       <button className="save-btn" onClick={handleSave} disabled={loading}>
//         {loading ? "Saving..." : "💾 Save Changes"}
//       </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AboutUsAdmin.css";

export default function AboutUsAdmin() {
  const BASE_URL = "https://adminastrotalk-1.onrender.com/api/about";

  const [about, setAbout] = useState(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Load single about
  const loadAbout = async () => {
    try {
      const res = await axios.get(BASE_URL);
      const data = res.data.data || res.data;
      setAbout(data);

      setTitle(data.title || "");
      setContent(data.content || "");
      setPreview(data.image || "");
    } catch (err) {
      console.log("Error loading:", err.message);
    }
  };

  useEffect(() => {
    loadAbout();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const saveAbout = async () => {
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", content);
      if (file) fd.append("file", file);

      await axios.post(BASE_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Saved successfully!");
      setShowModal(false);
      loadAbout();
    } catch (err) {
      alert("Error saving");
    }
  };

  const deleteAbout = async () => {
    if (!window.confirm("Delete About Us?")) return;

    try {
      await axios.delete(BASE_URL);
      alert("Deleted");
      setAbout(null);
    } catch (err) {
      alert("Delete failed");
    }
  };

  const onFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <div className="about-admin-container">
      <h2 className="admin-title">📄 About Us — Admin</h2>

      <button className="add-btn" onClick={openModal}>
        {about ? "✏ Edit" : "➕ Add New"}
      </button>

      {/* TABLE */}
      {about ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description (Preview)</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>{about.title}</td>
              <td>
                {(about.content || "").slice(0, 100)}
                {(about.content || "").length > 100 && "..."}
              </td>
              <td>
                <img
                  src={about.image}
                  alt=""
                  className="table-image"
                />
              </td>
              <td>
                <button className="edit-btn" onClick={openModal}>✏ Edit</button>
                <button className="delete-btn" onClick={deleteAbout}>🗑 Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No About data found.</p>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-bg" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>{about ? "Edit About" : "Add About"}</h3>

            <label>Title</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label>Description</label>
            <textarea
              className="textarea"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <label>Image</label>
            <input type="file" onChange={onFileChange} />

            {preview && (
              <img src={preview} className="preview-image" />
            )}

            <div className="modal-actions">
              <button className="save-btn" onClick={saveAbout}>
                💾 Save
              </button>
              <button className="cancel-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

