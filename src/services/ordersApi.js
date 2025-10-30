// src/services/ordersApi.js
const API_BASE = process.env.REACT_APP_API_BASE || 'https://adminastrotalk-1.onrender.com/api';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch(e) { json = { message: text }; }
    throw json;
  }
  return res.json();
}

export async function fetchOrders({ page = 1, limit = 20, search = '', status, serviceType } = {}) {
  const params = new URLSearchParams({ page, limit });
  if (search) params.set('search', search);
  if (status) params.set('status', status);
  if (serviceType) params.set('serviceType', serviceType);
  const res = await fetch(`${API_BASE}/orders?${params.toString()}`);
  return handleResponse(res);
}

export async function getOrder(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`);
  return handleResponse(res);
}

export async function createOrder(formData) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    body: formData
  });
  return handleResponse(res);
}

export async function updateOrder(id, formDataOrJson, isFormData = false) {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: 'PUT',
    headers: isFormData ? {} : { 'Content-Type': 'application/json' },
    body: isFormData ? formDataOrJson : JSON.stringify(formDataOrJson)
  });
  return handleResponse(res);
}

export async function deleteOrder(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}
