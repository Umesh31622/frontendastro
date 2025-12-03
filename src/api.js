

import axios from "axios";

// Base URL from environment or default localhost
const API_URL = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api";

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Automatically include token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle global response errors
api.interceptors.response.use(
  (response) => response.data, // return only data
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(error);
  }
);

// --- Token helper ---
export const setToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// --- Auth APIs ---
export const loginUser = (credentials) =>
  api.post("/auth/login", credentials).then((res) => {
    if (res.token) setToken(res.token);
    return res;
  });

export const registerUser = (userData) => api.post("/auth/register", userData);

// --- Messages APIs ---
export const fetchMessages = () => api.get("/messages");
export const getMessageById = (id) => api.get(`/messages/${id}`);
export const sendMessage = (message) => api.post("/messages", message);
export const updateMessage = (id, message) => api.put(`/messages/${id}`, message);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

// --- Templates APIs ---
export const fetchTemplates = () => api.get("/templates");
export const saveTemplate = (template) => api.post("/templates", template);
export const updateTemplate = (id, template) => api.put(`/templates/${id}`, template);
export const deleteTemplate = (id) => api.delete(`/templates/${id}`);

// --- Vault APIs ---
export const fetchVault = () => api.get("/vault");
export const addVaultItem = (item) => api.post("/vault", item);
export const updateVaultItem = (id, item) => api.put(`/vault/${id}`, item);
export const deleteVaultItem = (id) => api.delete(`/vault/${id}`);

// --- Feedback APIs ---
// Public
export const getAllFeedbacks = () => api.get("/feedbacks/public");
export const submitFeedback = (feedbackData) => api.post("/feedbacks", feedbackData);

// Admin Feedback APIs
export const getAllFeedbacksAdmin = () => api.get("/feedbacks"); // admin only
export const deleteFeedbackAdmin = (id) => api.delete(`/feedbacks/${id}`);
export const updateFeedbackAdmin = (id, data) => api.put(`/feedbacks/${id}`, data);

// Admin (requires token)
// export const getAllFeedbacksAdmin = () => api.get("/feedbacks");
// export const updateFeedbackStatus = (id, status) => api.patch(`/feedbacks/${id}/status`, { status });
// export const toggleFeedbackPublish = (id) => api.patch(`/feedbacks/${id}/publish`);
// export const tagFeedback = (id, tags) => api.patch(`/feedbacks/${id}/tag`, { tags });
// export const deleteFeedback = (id) => api.delete(`/feedbacks/${id}`);
// export const trackFeedbackImpact = () => api.get("/feedbacks/impact/track");

// --- Email & WhatsApp ---
export const sendEmail = (data) => api.post("/send-email", data);
export const sendWhatsApp = (data) => api.post("/send-whatsapp", data);

// --- Automation / Submission APIs ---
export const triggerAutomation = (data) => api.post("/automation", data);
export const submissionApi = (data) => api.post("/submission", data);

// --- Service & Form APIs ---
export const serviceApi = (data) => api.post("/service", data);
export const formApi = (data) => api.post("/form", data);
export const commApi = (data) => api.post("/comm", data);
export const uploadContent = (data) => api.post("/upload", data);
export const vaultApi = (data) => api.post("/vault-action", data);

// --- Default export ---
export default api;
