import React, { useState } from "react";
import axios from "axios";

export default function AdminLogin({ onAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/"}/api/auth/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      onAuth(res.data);
      setMessage("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {message && <p className="text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
}
