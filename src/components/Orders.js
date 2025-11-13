import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, PlusCircle, Trash2, Edit2, CheckCircle } from "lucide-react";
import "./Orders.css";

const API = `${process.env.REACT_APP_API_URL}/orders`;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    serviceType: "",
    price: "",
    status: "Pending",
    file: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}?search=${search}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search]);

  // Input handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) setForm({ ...form, file: files[0] });
    else setForm({ ...form, [name]: value });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, fd);
      } else {
        await axios.post(API, fd);
      }

      fetchOrders();
      resetForm();
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete order
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await axios.delete(`${API}/${id}`);
    fetchOrders();
  };

  // Edit
  const editOrder = (order) => {
    setEditingId(order._id);
    setForm({
      customerName: order.customerName,
      email: order.email,
      serviceType: order.serviceType,
      price: order.price,
      status: order.status,
      file: null,
    });
  };

  // Reset
  const resetForm = () => {
    setEditingId(null);
    setForm({
      customerName: "",
      email: "",
      serviceType: "",
      price: "",
      status: "Pending",
      file: null,
    });
  };

  return (
    <div className="orders-page">
      <h2 className="heading">🧾 Order Management</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by customer name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Form */}
      <form className="order-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="serviceType"
          placeholder="Service Type"
          value={form.serviceType}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input type="file" name="file" onChange={handleChange} />

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? (
            <Loader2 className="spinner" />
          ) : editingId ? (
            <>
              <CheckCircle size={18} /> Update Order
            </>
          ) : (
            <>
              <PlusCircle size={18} /> Create Order
            </>
          )}
        </button>
      </form>

      {/* Table */}
      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Service</th>
              <th>Price</th>
              <th>Status</th>
              <th>File</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o.customerName}</td>
                <td>{o.email}</td>
                <td>{o.serviceType}</td>
                <td>₹{o.price}</td>
                <td>{o.status}</td>

                <td>
                  {o.fileUrl ? (
                    <a href={o.fileUrl} target="_blank" rel="noreferrer">
                      View
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td>
                  <button onClick={() => editOrder(o)} className="edit-btn">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteOrder(o._id)} className="delete-btn">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}


