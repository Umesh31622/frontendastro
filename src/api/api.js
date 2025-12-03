

import axios from "axios";

// ==================== CONFIG ====================
const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com";

// Get token from localStorage
const getToken = () => localStorage.getItem("token");

// ==================== MAIN AXIOS INSTANCE ====================
const API = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically (except login/register)
API.interceptors.request.use(
  (config) => {
    const token = getToken();
    const skipAuth = ["/auth/login", "/auth/register"];
    if (token && !skipAuth.some((url) => config.url.includes(url))) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ==================== API INSTANCE FACTORY ====================
const createApiInstance = (baseURL) => {
  const instance = axios.create({ baseURL, withCredentials: true });
  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  return instance;
};

// ==================== MODULE INSTANCES ====================
export const serviceApi = createApiInstance(`${API_BASE}/services`);
export const formApi = createApiInstance(`${API_BASE}/forms`);
export const submissionApi = createApiInstance(`${API_BASE}/submissions`);
export const vaultApi = createApiInstance(`${API_BASE}/vault`);
export const commApi = createApiInstance(`${API_BASE}/communication`);
export const feedbackApi = createApiInstance(`${API_BASE}/feedbacks`); // <-- Added feedback

// ==================== AUTH ====================
export const loginUser = async ({ email, password }) => {
  try {
    const formData = new URLSearchParams({ email, password });
    const res = await API.post("/auth/login", formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (res.data.token) localStorage.setItem("token", res.data.token);
    if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    throw err;
  }
};

export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await API.post("/auth/register", { name, email, password });
    return res.data;
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    throw err;
  }
};

// export const fetchVault = () => API.get("/content");
// export const uploadContent = (formData) =>
//   API.post("/content", formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const updateVaultItem = (id, formData) =>
//   API.put(`/content/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
// export const deleteVaultItem = (id) => API.delete(`/content/${id}`);
export const fetchVault = () => API.get("/content");

export const uploadContent = (formData) =>
  API.post("/content", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateVaultItem = (id, formData) =>
  API.put(`/content/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteVaultItem = (id) =>
  API.delete(`/content/${id}`);


// ==================== COMMUNICATION CENTER ====================
// Templates
export const fetchTemplates = () => commApi.get("/templates");
export const saveTemplate = (data) => commApi.post("/templates", data);
export const updateTemplate = (id, data) => commApi.put(`/templates/${id}`, data);
export const deleteTemplate = (id) => commApi.delete(`/templates/${id}`);

// Messages
export const fetchMessages = () => commApi.get("/messages");
export const sendMessage = (payload) => commApi.post("/messages", payload);
export const getMessageById = (id) => commApi.get(`/messages/${id}`);
export const updateMessage = (id, data) => commApi.put(`/messages/${id}`, data);
export const deleteMessage = (id) => commApi.delete(`/messages/${id}`);

// Email / WhatsApp
export const sendEmail = (payload) => sendMessage({ ...payload, channel: "email" });
export const sendWhatsApp = (payload) => sendMessage({ ...payload, channel: "whatsapp" });

// Triggers
export const triggerAutomation = (eventType, data) =>
  commApi.post(`/trigger/${eventType}`, data);

// ==================== FEEDBACK ====================
// Public
export const submitFeedback = (data) => feedbackApi.post("/", data);
export const getAllFeedbacksPublic = () => feedbackApi.get("/public");

// ==================== PAYMENTS & SUBSCRIPTIONS ====================
export const subscriptionApi = createApiInstance(`${API_BASE}/subscriptions`);
export const paymentApi = createApiInstance(`${API_BASE}/payments`);

// --- Subscription Plans ---
export const getPlans = () => subscriptionApi.get("/plans");
export const createPlan = (data) => subscriptionApi.post("/plans", data);
export const updatePlan = (id, data) => subscriptionApi.put(`/plans/${id}`, data);
export const deletePlan = (id) => subscriptionApi.delete(`/plans/${id}`);

// --- Discount Codes ---
export const getDiscountCodes = () => subscriptionApi.get("/discounts");
export const createDiscountCode = (data) => subscriptionApi.post("/discounts", data);
export const deleteDiscountCode = (id) => subscriptionApi.delete(`/discounts/${id}`);

// --- Referrals ---
export const getReferrals = () => subscriptionApi.get("/referrals");
export const approveReferral = (id) => subscriptionApi.put(`/referrals/${id}/approve`);

// --- Payments (Razorpay Integration) ---
export const createOrder = (data) => paymentApi.post("/create-order", data);  // { planId, amount }
export const verifyPayment = (data) => paymentApi.post("/verify", data);   

// Admin
export const getAllFeedbacksAdmin = () => feedbackApi.get("/");
export const updateFeedbackAdmin = (id, data) => feedbackApi.put(`/${id}`, data);
export const deleteFeedbackAdmin = (id) => feedbackApi.delete(`/${id}`);

// ==================== EXPORT DEFAULT ====================
export default API;
