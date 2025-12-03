// ADMIN PANEL USER LIST FRONTEND (admin-user-box-frontend.jsx)
// Shows all registered users inside admin dashboard.

import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "https://adminastrotalk-1.onrender.com0/api" });

export default function AdminUserBox() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/clients"); // backend me /api/clients se users milte hai
      setUsers(res.data?.data || res.data || []);
    } catch (err) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "30px auto", background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 0 10px #ddd" }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 15 }}>Registered Website Users</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No Users Found</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {users.map((u) => (
            <div key={u._id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eee", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 600 }}>
                {(u.name || u.email)?.charAt(0).toUpperCase()}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>{u.name || "No Name"}</p>
                <p style={{ margin: 0, color: "gray", fontSize: 13 }}>{u.email}</p>
              </div>

              <p style={{ color: "gray", fontSize: 12 }}>
                {new Date(u.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
