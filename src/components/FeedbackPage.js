
// import React, { useEffect, useState } from "react";
// import api from "../api";

// export default function FeedbackPage() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [form, setForm] = useState({ name: "", email: "", message: "", rating: 5 });
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("token"); // admin token if logged in

//   // Fetch all feedbacks
//   const fetchFeedbacks = async () => {
//     setLoading(true);
//     try {
//       const route = token ? "/feedbacks" : "/feedbacks/public";
//       const data = await api.get(route);
//       setFeedbacks(Array.isArray(data) ? data : data.feedbacks || []);
//       setMsg("");
//     } catch (err) {
//       console.error("Error fetching feedbacks:", err);
//       setMsg("❌ Failed to load feedbacks.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   // Form input changes
//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   // Submit new feedback
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/feedbacks", form);
//       setMsg("✅ Feedback submitted successfully!");
//       setForm({ name: "", email: "", message: "", rating: 5 });
//       fetchFeedbacks();
//     } catch (err) {
//       console.error("Error submitting feedback:", err);
//       setMsg("❌ Error submitting feedback");
//     }
//   };

//   // Delete feedback (admin only)
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this feedback?")) return;
//     try {
//       await api.delete(`/feedbacks/${id}`);
//       fetchFeedbacks();
//       setMsg("✅ Feedback deleted successfully");
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Failed to delete feedback");
//     }
//   };

//   // Toggle publish status (admin only)
//   const handleTogglePublish = async (id) => {
//     try {
//       await api.patch(`/feedbacks/${id}/publish`);
//       fetchFeedbacks();
//       setMsg("✅ Feedback publish status updated");
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Failed to update publish status");
//     }
//   };

//   // Update feedback tags (admin only)
//   const handleTag = async (id, tags) => {
//     try {
//       await api.patch(`/feedbacks/${id}/tag`, { tags: tags.split(",").map(t => t.trim()) });
//       fetchFeedbacks();
//       setMsg("✅ Tags updated");
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Failed to update tags");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
//       <h2>Feedback Management</h2>
//       {msg && <p>{msg}</p>}

//       {/* Add Feedback Form */}
//       <form
//         onSubmit={handleSubmit}
//         style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}
//       >
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//           required
//           style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//         <input
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           placeholder="Email"
//           type="email"
//           required
//           style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//         <textarea
//           name="message"
//           value={form.message}
//           onChange={handleChange}
//           placeholder="Message"
//           required
//           rows={4}
//           style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//         />
//         <select
//           name="rating"
//           value={form.rating}
//           onChange={handleChange}
//           style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
//         >
//           {[1, 2, 3, 4, 5].map((r) => (
//             <option key={r} value={r}>
//               {r} Star{r > 1 && "s"}
//             </option>
//           ))}
//         </select>
//         <button
//           type="submit"
//           style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}
//         >
//           Submit
//         </button>
//       </form>

//       {/* Feedback List */}
//       <h3>All Feedbacks</h3>
//       {loading ? (
//         <p>Loading feedbacks...</p>
//       ) : feedbacks.length === 0 ? (
//         <p>No feedback found.</p>
//       ) : (
//         feedbacks.map((fb) => (
//           <div
//             key={fb._id}
//             style={{
//               padding: "15px",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//               marginBottom: "10px",
//               backgroundColor: "#f8fafc",
//             }}
//           >
//             <p>
//               <strong>{fb.name}</strong> ({fb.email})
//             </p>
//             <p>{fb.message}</p>
//             <p>Rating: {fb.rating}⭐</p>
//             <small>{new Date(fb.createdAt).toLocaleString()}</small>

//             {token && (
//               <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
//                 <button onClick={() => handleDelete(fb._id)} style={{ padding: "5px 10px", backgroundColor: "#ef4444", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
//                   Delete
//                 </button>
//                 <button onClick={() => handleTogglePublish(fb._id)} style={{ padding: "5px 10px", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
//                   {fb.isPublished ? "Unpublish" : "Publish"}
//                 </button>
//                 <input
//                   type="text"
//                   placeholder="Tags comma separated"
//                   defaultValue={fb.tags?.join(", ")}
//                   onBlur={(e) => handleTag(fb._id, e.target.value)}
//                   style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
//                 />
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }



// import React, { useState, useEffect } from "react";
// import api from "../api/api";
// import "../styles/Feedback.css";


// const FeedbackPage = () => {
//   const [form, setForm] = useState({ name: "", email: "", message: "", rating: 5 });
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [msg, setMsg] = useState("");

//   const fetchFeedbacks = async () => {
//     try {
//       const res = await api.get("/feedbacks/public");
//       setFeedbacks(res.data);
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Failed to load feedbacks");
//     }
//   };

//   useEffect(() => {
//     fetchFeedbacks();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         // Update feedback
//         await api.put(`/feedbacks/${editingId}`, form);
//         setMsg("✅ Feedback updated!");
//       } else {
//         // Create new feedback
//         await api.post("/feedbacks", form);
//         setMsg("✅ Feedback submitted!");
//       }
//       setForm({ name: "", email: "", message: "", rating: 5 });
//       setEditingId(null);
//       fetchFeedbacks();
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Error submitting feedback");
//     }
//   };

//   const handleEdit = (feedback) => {
//     setEditingId(feedback._id);
//     setForm({
//       name: feedback.name,
//       email: feedback.email,
//       message: feedback.message,
//       rating: feedback.rating,
//     });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this feedback?")) return;
//     try {
//       await api.delete(`/feedbacks/${id}`);
//       setMsg("🗑️ Feedback deleted");
//       fetchFeedbacks();
//     } catch (err) {
//       console.error(err);
//       setMsg("❌ Error deleting feedback");
//     }
//   };

//   return (
//     <div className="feedback-container">
//       <h2>💬 Feedback Management</h2>

//       <form onSubmit={handleSubmit} className="feedback-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name"
//           value={form.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email (optional)"
//           value={form.email}
//           onChange={handleChange}
//         />
//         <textarea
//           name="message"
//           placeholder="Your Feedback"
//           value={form.message}
//           onChange={handleChange}
//           required
//         ></textarea>
//         <select name="rating" value={form.rating} onChange={handleChange}>
//           {[1, 2, 3, 4, 5].map((r) => (
//             <option key={r} value={r}>
//               {r} ⭐
//             </option>
//           ))}
//         </select>
//         <button type="submit">
//           {editingId ? "Update Feedback" : "Submit Feedback"}
//         </button>
//       </form>

//       {msg && <p className="msg">{msg}</p>}

//       <div className="feedback-list">
//         {feedbacks.map((fb) => (
//           <div key={fb._id} className="feedback-card">
//             <h4>{fb.name}</h4>
//             <p>{fb.message}</p>
//             <p>Rating: {fb.rating}⭐</p>
//             <div>
//               <button onClick={() => handleEdit(fb)}>✏️ Edit</button>
//               <button onClick={() => handleDelete(fb._id)}>🗑️ Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeedbackPage;


import React, { useState, useEffect } from "react";
import api from "../api/api";
import "../styles/Feedback.css";

const FeedbackPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", rating: 5 });
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/feedbacks/public");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to load feedbacks");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/feedbacks/${editingId}`, form);
        alert("✅ Feedback updated!");
      } else {
        await api.post("/feedbacks", form);
        alert("✅ Feedback submitted!");
      }
      setForm({ name: "", email: "", message: "", rating: 5 });
      setEditingId(null);
      setShowForm(false);
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      alert("❌ Error submitting feedback");
    }
  };

  const handleEdit = (fb) => {
    setForm({
      name: fb.name,
      email: fb.email,
      message: fb.message,
      rating: fb.rating,
    });
    setEditingId(fb._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await api.delete(`/feedbacks/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting feedback");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", email: "", message: "", rating: 5 });
  };

  return (
    <div className="feedback-container">
      <h2>💬 Feedback Management</h2>

      <button className="add-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add Feedback"}
      </button>

      {showForm && (
        <form className="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <select name="rating" value={form.rating} onChange={handleChange}>
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>
          <div className="btn-group">
            <button type="submit">{editingId ? "Update Feedback" : "Submit Feedback"}</button>
            {editingId && (
              <button type="button" className="cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      <h3>📋 All Feedbacks</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb) => (
              <tr key={fb._id}>
                <td data-label="Name">{fb.name}</td>
                <td data-label="Email">{fb.email || "-"}</td>
                <td data-label="Message">{fb.message}</td>
                <td data-label="Rating">{fb.rating} ⭐</td>
                <td data-label="Actions">
                  <button className="edit-btn" onClick={() => handleEdit(fb)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(fb._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackPage;
