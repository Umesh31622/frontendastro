// import axios from "axios";

// const API_URL = "https://adminastrotalk-1.onrender.com/api/subscriptions";

// // ===== PLANS =====
// export const getPlans = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/plans`);
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching plans:", err.response?.data || err.message);
//     return { plans: [] };
//   }
// };

// export const createPlan = async (plan) => {
//   try {
//     const res = await axios.post(`${API_URL}/plans`, plan);
//     return res.data;
//   } catch (err) {
//     console.error("Error creating plan:", err.response?.data || err.message);
//     return null;
//   }
// };

// export const deletePlan = async (id) => {
//   try {
//     const res = await axios.delete(`${API_URL}/plans/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Error deleting plan:", err.response?.data || err.message);
//     return null;
//   }
// };

// // ===== REFERRALS =====
// export const getReferrals = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/referrals`);
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching referrals:", err.response?.data || err.message);
//     return { referrals: [] };
//   }
// };

// export const approveReferral = async (id) => {
//   try {
//     const res = await axios.put(`${API_URL}/referrals/${id}/approve`);
//     return res.data;
//   } catch (err) {
//     console.error("Error approving referral:", err.response?.data || err.message);
//     return null;
//   }
// };

// import axios from "axios";

// // ✅ Backend base URL (adjust if hosted)
// const API_URL = "https://adminastrotalk-1.onrender.com/api/subscriptions";

// /* =====================================================
//    🔹 PLANS CRUD
// ===================================================== */
// export const getPlans = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/plans`);
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching plans:", err.response?.data || err.message);
//     return { plans: [] };
//   }
// };

// export const createPlan = async (plan) => {
//   try {
//     const res = await axios.post(`${API_URL}/plans`, plan);
//     return res.data;
//   } catch (err) {
//     console.error("Error creating plan:", err.response?.data || err.message);
//     return null;
//   }
// };

// // ✅ UPDATE PLAN (newly added)
// export const updatePlan = async (id, planData) => {
//   try {
//     const res = await axios.put(`${API_URL}/plans/${id}`, planData);
//     return res.data;
//   } catch (err) {
//     console.error("Error updating plan:", err.response?.data || err.message);
//     return null;
//   }
// };

// export const deletePlan = async (id) => {
//   try {
//     const res = await axios.delete(`${API_URL}/plans/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Error deleting plan:", err.response?.data || err.message);
//     return null;
//   }
// };

// /* =====================================================
//    🔹 REFERRALS
// ===================================================== */
// export const getReferrals = async () => {
//   try {
//     const res = await axios.get(`${API_URL}/referrals`);
//     return res.data;
//   } catch (err) {
//     console.error("Error fetching referrals:", err.response?.data || err.message);
//     return { referrals: [] };
//   }
// };

// export const approveReferral = async (id) => {
//   try {
//     const res = await axios.put(`${API_URL}/referrals/${id}/approve`);
//     return res.data;
//   } catch (err) {
//     console.error("Error approving referral:", err.response?.data || err.message);
//     return null;
//   }
// };

// // ✅ DELETE REFERRAL (newly added)
// export const deleteReferral = async (id) => {
//   try {
//     const res = await axios.delete(`${API_URL}/referrals/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error("Error deleting referral:", err.response?.data || err.message);
//     return null;
//   }
// };


import axios from "axios";

const API_URL = "https://adminastrotalk-1.onrender.com/api/subscriptions";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json";

/* =====================================================
   🔹 PLANS CRUD
===================================================== */
export const getPlans = async () => {
  try {
    const res = await axios.get(`${API_URL}/plans`);
    return res.data.plans || [];
  } catch (err) {
    console.error("Error fetching plans:", err.response?.data || err.message);
    return [];
  }
};

export const createPlan = async (plan) => {
  try {
    const res = await axios.post(`${API_URL}/plans`, plan);
    return res.data.plan || null;
  } catch (err) {
    console.error("Error creating plan:", err.response?.data || err.message);
    return null;
  }
};

export const updatePlan = async (id, planData) => {
  try {
    const res = await axios.put(`${API_URL}/plans/${id}`, planData);
    return res.data.plan || null;
  } catch (err) {
    console.error("Error updating plan:", err.response?.data || err.message);
    return null;
  }
};

export const deletePlan = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/plans/${id}`);
    return res.data.success || false;
  } catch (err) {
    console.error("Error deleting plan:", err.response?.data || err.message);
    return false;
  }
};

/* =====================================================
   🔹 REFERRALS
===================================================== */
export const getReferrals = async () => {
  try {
    const res = await axios.get(`${API_URL}/referrals`);
    return res.data.referrals || [];
  } catch (err) {
    console.error("Error fetching referrals:", err.response?.data || err.message);
    return [];
  }
};

export const approveReferral = async (id) => {
  try {
    const res = await axios.put(`${API_URL}/referrals/${id}/approve`);
    return res.data.referral || null;
  } catch (err) {
    console.error("Error approving referral:", err.response?.data || err.message);
    return null;
  }
};

export const deleteReferral = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/referrals/${id}`);
    return res.data.success || false;
  } catch (err) {
    console.error("Error deleting referral:", err.response?.data || err.message);
    return false;
  }
};
