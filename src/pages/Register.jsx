import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

export default function Register({ setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await registerUser({ name, email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button type="submit">Register</button>
    </form>
  );
}
