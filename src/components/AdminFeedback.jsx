import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminFeedback.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("adminToken");

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/feedbacks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm("Are you sure to delete this feedback?")) return;
    try {
      await axios.delete(`/api/feedbacks/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setFeedbacks(prev => prev.filter(fb => fb._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete feedback");
    }
  };

  const exportCSV = () => {
    const csv = [
      ["Name", "Email", "Message", "Rating", "Date"],
      ...feedbacks.map(f => [f.name, f.email, f.message, f.rating, new Date(f.createdAt).toLocaleString()])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "feedbacks.csv");
    link.click();
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  if (loading) return <p>Loading feedbacks...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="admin-feedback">
      <h2>User Feedbacks</h2>
      <button className="export-btn" onClick={exportCSV}>Export CSV</button>
      {feedbacks.length === 0 ? <p>No feedbacks found</p> : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map(fb => (
              <tr key={fb._id}>
                <td>{fb.name}</td>
                <td>{fb.email}</td>
                <td>{fb.message}</td>
                <td>{fb.rating || "—"}</td>
                <td>{new Date(fb.createdAt).toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => deleteFeedback(fb._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
