import axios from "./api"; // your existing axios instance

export const fetchAnalytics = () => axios.get("/analytics");
export const fetchAnalyticsById = (id) => axios.get(`/analytics/${id}`);
export const createAnalytics = (payload) => axios.post("/analytics", payload);
export const updateAnalytics = (id, payload) => axios.put(`/analytics/${id}`, payload);
export const deleteAnalytics = (id) => axios.delete(`/analytics/${id}`);
