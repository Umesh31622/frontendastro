// // // import React, { useEffect, useState } from "react";
// // // import { serviceApi } from "../api/api";

// // // export default function Services({ token }) {
// // //   const [services, setServices] = useState([]);
// // //   const [editingService, setEditingService] = useState(null);
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     description: "",
// // //     price: "",
// // //     timeline: "",
// // //     media: null, // for file upload
// // //   });

// // //   // Fetch services
// // //   const fetchServices = async () => {
// // //     try {
// // //       const res = await serviceApi.get("/", { headers: { Authorization: `Bearer ${token}` } });
// // //       if (res.data.success) setServices(res.data.services);
// // //     } catch (err) {
// // //       console.error("Failed to fetch services:", err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchServices();
// // //   }, []);

// // //   // Handle form submit
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const data = new FormData();
// // //     for (let key in formData) {
// // //       if (formData[key]) data.append(key, formData[key]);
// // //     }

// // //     try {
// // //       if (editingService) {
// // //         await serviceApi.put(`/${editingService._id}`, data, {
// // //           headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
// // //         });
// // //         setEditingService(null);
// // //       } else {
// // //         await serviceApi.post("/", data, {
// // //           headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
// // //         });
// // //       }
// // //       setFormData({ name: "", description: "", price: "", timeline: "", media: null });
// // //       fetchServices();
// // //     } catch (err) {
// // //       console.error("Failed to submit service:", err);
// // //     }
// // //   };

// // //   // Populate form for editing
// // //   const handleEdit = (service) => {
// // //     setEditingService(service);
// // //     setFormData({
// // //       name: service.name,
// // //       description: service.description,
// // //       price: service.price || "",
// // //       timeline: service.timeline || "",
// // //       media: null,
// // //     });
// // //   };

// // //   // Delete service
// // //   const handleDelete = async (id) => {
// // //     if (!window.confirm("Delete this service?")) return;
// // //     try {
// // //       await serviceApi.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
// // //       fetchServices();
// // //     } catch (err) {
// // //       console.error("Failed to delete service:", err);
// // //     }
// // //   };

// // //   return (
// // //     <div className="services-container">
// // //       <h2>Services</h2>

// // //       {/* Service Form */}
// // //       <form className="service-form" onSubmit={handleSubmit}>
// // //         <input
// // //           type="text"
// // //           placeholder="Service Name"
// // //           value={formData.name}
// // //           required
// // //           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //         />
// // //         <input
// // //           type="text"
// // //           placeholder="Description"
// // //           value={formData.description}
// // //           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// // //         />
// // //         <input
// // //           type="number"
// // //           placeholder="Price"
// // //           value={formData.price}
// // //           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// // //         />
// // //         <input
// // //           type="text"
// // //           placeholder="Timeline"
// // //           value={formData.timeline}
// // //           onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
// // //         />
// // //         <input
// // //           type="file"
// // //           multiple
// // //           onChange={(e) => setFormData({ ...formData, media: e.target.files })}
// // //         />

// // //         {/* Show current files if editing */}
// // //         {editingService && editingService.media && editingService.media.length > 0 && (
// // //           <div className="current-files">
// // //             {editingService.media.map((file, idx) => (
// // //               <a
// // //                 key={idx}
// // //                 href={`https://adminastrotalk-1.onrender.com/${file}`}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //               >
// // //                 📎 View File {idx + 1}
// // //               </a>
// // //             ))}
// // //           </div>
// // //         )}

// // //         <button type="submit">{editingService ? "Update" : "Add"} Service</button>
// // //       </form>

// // //       {/* Services Table */}
// // //       <table className="services-table">
// // //         <thead>
// // //           <tr>
// // //             <th>Name</th>
// // //             <th>Description</th>
// // //             <th>Price</th>
// // //             <th>Timeline</th>
// // //             <th>Media</th>
// // //             <th>Actions</th>
// // //           </tr>
// // //         </thead>
// // //         <tbody>
// // //           {services.map((s) => (
// // //             <tr key={s._id}>
// // //               <td>{s.name}</td>
// // //               <td>{s.description}</td>
// // //               <td>₹{s.price || "N/A"}</td>
// // //               <td>{s.timeline || "N/A"}</td>
// // //               <td>
// // //                 {s.media && s.media.length > 0 ? (
// // //                   s.media.map((file, idx) => (
// // //                     <a
// // //                       key={idx}
// // //                       href={`https://adminastrotalk-1.onrender.com/${file}`}
// // //                       target="_blank"
// // //                       rel="noopener noreferrer"
// // //                       className="file-link"
// // //                     >
// // //                       📎 File {idx + 1}
// // //                     </a>
// // //                   ))
// // //                 ) : (
// // //                   <span>No file uploaded</span>
// // //                 )}
// // //               </td>
// // //               <td>
// // //                 <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
// // //                 <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
// // //               </td>
// // //             </tr>
// // //           ))}
// // //         </tbody>
// // //       </table>

// // //       <style jsx>{`
// // //         .services-container {
// // //           max-width: 1000px;
// // //           margin: 20px auto;
// // //           padding: 20px;
// // //           background: #f9fafb;
// // //           border-radius: 10px;
// // //           box-shadow: 0 2px 12px rgba(0,0,0,0.05);
// // //         }
// // //         h2 { text-align: center; margin-bottom: 20px; color: #1f2937; }
// // //         .service-form {
// // //           display: flex;
// // //           flex-wrap: wrap;
// // //           gap: 10px;
// // //           margin-bottom: 20px;
// // //         }
// // //         .service-form input, .service-form button {
// // //           flex: 1 1 200px;
// // //           padding: 10px;
// // //           border-radius: 5px;
// // //           border: 1px solid #d1d5db;
// // //         }
// // //         .service-form button {
// // //           flex: 1 1 100px;
// // //           background-color: #3b82f6;
// // //           color: white;
// // //           border: none;
// // //           cursor: pointer;
// // //         }
// // //         .service-form button:hover { background-color: #2563eb; }
// // //         .current-files a {
// // //           display: block;
// // //           margin: 5px 0;
// // //           color: #2563eb;
// // //         }
// // //         .services-table {
// // //           width: 100%;
// // //           border-collapse: collapse;
// // //         }
// // //         .services-table th, .services-table td {
// // //           border: 1px solid #ddd;
// // //           padding: 10px;
// // //           text-align: left;
// // //         }
// // //         .services-table th { background-color: #f3f4f6; }
// // //         .file-link { display: block; color: #2563eb; }
// // //         .edit-btn { background-color: #10b981; color: white; border: none; padding: 5px 10px; margin-right: 5px; cursor: pointer; }
// // //         .delete-btn { background-color: #ef4444; color: white; border: none; padding: 5px 10px; cursor: pointer; }
// // //         .edit-btn:hover, .delete-btn:hover { opacity: 0.85; }

// // //         @media (max-width: 768px) {
// // //           .service-form { flex-direction: column; }
// // //           .service-form input, .service-form button { flex: 1 1 100%; }
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Loader2, PlusCircle, Trash2, Edit2, CheckCircle } from "lucide-react";
// // // import "./Orders.css"; // optional styling

// // // const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api/orders";

// // // export default function Orders() {
// // //   const [orders, setOrders] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [form, setForm] = useState({
// // //     customerName: "",
// // //     email: "",
// // //     serviceType: "",
// // //     price: "",
// // //     status: "Pending",
// // //     file: null,
// // //   });
// // //   const [editingId, setEditingId] = useState(null);
// // //   const [loading, setLoading] = useState(false);

// // //   // Fetch all orders
// // //   const fetchOrders = async () => {
// // //     try {
// // //       const res = await axios.get(`${API_BASE}?search=${search}`);
// // //       setOrders(res.data);
// // //     } catch (err) {
// // //       console.error("Failed to fetch orders", err);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchOrders();
// // //   }, [search]);

// // //   // Handle input
// // //   const handleChange = (e) => {
// // //     const { name, value, files } = e.target;
// // //     if (files) setForm({ ...form, file: files[0] });
// // //     else setForm({ ...form, [name]: value });
// // //   };

// // //   // Handle form submit (Create / Update)
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);

// // //     const formData = new FormData();
// // //     Object.entries(form).forEach(([key, value]) => {
// // //       if (value) formData.append(key, value);
// // //     });

// // //     try {
// // //       if (editingId) {
// // //         await axios.put(`${API_BASE}/${editingId}`, formData, {
// // //           headers: { "Content-Type": "multipart/form-data" },
// // //         });
// // //       } else {
// // //         await axios.post(API_BASE, formData, {
// // //           headers: { "Content-Type": "multipart/form-data" },
// // //         });
// // //       }
// // //       fetchOrders();
// // //       resetForm();
// // //     } catch (err) {
// // //       console.error("Failed to save order", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Delete
// // //   const deleteOrder = async (id) => {
// // //     if (!window.confirm("Are you sure?")) return;
// // //     await axios.delete(`${API_BASE}/${id}`);
// // //     fetchOrders();
// // //   };

// // //   // Edit
// // //   const editOrder = (order) => {
// // //     setEditingId(order._id);
// // //     setForm({
// // //       customerName: order.customerName,
// // //       email: order.email,
// // //       serviceType: order.serviceType,
// // //       price: order.price,
// // //       status: order.status,
// // //       file: null,
// // //     });
// // //   };

// // //   // Reset form
// // //   const resetForm = () => {
// // //     setEditingId(null);
// // //     setForm({
// // //       customerName: "",
// // //       email: "",
// // //       serviceType: "",
// // //       price: "",
// // //       status: "Pending",
// // //       file: null,
// // //     });
// // //   };

// // //   return (
// // //     <div className="orders-page">
// // //       <h2 className="heading">🧾 Order Management</h2>

// // //       {/* 🔍 Search */}
// // //       <input
// // //         type="text"
// // //         placeholder="Search by customer name..."
// // //         value={search}
// // //         onChange={(e) => setSearch(e.target.value)}
// // //         className="search-input"
// // //       />

// // //       {/* 📝 Form */}
// // //       <form className="order-form" onSubmit={handleSubmit}>
// // //         <input
// // //           type="text"
// // //           name="customerName"
// // //           placeholder="Customer Name"
// // //           value={form.customerName}
// // //           onChange={handleChange}
// // //           required
// // //         />
// // //         <input
// // //           type="email"
// // //           name="email"
// // //           placeholder="Email"
// // //           value={form.email}
// // //           onChange={handleChange}
// // //           required
// // //         />
// // //         <input
// // //           type="text"
// // //           name="serviceType"
// // //           placeholder="Service Type"
// // //           value={form.serviceType}
// // //           onChange={handleChange}
// // //           required
// // //         />
// // //         <input
// // //           type="number"
// // //           name="price"
// // //           placeholder="Price"
// // //           value={form.price}
// // //           onChange={handleChange}
// // //           required
// // //         />
// // //         <select name="status" value={form.status} onChange={handleChange}>
// // //           <option value="Pending">Pending</option>
// // //           <option value="In Progress">In Progress</option>
// // //           <option value="Completed">Completed</option>
// // //         </select>

// // //         <input type="file" name="file" onChange={handleChange} />

// // //         <button type="submit" disabled={loading} className="submit-btn">
// // //           {loading ? (
// // //             <Loader2 className="spinner" />
// // //           ) : editingId ? (
// // //             <>
// // //               <CheckCircle size={18} /> Update Order
// // //             </>
// // //           ) : (
// // //             <>
// // //               <PlusCircle size={18} /> Create Order
// // //             </>
// // //           )}
// // //         </button>
// // //       </form>

// // //       {/* 📋 Orders List */}
// // //       <div className="orders-table">
// // //         <table>
// // //           <thead>
// // //             <tr>
// // //               <th>Customer</th>
// // //               <th>Email</th>
// // //               <th>Service</th>
// // //               <th>Price</th>
// // //               <th>Status</th>
// // //               <th>File</th>
// // //               <th>Actions</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {orders.map((o) => (
// // //               <tr key={o._id}>
// // //                 <td>{o.customerName}</td>
// // //                 <td>{o.email}</td>
// // //                 <td>{o.serviceType}</td>
// // //                 <td>₹{o.price}</td>
// // //                 <td>{o.status}</td>
// // //                 <td>
// // //                   {o.fileUrl ? (
// // //                     <a href={`https://adminastrotalk-1.onrender.com${o.fileUrl}`} target="_blank" rel="noreferrer">
// // //                       View
// // //                     </a>
// // //                   ) : (
// // //                     "—"
// // //                   )}
// // //                 </td>
// // //                 <td>
// // //                   <button onClick={() => editOrder(o)} className="edit-btn">
// // //                     <Edit2 size={16} />
// // //                   </button>
// // //                   <button onClick={() => deleteOrder(o._id)} className="delete-btn">
// // //                     <Trash2 size={16} />
// // //                   </button>
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Loader2, PlusCircle, Trash2, Edit2, CheckCircle } from "lucide-react";
// // import "./Orders.css";

// // const API_BASE = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/api/orders";

// // export default function Orders() {
// //   const [orders, setOrders] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [editingId, setEditingId] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   const [form, setForm] = useState({
// //     customerName: "",
// //     email: "",
// //     serviceType: "",
// //     price: "",
// //     status: "Pending",
// //     file: null,
// //   });

// //   // Fetch Orders
// //   const fetchOrders = async () => {
// //     try {
// //       const res = await axios.get(`${API_BASE}?search=${search}`);
// //       setOrders(res.data);
// //     } catch (err) {
// //       console.error("Failed to fetch orders", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, [search]);

// //   // Input change handler
// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     if (files) {
// //       setForm({ ...form, file: files[0] });
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   // Create / Update
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     const formData = new FormData();
// //     Object.entries(form).forEach(([key, value]) => {
// //       if (value) formData.append(key, value);
// //     });

// //     try {
// //       if (editingId) {
// //         await axios.put(`${API_BASE}/${editingId}`, formData, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //       } else {
// //         await axios.post(API_BASE, formData, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //       }

// //       fetchOrders();
// //       resetForm();
// //     } catch (err) {
// //       console.error("Failed to save order", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Delete
// //   const deleteOrder = async (id) => {
// //     if (!window.confirm("Are you sure?")) return;
// //     await axios.delete(`${API_BASE}/${id}`);
// //     fetchOrders();
// //   };

// //   // Edit
// //   const editOrder = (order) => {
// //     setEditingId(order._id);
// //     setForm({
// //       customerName: order.customerName,
// //       email: order.email,
// //       serviceType: order.serviceType,
// //       price: order.price,
// //       status: order.status,
// //       file: null,
// //     });
// //   };

// //   // Reset Form
// //   const resetForm = () => {
// //     setEditingId(null);
// //     setForm({
// //       customerName: "",
// //       email: "",
// //       serviceType: "",
// //       price: "",
// //       status: "Pending",
// //       file: null,
// //     });
// //   };

// //   return (
// //     <div className="orders-page">
// //       <h2 className="heading">🧾 Order Management</h2>

// //       {/* Search Bar */}
// //       <input
// //         type="text"
// //         placeholder="Search by customer name..."
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //         className="search-input"
// //       />

// //       {/* Form */}
// //       <form className="order-form" onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           name="customerName"
// //           placeholder="Customer Name"
// //           value={form.customerName}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={form.email}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           type="text"
// //           name="serviceType"
// //           placeholder="Service Type"
// //           value={form.serviceType}
// //           onChange={handleChange}
// //           required
// //         />

// //         <input
// //           type="number"
// //           name="price"
// //           placeholder="Price"
// //           value={form.price}
// //           onChange={handleChange}
// //           required
// //         />

// //         <select name="status" value={form.status} onChange={handleChange}>
// //           <option value="Pending">Pending</option>
// //           <option value="In Progress">In Progress</option>
// //           <option value="Completed">Completed</option>
// //         </select>

// //         <input type="file" name="file" onChange={handleChange} />

// //         <button type="submit" disabled={loading} className="submit-btn">
// //           {loading ? (
// //             <Loader2 className="spinner" />
// //           ) : editingId ? (
// //             <>
// //               <CheckCircle size={18} /> Update Order
// //             </>
// //           ) : (
// //             <>
// //               <PlusCircle size={18} /> Create Order
// //             </>
// //           )}
// //         </button>
// //       </form>

// //       {/* Orders Table */}
// //       <div className="orders-table">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Customer</th>
// //               <th>Email</th>
// //               <th>Service</th>
// //               <th>Price</th>
// //               <th>Status</th>
// //               <th>File</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {orders.map((o) => (
// //               <tr key={o._id}>
// //                 <td>{o.customerName}</td>
// //                 <td>{o.email}</td>
// //                 <td>{o.serviceType}</td>
// //                 <td>₹{o.price}</td>
// //                 <td>{o.status}</td>

// //                 {/* CLOUDINARY FILE LINK */}
// //                 <td>
// //                   {o.fileUrl ? (
// //                     <a
// //                       href={o.fileUrl}
// //                       target="_blank"
// //                       rel="noreferrer"
// //                       style={{ color: "blue" }}
// //                     >
// //                       View
// //                     </a>
// //                   ) : (
// //                     "—"
// //                   )}
// //                 </td>

// //                 <td>
// //                   <button onClick={() => editOrder(o)} className="edit-btn">
// //                     <Edit2 size={16} />
// //                   </button>
// //                   <button onClick={() => deleteOrder(o._id)} className="delete-btn">
// //                     <Trash2 size={16} />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>

// //         </table>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Loader2, PlusCircle, Trash2, Edit2, CheckCircle } from "lucide-react";
// import "./Orders.css";

// const API = `${process.env.REACT_APP_API_URL}/orders`;

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [search, setSearch] = useState("");
//   const [form, setForm] = useState({
//     customerName: "",
//     email: "",
//     serviceType: "",
//     price: "",
//     status: "Pending",
//     file: null,
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(`${API}?search=${search}`);
//       setOrders(res.data);
//     } catch (err) {
//       console.error("Fetch error", err);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [search]);

//   // Input handler
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) setForm({ ...form, file: files[0] });
//     else setForm({ ...form, [name]: value });
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const fd = new FormData();
//     Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

//     try {
//       if (editingId) {
//         await axios.put(`${API}/${editingId}`, fd);
//       } else {
//         await axios.post(API, fd);
//       }

//       fetchOrders();
//       resetForm();
//     } catch (err) {
//       console.error("Save failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete order
//   const deleteOrder = async (id) => {
//     if (!window.confirm("Delete this order?")) return;
//     await axios.delete(`${API}/${id}`);
//     fetchOrders();
//   };

//   // Edit
//   const editOrder = (order) => {
//     setEditingId(order._id);
//     setForm({
//       customerName: order.customerName,
//       email: order.email,
//       serviceType: order.serviceType,
//       price: order.price,
//       status: order.status,
//       file: null,
//     });
//   };

//   // Reset
//   const resetForm = () => {
//     setEditingId(null);
//     setForm({
//       customerName: "",
//       email: "",
//       serviceType: "",
//       price: "",
//       status: "Pending",
//       file: null,
//     });
//   };

//   return (
//     <div className="orders-page">
//       <h2 className="heading">🧾 Order Management</h2>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search by customer name..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="search-input"
//       />

//       {/* Form */}
//       <form className="order-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="customerName"
//           placeholder="Customer Name"
//           value={form.customerName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="serviceType"
//           placeholder="Service Type"
//           value={form.serviceType}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           required
//         />

//         <select name="status" value={form.status} onChange={handleChange}>
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>

//         <input type="file" name="file" onChange={handleChange} />

//         <button type="submit" disabled={loading} className="submit-btn">
//           {loading ? (
//             <Loader2 className="spinner" />
//           ) : editingId ? (
//             <>
//               <CheckCircle size={18} /> Update Order
//             </>
//           ) : (
//             <>
//               <PlusCircle size={18} /> Create Order
//             </>
//           )}
//         </button>
//       </form>

//       {/* Table */}
//       <div className="orders-table">
//         <table>
//           <thead>
//             <tr>
//               <th>Customer</th>
//               <th>Email</th>
//               <th>Service</th>
//               <th>Price</th>
//               <th>Status</th>
//               <th>File</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o) => (
//               <tr key={o._id}>
//                 <td>{o.customerName}</td>
//                 <td>{o.email}</td>
//                 <td>{o.serviceType}</td>
//                 <td>₹{o.price}</td>
//                 <td>{o.status}</td>

//                 <td>
//                   {o.fileUrl ? (
//                     <a href={o.fileUrl} target="_blank" rel="noreferrer">
//                       View
//                     </a>
//                   ) : (
//                     "—"
//                   )}
//                 </td>

//                 <td>
//                   <button onClick={() => editOrder(o)} className="edit-btn">
//                     <Edit2 size={16} />
//                   </button>
//                   <button onClick={() => deleteOrder(o._id)} className="delete-btn">
//                     <Trash2 size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>

//         </table>
//       </div>
//     </div>
//   );
// }


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

  // ============================
  // Fetch Orders
  // ============================
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}?search=${search}`);

      console.log("API RESPONSE:", res.data);

      // VALIDATE response
      setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
    } catch (err) {
      console.error("Fetch error", err);
      setOrders([]); // prevent crash
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [search]);

  // ============================
  // Handle Form Change
  // ============================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ============================
  // Submit Form
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) fd.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, fd);
      } else {
        await axios.post(API, fd);
      }

      resetForm();
      fetchOrders();
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // Delete Order
  // ============================
  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchOrders();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ============================
  // Edit Order
  // ============================
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

  // ============================
  // Reset
  // ============================
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

        <button type="submit" className="submit-btn" disabled={loading}>
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

      {/* Orders Table */}
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
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((o) => (
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
                    <button
                      onClick={() => editOrder(o)}
                      className="edit-btn"
                    >
                      <Edit2 size={16} />
                    </button>

                    <button
                      onClick={() => deleteOrder(o._id)}
                      className="delete-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
