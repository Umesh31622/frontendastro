
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./KnowMoreAdmin.css";

const API = "https://adminastrotalk-1.onrender.com/api/know-more";

const KnowMoreAdmin = () => {
  const [title, setTitle] = useState("");
  const [pdf, setPdf] = useState(null);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);

  // For Editing
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPdf, setEditPdf] = useState(null);

  // Fetch PDFs
  const fetchPDFs = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data.data || []);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchPDFs();
  }, []);

  /* --------------------------
      CREATE → Upload New PDF
  --------------------------- */
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!pdf) return alert("Please upload a PDF.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf", pdf);

    try {
      await axios.post(`${API}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg("PDF Uploaded Successfully!");
      setTitle("");
      setPdf(null);
      fetchPDFs();
    } catch (err) {
      console.log(err);
      setMsg("Upload Failed!");
    }
  };

  /* --------------------------
      DELETE PDF
  --------------------------- */
  const deletePDF = async (id) => {
    if (!window.confirm("Are you sure? This will delete from Cloudinary also.")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchPDFs();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  /* --------------------------
      LOAD DATA FOR EDITING
  --------------------------- */
  const startEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditPdf(null);
  };

  /* --------------------------
      UPDATE PDF SECTION
  --------------------------- */
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editId) return;

    const formData = new FormData();
    formData.append("title", editTitle);
    if (editPdf) formData.append("pdf", editPdf);

    try {
      await axios.put(`${API}/${editId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Updated Successfully");
      setEditId(null);
      setEditTitle("");
      setEditPdf(null);
      fetchPDFs();

    } catch (err) {
      console.log("Update Error:", err);
    }
  };

  return (
    <div className="km-wrapper">
      <h1 className="km-title">📘 Know More – PDF Manager</h1>

      {/* Upload Section */}
      <form className="km-upload-card" onSubmit={handleUpload}>
        <h3>Upload New PDF</h3>

        <input
          type="text"
          className="km-input"
          placeholder="Enter PDF Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="file"
          className="km-input"
          accept="application/pdf"
          required
          onChange={(e) => setPdf(e.target.files[0])}
        />

        <button className="km-upload-btn">Upload PDF</button>
        {msg && <p className="km-msg">{msg}</p>}
      </form>

      {/* EDIT Section */}
      {editId && (
        <form className="km-upload-card" onSubmit={handleUpdate}>
          <h3>Edit PDF</h3>

          <input
            type="text"
            className="km-input"
            placeholder="Update Title"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <input
            type="file"
            className="km-input"
            accept="application/pdf"
            onChange={(e) => setEditPdf(e.target.files[0])}
          />

          <button className="km-upload-btn">Update PDF</button>
        </form>
      )}

      {/* PDF List */}
      <h2 className="km-subtitle">Uploaded PDFs</h2>

      <div className="km-list-wrapper">
        {data.length === 0 ? (
          <p className="km-empty">No PDFs uploaded yet.</p>
        ) : (
          data.map((item) => (
            <div className="km-item" key={item._id}>
              <div className="km-info">
                <strong>{item.title}</strong>
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="km-view"
                >
                  View PDF
                </a>
              </div>

              <div className="km-actions">
                <button className="km-edit-btn" onClick={() => startEdit(item)}>
                  Edit
                </button>

                <button className="km-delete-btn" onClick={() => deletePDF(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default KnowMoreAdmin;
