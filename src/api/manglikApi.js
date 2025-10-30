import axios from "axios";

const BASE_URL = "https://adminastrotalk-1.onrender.com/api/manglik";

export const createManglik = (data) => axios.post(BASE_URL, data);
export const getAllMangliks = () => axios.get(BASE_URL);
export const getManglikById = (id) => axios.get(`${BASE_URL}/${id}`);
export const updateManglik = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteManglik = (id) => axios.delete(`${BASE_URL}/${id}`);
