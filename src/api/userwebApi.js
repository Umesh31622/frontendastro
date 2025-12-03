
import axios from "axios";

const API = process.env.REACT_APP_USERWEB_API || "https://adminastrotalk-1.onrender.com/api/userweb/auth";

// ===============================
// SEND OTP
// ===============================
export const sendOtp = async (email) => {
  try {
    const res = await axios.post(`${API}/send-otp`, { email });
    return res;
  } catch (err) {
    console.error("Send OTP API Error:", err.message);
    return { data: { success: false, message: "OTP send failed" } };
  }
};

// ===============================
// VERIFY OTP
// ===============================
export const verifyOtp = async (email, otp) => {
  try {
    const res = await axios.post(`${API}/verify-otp`, { email, otp });
    return res;
  } catch (err) {
    console.error("Verify OTP API Error:", err.message);
    return { data: { success: false, message: "OTP verify failed" } };
  }
};

// ===============================
// GET USER PROFILE
// ===============================
export const getUserWebProfile = async (token) => {
  try {
    const res = await axios.get(`${API}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    console.error("User Profile API Error:", err.message);
    return { data: { success: false } };
  }
};

// ===============================
// UPDATE USER PROFILE
// ===============================
export const updateUserWeb = async (token, data) => {
  try {
    const res = await axios.put(`${API}/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    console.error("Update User API Error:", err.message);
    return { data: { success: false } };
  }
};
