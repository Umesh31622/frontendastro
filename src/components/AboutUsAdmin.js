// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/AboutUsAdmin.css";

// export default function AboutUsAdmin() {
//   const BASE_URL = "https://adminastrotalk-1.onrender.com/api/about";

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState("");
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState("");

//   // Load data from backend
//   const loadAbout = async () => {
//     try {
//       const res = await axios.get(BASE_URL);
//       const data = res.data.data || res.data;

//       setTitle(data.title || "");
//       setContent(data.content || "");
//       setImage(data.image || "");
//       setPreview(data.image || "");
//     } catch (err) {
//       console.log("Error loading:", err.message);
//     }
//   };

//   useEffect(() => {
//     loadAbout();
//   }, []);

//   // Save/Update
//   const saveAbout = async () => {
//     try {
//       const fd = new FormData();
//       fd.append("title", title);
//       fd.append("content", content);
//       if (file) fd.append("file", file);  // backend expects "file"

//       await axios.post(BASE_URL, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("Saved successfully!");
//       loadAbout();
//     } catch (err) {
//       alert("Error saving");
//       console.log(err);
//     }
//   };

//   // Delete
//   const deleteAbout = async () => {
//     if (!window.confirm("Delete About Us?")) return;

//     try {
//       await axios.delete(BASE_URL);

//       setTitle("");
//       setContent("");
//       setImage("");
//       setPreview("");

//       alert("Deleted");
//     } catch (err) {
//       alert("Delete failed");
//     }
//   };

//   // Image preview
//   const onFileChange = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

//   return (
//     <div className="about-admin-container">
//       <h2 className="admin-title">📄 About Us — Admin</h2>

//       <label>Title</label>
//       <input
//         className="simple-input"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Enter title"
//       />

//       <label>Description</label>
//       <textarea
//         className="simple-textarea"
//         rows="5"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Enter description"
//       />

//       <label>Image</label>
//       <input type="file" onChange={onFileChange} />

//       {preview && (
//         <img src={preview} className="simple-preview" alt="About" />
//       )}

//       <div className="btn-row">
//         <button className="save-btn" onClick={saveAbout}>💾 Save</button>
//         <button className="delete-btn" onClick={deleteAbout}>🗑 Delete</button>
//       </div>
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
