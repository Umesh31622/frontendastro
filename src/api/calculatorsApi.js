import axios from 'axios';

const API_BASE = 'https://adminastrotalk-1.onrender.com/api/calculators';

export async function calculateBirthChart(data) {
  const res = await axios.post(`${API_BASE}/birth-chart`, data);
  return res.data;
}

export async function calculateKundli(data) {
  const res = await axios.post(`${API_BASE}/kundli`, data);
  return res.data;
}

export async function calculatePanchang(data) {
  const res = await axios.post(`${API_BASE}/panchang`, data);
  return res.data;
}

export async function calculateNumerology(data) {
  const res = await axios.post(`${API_BASE}/numerology`, data);
  return res.data;
}

export async function calculateHoroscope(data) {
  const res = await axios.post(`${API_BASE}/horoscope`, data);
  return res.data;
}

export async function calculatePlanetPosition(data) {
  const res = await axios.post(`${API_BASE}/planet-position`, data);
  return res.data;
}

export async function calculateTransit(data) {
  const res = await axios.post(`${API_BASE}/transit`, data);
  return res.data;
}

export async function calculateDosha(data) {
  const res = await axios.post(`${API_BASE}/dosha`, data);
  return res.data;
}
