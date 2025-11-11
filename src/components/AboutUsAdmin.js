// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/AdminContent.css";

// const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

// const AboutUsAdmin = () => {
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState("");
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   // 🔹 Fetch current content from backend
//   const fetchContent = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/content/about`);
//       setContent(res.data.content || "");
//       setImage(res.data.image || "");
//       setPreview(res.data.image || "");
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // 🔹 Convert uploaded file to base64
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//       setImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // 🔹 Save About Us Content
//   const handleSave = async () => {
//     if (!content.trim()) return alert("Please write some content!");
//     try {
//       setLoading(true);
//       await axios.post(`${API_BASE}/content/about`, { content, image });
//       alert("✅ About Us updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error updating About Us.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="admin-content-page">
//       <h2>🪐 Edit “About Us” Section</h2>

//       <label className="admin-label">About Us Description</label>
//       <textarea
//         rows="10"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//         placeholder="Write About Us content..."
//       ></textarea>

//       <label className="admin-label">Upload Image (Optional)</label>
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//       />

//       {preview && (
//         <div className="image-preview">
//           <img src={preview} alt="Preview" />
//         </div>
//       )}

//       <button onClick={handleSave} disabled={loading}>
//         {loading ? "Saving..." : "Save Changes"}
//       </button>
//     </div>
//   );
// };

// export default AboutUsAdmin;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AdminContent.css";

const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

export default function AboutUsAdmin() {
  const [title, setTitle] = useState("About Us");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch existing About Us content
  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/about`);
      if (res.data) {
        setTitle(res.data.title || "About Us");
        setContent(res.data.content || "");
        setPreview(res.data.image || "");
      }
    } catch (err) {
      console.error("❌ Error fetching About data:", err.message);
    }
  };

  // 🔹 Handle image upload (preview before save)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  // 🔹 Save / Update About Us Data
  const handleSave = async () => {
    if (!content.trim()) return alert("⚠️ Please enter About Us content!");

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (file) formData.append("file", file);

      await axios.post(`${API_BASE}/about`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ About Us updated successfully!");
      fetchAboutData();
      setFile(null);
    } catch (err) {
      console.error("❌ Error updating About:", err.message);
      alert("❌ Failed to update About Us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-content-page">
      <h2>🪐 Edit “About Us” Section</h2>

      <label className="admin-label">Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title (e.g., About Us)"
        className="admin-input"
      />

      <label className="admin-label">Description</label>
      <textarea
        rows="8"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write About Us content..."
        className="admin-textarea"
      ></textarea>

      <label className="admin-label">Upload Image (Optional)</label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" />
        </div>
      )}

      <button className="save-btn" onClick={handleSave} disabled={loading}>
        {loading ? "Saving..." : "💾 Save Changes"}
      </button>
    </div>
  );
}
