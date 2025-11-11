import React, { useState } from "react";
import axios from "axios";

export default function PublicFeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");

  const submitFeedback = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/"}/api/feedbacks`, { name, email, message, rating });
      setStatus("Feedback submitted successfully!");
      setName(""); setEmail(""); setMessage(""); setRating(0);
    } catch (err) {
      setStatus(err.response?.data?.message || "Failed to submit feedback");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Submit Feedback</h2>
        <form onSubmit={submitFeedback}>
          <label>Name</label><input value={name} onChange={e=>setName(e.target.value)} required/>
          <label>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <label>Message</label><textarea value={message} onChange={e=>setMessage(e.target.value)} required/>
          <label>Rating</label>
          <select value={rating} onChange={e=>setRating(e.target.value)} required>
            <option value={0}>Select rating</option>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        <div className="msg">{status}</div>
      </div>
    </div>
  );
}
