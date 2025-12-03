// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./UserManagement.css";

// // const API_URL = "https://adminastrotalk-1.onrender.com/api";

// // const UserManagement = ({ token }) => {
// //   const [users, setUsers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchUsers = async () => {
// //     try {
// //       const res = await axios.get(`${API_URL}/clients`, {
// //         headers: { Authorization: token }
// //       });
// //       setUsers(res.data || []);
// //     } catch (err) {
// //       console.log("User fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (!window.confirm("Delete this user permanently?")) return;

// //     try {
// //       await axios.delete(`${API_URL}/clients/${id}`, {
// //         headers: { Authorization: token }
// //       });
// //       setUsers(users.filter((u) => u._id !== id));
// //       alert("User deleted");
// //     } catch (err) {
// //       alert("Error deleting user");
// //     }
// //   };

// //   useEffect(() => {
// //     fetchUsers();
// //   }, []);

// //   return (
// //     <div className="um-wrapper">
// //       <h2>User Management</h2>
// //       <p>Manage all registered users of your Astrology Platform.</p>

// //       {loading ? (
// //         <p>Loading users...</p>
// //       ) : (
// //         <table className="um-table">
// //           <thead>
// //             <tr>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Phone</th>
// //               <th>Kundli</th>
// //               <th>Wallet</th>
// //               <th>Joined</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {users.map((user) => (
// //               <tr key={user._id}>
// //                 <td>{user.name || "N/A"}</td>
// //                 <td>{user.email}</td>
// //                 <td>{user.phone || "-"}</td>
// //                 <td>{user.kundliGenerated ? "✔ Yes" : "❌ No"}</td>
// //                 <td>₹{user.wallet || 0}</td>
// //                 <td>{new Date(user.createdAt).toLocaleDateString()}</td>
// //                 <td className="um-actions">
// //                   <button 
// //                     className="view"
// //                     onClick={() => alert("Open full user profile modal")}
// //                   >
// //                     View
// //                   </button>

// //                   <button 
// //                     className="delete"
// //                     onClick={() => handleDelete(user._id)}
// //                   >
// //                     Delete
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>

// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserManagement;
// // ADMIN PANEL USER LIST FRONTEND (admin-user-box-frontend.jsx)
// // Shows all registered users inside admin dashboard.

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const api = axios.create({ baseURL: "https://adminastrotalk-1.onrender.com0/api" });

// export default function AdminUserBox() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/clients"); // backend me /api/clients se users milte hai
//       setUsers(res.data?.data || res.data || []);
//     } catch (err) {
//       setError("Failed to load users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   return (
//     <div style={{ maxWidth: 500, margin: "30px auto", background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 0 10px #ddd" }}>
//       <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 15 }}>Registered Website Users</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {loading ? (
//         <p>Loading...</p>
//       ) : users.length === 0 ? (
//         <p>No Users Found</p>
//       ) : (
//         <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//           {users.map((u) => (
//             <div key={u._id} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8, display: "flex", alignItems: "center", gap: 12 }}>
//               <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eee", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: 600 }}>
//                 {(u.name || u.email)?.charAt(0).toUpperCase()}
//               </div>

//               <div style={{ flex: 1 }}>
//                 <p style={{ margin: 0, fontWeight: 600 }}>{u.name || "No Name"}</p>
//                 <p style={{ margin: 0, color: "gray", fontSize: 13 }}>{u.email}</p>
//               </div>

//               <p style={{ color: "gray", fontSize: 12 }}>
//                 {new Date(u.createdAt).toLocaleDateString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "https://adminastrotalk-1.onrender.com/api" });

export default function AdminUserBox() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      // 🟢 USERWEB USERS GET
      const res = await api.get("/userweb"); // backend: userwebRoutes → get all users

      setUsers(res.data?.data || res.data || []);
    } catch (err) {
      setError("Failed to load logged-in users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div
      style={{
        maxWidth: 550,
        margin: "30px auto",
        background: "#fff",
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 0 10px #ddd",
      }}
    >
      <h2
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Website Logged-in Users
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading users...</p>
      ) : users.length === 0 ? (
        <p style={{ textAlign: "center" }}>No users found yet</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {users.map((u) => (
            <div
              key={u._id}
              style={{
                padding: 12,
                border: "1px solid #ddd",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: "50%",
                  background: "#eee",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: 600,
                }}
              >
                {(u.name || u.email)?.charAt(0).toUpperCase()}
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {u.name || "User"}
                </p>
                <p style={{ margin: 0, color: "gray", fontSize: 13 }}>
                  {u.email}
                </p>
              </div>

              <p style={{ fontSize: 12, color: "gray" }}>
                {u.createdAt
                  ? new Date(u.createdAt).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
