import axios from "axios";

const API_URL = "/api/discounts";

export const getDiscounts = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching discounts:", err.response?.data || err.message);
    return { discounts: [] };
  }
};

export const createDiscount = async (discount) => {
  try {
    const res = await axios.post(API_URL, discount);
    return res.data;
  } catch (err) {
    console.error("Error creating discount:", err.response?.data || err.message);
    return null;
  }
};

export const deleteDiscount = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting discount:", err.response?.data || err.message);
    return null;
  }
};
