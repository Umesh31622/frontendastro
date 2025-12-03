import React, { useState } from "react";
import { verifyOtp } from "../../api/userwebApi";

export default function UserWebVerifyOtp({ email, onSuccess }) {
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    const res = await verifyOtp(email, otp);

    if (!res.data.success) {
      return alert(res.data.message || "Invalid OTP");
    }

    // Save token
    localStorage.setItem("userwebToken", res.data.token);

    // Pass user forward
    onSuccess(res.data.user);
  };

  return (
    <div className="otp-box">
      <h2>Enter OTP</h2>
      <p>Sent to {email}</p>

      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
