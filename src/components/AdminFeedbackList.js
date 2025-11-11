// import React, { useEffect, useState } from "react";
// import API from "../api";
// import "../styles/Admin.css";

// export default function AdminFeedbackList() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [msg, setMsg] = useState("");

//   const fetchData = async () => {
//     try {
//       const res = await API.get("/feedbacks");
//       setFeedbacks(res.data.feedbacks);
//     } catch (err) {
//       setMsg("Error loading feedbacks");
//     }
//   };

//   const updateStatus = async (id, status) => {
//     await API.patch(`/feedbacks/${id}/status`, { status });
//     fetchData();
//   };

//   const togglePublish = async (id, isPublished) => {
//     await API.patch(`/feedbacks/${id}/publish`, { isPublished: !isPublished });
//     fetchData();
//   };

//   const deleteFeedback = async (id) => {
//     if (window.confirm("Delete this feedback?")) {
//       await API.delete(`/feedbacks/${id}`);
//       fetchData();
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div className="admin-feedback">
//       <h2>Feedback Management</h2>
//       {msg && <p className="msg">{msg}</p>}
//       <div className="feedback-grid">
//         {feedbacks.map((fb) => (
//           <div key={fb._id} className={`feedback-card ${fb.status}`}>
//             <h3>{fb.name}</h3>
//             <p>{fb.message}</p>
//             <small>{fb.email}</small>
//             <p>Rating: {fb.rating}⭐</p>
//             <div className="btns">
//               <button onClick={() => updateStatus(fb._id, "approved")}>Approve</button>
//               <button onClick={() => updateStatus(fb._id, "rejected")} className="danger">Reject</button>
//               <button onClick={() => togglePublish(fb._id, fb.isPublished)}>
//                 {fb.isPublished ? "Unpublish" : "Publish"}
//               </button>
//               <button onClick={() => deleteFeedback(fb._id)} className="delete">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import API from "../api";
import "../styles/Admin.css";

export default function AdminFeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [msg, setMsg] = useState("");

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const res = await API.get("/feedback"); // Admin protected route
      setFeedbacks(res);
    } catch (err) {
      console.error(err);
      setMsg("Error loading feedbacks");
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  // Approve/Reject feedback
  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/feedback/${id}/status`, { status });
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      setMsg("Error updating status");
    }
  };

  // Toggle publish/unpublish
  const togglePublish = async (id, isPublished) => {
    try {
      await API.patch(`/feedback/${id}/publish`, { isPublished: !isPublished });
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      setMsg("Error toggling publish");
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    try {
      await API.delete(`/feedback/${id}`);
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      setMsg("Error deleting feedback");
    }
  };

  return (
    <div className="admin-feedback">
      <h2>Admin Feedback Management</h2>
      {msg && <p className="msg">{msg}</p>}

      <div className="feedback-grid">
        {feedbacks.map(fb => (
          <div key={fb._id} className={`feedback-card ${fb.status}`}>
            <h3>{fb.name}</h3>
            <p>{fb.message}</p>
            {fb.service && <p>Service: {fb.service}</p>}
            <p>Email: {fb.email}</p>
            <p>Rating: {fb.rating}⭐</p>
            <p>Status: <strong>{fb.status}</strong></p>
            <p>Published: {fb.isPublished ? "Yes" : "No"}</p>

            <div className="btns">
              <button onClick={() => updateStatus(fb._id, "approved")}>Approve</button>
              <button onClick={() => updateStatus(fb._id, "rejected")} className="danger">Reject</button>
              <button onClick={() => togglePublish(fb._id, fb.isPublished)}>
                {fb.isPublished ? "Unpublish" : "Publish"}
              </button>
              <button onClick={() => deleteFeedback(fb._id)} className="delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

