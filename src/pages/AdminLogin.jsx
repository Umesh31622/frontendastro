// import React, { useState } from "react";
// import axios from "axios";

// const AdminLogin = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [otp, setOtp] = useState("");
//   const [otpSent, setOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const API_URL = "https://adminastrotalk-1.onrender.com/api/login"; // change this

//   // STEP 1: Request OTP
//   const handleRequestOtp = async () => {
//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await axios.post(`${API_URL}/request-otp`, { email, name });
//       setOtpSent(true);
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error sending OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // STEP 2: Verify OTP
//   const handleVerifyOtp = async () => {
//     try {
//       setLoading(true);
//       setMessage("");
//       const res = await axios.post(`${API_URL}/verify-otp`, { email, otp });

//       const { token, user } = res.data;
//       localStorage.setItem("adminToken", token);
//       localStorage.setItem("adminUser", JSON.stringify(user));

//       setMessage("✅ Login successful! Redirecting...");
//       setTimeout(() => {
//         window.location.href = "/admin/dashboard";
//       }, 1500);
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error verifying OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">
//           Admin Login / Registration
//         </h2>

//         {!otpSent ? (
//           <>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full mb-3 p-3 border rounded"
//             />
//             <input
//               type="email"
//               placeholder="Email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mb-4 p-3 border rounded"
//             />
//             <button
//               onClick={handleRequestOtp}
//               disabled={loading || !email}
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               {loading ? "Sending OTP..." : "Request OTP"}
//             </button>
//           </>
//         ) : (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full mb-4 p-3 border rounded"
//             />
//             <button
//               onClick={handleVerifyOtp}
//               disabled={loading || !otp}
//               className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
//             >
//               {loading ? "Verifying..." : "Verify OTP"}
//             </button>

//             <p
//               onClick={() => setOtpSent(false)}
//               className="text-blue-500 text-sm mt-3 text-center cursor-pointer"
//             >
//               🔁 Resend OTP
//             </p>
//           </>
//         )}

//         {message && (
//           <p className="text-center text-sm mt-4 text-gray-700">{message}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;

import React, { useState } from "react";
import API from "../api";
import "../styles/Admin.css";

export default function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      onLogin(res.data.user);
    } catch (err) {
      setMsg("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}
