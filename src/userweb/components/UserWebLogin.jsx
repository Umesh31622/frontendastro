import React, { useState } from "react";
import { sendOtp } from "../../api/userwebApi";

export default function UserWebLogin({ onNext }) {
  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      onNext(email);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  return (
    <div className="login-box">
      <h2>Login with Email</h2>
      <input 
        type="email" 
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
}
