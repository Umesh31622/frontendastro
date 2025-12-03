
// import React, { useState } from "react";
// import { loginUser, registerUser } from "../api/api";

// export default function AuthPage({ onAuth }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);
//     try {
//       if (isLogin) {
//         const res = await loginUser(formData);
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("user", JSON.stringify(res.data.user));
//         onAuth(res.data.user, res.data.token);
//         setMessage("✅ Login successful!");
//       } else {
//         const res = await registerUser(formData);
//         setMessage(res.data.message || "✅ Registration successful! Please login.");
//         setIsLogin(true);
//       }
//     } catch (err) {
//       setMessage(`❌ ${err.response?.data?.message || "Something went wrong"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       <div className="auth-card">
//         <h2>{isLogin ? "Admin Login" : "Register New Admin"}</h2>
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <>
//               <label>Name</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} required />
//             </>
//           )}
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//           <label>Password</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//           <button type="submit" disabled={loading}>
//             {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
//           </button>
//         </form>
//         <p className="muted">
//           {isLogin ? (
//             <>Don’t have an account? <button onClick={() => setIsLogin(false)}>Register</button></>
//           ) : (
//             <>Already have an account? <button onClick={() => setIsLogin(true)}>Login</button></>
//           )}
//         </p>
//         {message && <div className="msg">{message}</div>}
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { loginUser, registerUser } from "../api/api";

export default function AuthPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (isLogin) {
        const res = await loginUser(formData); // { user, token }
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        onAuth(res.user); // pass user to App
        setMessage("✅ Login successful!");
      } else {
        const res = await registerUser(formData);
        setMessage(res.message || "✅ Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data?.message || err.message || "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>{isLogin ? "Admin Login" : "Register New Admin"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </>
          )}
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <button type="submit" disabled={loading}>
            {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="muted">
          {isLogin ? (
            <>Don’t have an account? <button type="button" onClick={() => setIsLogin(false)}>Register</button></>
          ) : (
            <>Already have an account? <button type="button" onClick={() => setIsLogin(true)}>Login</button></>
          )}
        </p>

        {message && <div className="msg">{message}</div>}
      </div>

      <style jsx>{`
  .auth-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f0f4f8; /* light background */
    color: #111;
  }
  .auth-card {
    background: #fff;
    padding: 30px 40px;
    border-radius: 10px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  h2 {
    margin-bottom: 20px;
    font-size: 22px;
    color: #111;
  }
  label {
    display: block;
    text-align: left;
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
  button[type="submit"] {
    margin-top: 20px;
    padding: 12px 20px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }
  button[type="submit"]:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
  .muted {
    margin-top: 15px;
    font-size: 14px;
    color: #555;
  }
  .muted button {
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    text-decoration: underline;
    font-size: 14px;
  }
  .msg {
    margin-top: 15px;
    font-size: 14px;
    color: #16a34a; /* green for success */
  }
`}</style>

    </div>
  );
}
