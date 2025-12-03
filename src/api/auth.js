import axios from 'axios';

const BASE_URL = 'https://adminastrotalk-1.onrender.com/api/auth'; 

export const requestOtp = async (email, name) => {
  const res = await axios.post(`${BASE_URL}/request-otp`, { email, name });
  return res.data;
};

export const verifyOtp = async (email, otp) => {
  const res = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });
  return res.data;
};
