import axios from "axios";

const API_URL = "/api/subscriptions";

// ===== PLANS =====
export const getPlans = async () => {
  try {
    const res = await axios.get(`${API_URL}/plans`);
    return res.data;
  } catch (err) {
    console.error("Error fetching plans:", err.response?.data || err.message);
    return { plans: [] };
  }
};

export const createPlan = async (plan) => {
  try {
    const res = await axios.post(`${API_URL}/plans`, plan);
    return res.data;
  } catch (err) {
    console.error("Error creating plan:", err.response?.data || err.message);
    return null;
  }
};

export const deletePlan = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/plans/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting plan:", err.response?.data || err.message);
    return null;
  }
};

// ===== REFERRALS =====
export const getReferrals = async () => {
  try {
    const res = await axios.get(`${API_URL}/referrals`);
    return res.data;
  } catch (err) {
    console.error("Error fetching referrals:", err.response?.data || err.message);
    return { referrals: [] };
  }
};

export const approveReferral = async (id) => {
  try {
    const res = await axios.put(`${API_URL}/referrals/${id}/approve`);
    return res.data;
  } catch (err) {
    console.error("Error approving referral:", err.response?.data || err.message);
    return null;
  }
};
