


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import "./Orders.css";

// // export default function Orders() {
// //   const [orders, setOrders] = useState([]);
// //   const [editingOrder, setEditingOrder] = useState(null);
// //   const [formData, setFormData] = useState({
// //     customerName: "",
// //     email: "",
// //     serviceType: "kundli",
// //     price: "",
// //     status: "Pending",
// //     file: null, // matches backend multer field
// //   });
// //   const [search, setSearch] = useState("");

// //   // Fetch orders from backend
// //   const fetchOrders = async () => {
// //     try {
// //       const res = await axios.get(
// //         `https://adminastrotalk-1.onrender.com/api/orders${search ? `?search=${search}` : ""}`
// //       );
// //       setOrders(res.data);
// //     } catch (error) {
// //       console.error("Failed to fetch orders:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, [search]);

// //   // Handle form submit for add/update
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const data = new FormData();
// //     for (let key in formData) {
// //       if (formData[key]) data.append(key, formData[key]);
// //     }

// //     try {
// //       if (editingOrder) {
// //         await axios.put(
// //           `https://adminastrotalk-1.onrender.com/api/orders/${editingOrder._id}`,
// //           data,
// //           { headers: { "Content-Type": "multipart/form-data" } }
// //         );
// //         setEditingOrder(null);
// //       } else {
// //         await axios.post(
// //           "https://adminastrotalk-1.onrender.com/api/orders",
// //           data,
// //           { headers: { "Content-Type": "multipart/form-data" } }
// //         );
// //       }

// //       setFormData({
// //         customerName: "",
// //         email: "",
// //         serviceType: "kundli",
// //         price: "",
// //         status: "Pending",
// //         file: null,
// //       });

// //       fetchOrders();
// //     } catch (error) {
// //       console.error("Failed to submit order:", error);
// //     }
// //   };

// //   // Populate form for editing
// //   const handleEdit = (order) => {
// //     setEditingOrder(order);
// //     setFormData({
// //       customerName: order.customerName,
// //       email: order.email,
// //       serviceType: order.serviceType,
// //       price: order.price,
// //       status: order.status,
// //       file: null,
// //     });
// //   };

// //   // Delete order
// //   const handleDelete = async (id) => {
// //     if (window.confirm("Are you sure you want to delete this order?")) {
// //       try {
// //         await axios.delete(`https://adminastrotalk-1.onrender.com/api/orders/${id}`);
// //         fetchOrders();
// //       } catch (error) {
// //         console.error("Failed to delete order:", error);
// //       }
// //     }
// //   };

// //   // Status badge helper
// //   const statusBadge = (status) => {
// //     switch (status) {
// //       case "Pending":
// //         return "badge pending";
// //       case "In Progress":
// //         return "badge in-progress";
// //       case "Completed":
// //         return "badge completed";
// //       default:
// //         return "";
// //     }
// //   };

// //   return (
// //     <div className="orders-container">
// //       <h2>Order Management</h2>

// //       <input
// //         type="text"
// //         placeholder="Search by client name..."
// //         className="search-input"
// //         value={search}
// //         onChange={(e) => setSearch(e.target.value)}
// //       />

// //       <form className="order-form" onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           placeholder="Client Name"
// //           value={formData.customerName}
// //           required
// //           onChange={(e) =>
// //             setFormData({ ...formData, customerName: e.target.value })
// //           }
// //         />
// //         <input
// //           type="email"
// //           placeholder="Client Email"
// //           value={formData.email}
// //           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //         />
// //         <select
// //           value={formData.serviceType}
// //           onChange={(e) =>
// //             setFormData({ ...formData, serviceType: e.target.value })
// //           }
// //         >
// //           <option value="kundli">Kundli</option>
// //           <option value="matchmaking">Matchmaking</option>
// //           <option value="remedy">Remedy</option>
// //           <option value="consultation">Consultation</option>
// //         </select>
// //         <input
// //           type="number"
// //           placeholder="Price (₹)"
// //           value={formData.price}
// //           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
// //         />
// //         <select
// //           value={formData.status}
// //           onChange={(e) => setFormData({ ...formData, status: e.target.value })}
// //         >
// //           <option value="Pending">Pending</option>
// //           <option value="In Progress">In Progress</option>
// //           <option value="Completed">Completed</option>
// //         </select>
// //         <input
// //           type="file"
// //           onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
// //         />
// //         <button type="submit">{editingOrder ? "Update" : "Add"} Order</button>
// //       </form>

// //       <table className="orders-table">
// //         <thead>
// //           <tr>
// //             <th>Client Name</th>
// //             <th>Email</th>
// //             <th>Service Type</th>
// //             <th>Price</th>
// //             <th>Status</th>
// //             <th>File</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {orders.map((o) => (
// //             <tr key={o._id}>
// //               <td>{o.customerName}</td>
// //               <td>{o.email}</td>
// //               <td>{o.serviceType}</td>
// //               <td>₹{o.price}</td>
// //               <td>
// //                 <span className={statusBadge(o.status)}>{o.status}</span>
// //               </td>
// //               <td>
// //                 {o.file ? (
// //                   <a
// //                     href={`https://adminastrotalk-1.onrender.com${o.file}`}
// //                     target="_blank"
// //                     rel="noreferrer"
// //                   >
// //                     View File
// //                   </a>
// //                 ) : (
// //                   "N/A"
// //                 )}
// //               </td>
// //               <td>
// //                 <button className="edit-btn" onClick={() => handleEdit(o)}>
// //                   Edit
// //                 </button>
// //                 <button className="delete-btn" onClick={() => handleDelete(o._id)}>
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Orders.css";

// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [editingOrder, setEditingOrder] = useState(null);
//   const [formData, setFormData] = useState({
//     customerName: "",
//     email: "",
//     serviceType: "kundli",
//     price: "",
//     status: "Pending",
//     file: null, // matches multer field
//   });
//   const [search, setSearch] = useState("");

//   // Fetch orders from backend
//   const fetchOrders = async () => {
//     try {
//       const res = await axios.get(
//         `https://adminastrotalk-1.onrender.com/api/orders${search ? `?search=${search}` : ""}`
//       );
//       setOrders(res.data);
//     } catch (error) {
//       console.error("Failed to fetch orders:", error);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [search]);

//   // Handle form submit for add/update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     for (let key in formData) {
//       if (formData[key]) data.append(key, formData[key]);
//     }

//     try {
//       if (editingOrder) {
//         await axios.put(
//           `https://adminastrotalk-1.onrender.com/api/orders/${editingOrder._id}`,
//           data,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         setEditingOrder(null);
//       } else {
//         await axios.post(
//           "https://adminastrotalk-1.onrender.com/api/orders",
//           data,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//       }

//       setFormData({
//         customerName: "",
//         email: "",
//         serviceType: "kundli",
//         price: "",
//         status: "Pending",
//         file: null,
//       });

//       fetchOrders();
//     } catch (error) {
//       console.error("Failed to submit order:", error);
//     }
//   };

//   // Populate form for editing
//   const handleEdit = (order) => {
//     setEditingOrder(order);
//     setFormData({
//       customerName: order.customerName,
//       email: order.email,
//       serviceType: order.serviceType,
//       price: order.price,
//       status: order.status,
//       file: null,
//     });
//   };

//   // Delete order
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       try {
//         await axios.delete(`https://adminastrotalk-1.onrender.com/api/orders/${id}`);
//         fetchOrders();
//       } catch (error) {
//         console.error("Failed to delete order:", error);
//       }
//     }
//   };

//   // Status badge helper
//   const statusBadge = (status) => {
//     switch (status) {
//       case "Pending":
//         return "badge pending";
//       case "In Progress":
//         return "badge in-progress";
//       case "Completed":
//         return "badge completed";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div className="orders-container">
//       <h2>Order Management</h2>

//       <input
//         type="text"
//         placeholder="Search by client name..."
//         className="search-input"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       <form className="order-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Client Name"
//           value={formData.customerName}
//           required
//           onChange={(e) =>
//             setFormData({ ...formData, customerName: e.target.value })
//           }
//         />
//         <input
//           type="email"
//           placeholder="Client Email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//         <select
//           value={formData.serviceType}
//           onChange={(e) =>
//             setFormData({ ...formData, serviceType: e.target.value })
//           }
//         >
//           <option value="kundli">Kundli</option>
//           <option value="matchmaking">Matchmaking</option>
//           <option value="remedy">Remedy</option>
//           <option value="consultation">Consultation</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Price (₹)"
//           value={formData.price}
//           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//         />
//         <select
//           value={formData.status}
//           onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//         >
//           <option value="Pending">Pending</option>
//           <option value="In Progress">In Progress</option>
//           <option value="Completed">Completed</option>
//         </select>

//         {/* File input */}
//         <input
//           type="file"
//           onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
//         />

//         {/* Show current file if editing */}
//         {editingOrder && editingOrder.fileUrl && (
//           <div className="current-file">
//             Current file:{" "}
//             <a
//               href={`https://adminastrotalk-1.onrender.com${editingOrder.fileUrl}`}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               📎 View File
//             </a>
//           </div>
//         )}

//         <button type="submit">{editingOrder ? "Update" : "Add"} Order</button>
//       </form>

//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Client Name</th>
//             <th>Email</th>
//             <th>Service Type</th>
//             <th>Price</th>
//             <th>Status</th>
//             <th>File</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((o) => (
//             <tr key={o._id}>
//               <td>{o.customerName}</td>
//               <td>{o.email}</td>
//               <td>{o.serviceType}</td>
//               <td>₹{o.price}</td>
//               <td>
//                 <span className={statusBadge(o.status)}>{o.status}</span>
//               </td>
//               <td>
//                 {o.fileUrl ? (
//                   <a
//                     href={`https://adminastrotalk-1.onrender.com${o.fileUrl}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="file-link"
//                   >
//                     📎 View File
//                   </a>
//                 ) : (
//                   <span className="no-file">No file uploaded</span>
//                 )}
//               </td>
//               <td>
//                 <button className="edit-btn" onClick={() => handleEdit(o)}>
//                   Edit
//                 </button>
//                 <button className="delete-btn" onClick={() => handleDelete(o._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { serviceApi } from "../api/api";

export default function Services({ token }) {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    timeline: "",
    media: null, // for file upload
  });

  // Fetch services
  const fetchServices = async () => {
    try {
      const res = await serviceApi.get("/", { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) setServices(res.data.services);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) data.append(key, formData[key]);
    }

    try {
      if (editingService) {
        await serviceApi.put(`/${editingService._id}`, data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        setEditingService(null);
      } else {
        await serviceApi.post("/", data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }
      setFormData({ name: "", description: "", price: "", timeline: "", media: null });
      fetchServices();
    } catch (err) {
      console.error("Failed to submit service:", err);
    }
  };

  // Populate form for editing
  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price || "",
      timeline: service.timeline || "",
      media: null,
    });
  };

  // Delete service
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await serviceApi.delete(`/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchServices();
    } catch (err) {
      console.error("Failed to delete service:", err);
    }
  };

  return (
    <div className="services-container">
      <h2>Services</h2>

      {/* Service Form */}
      <form className="service-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Service Name"
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Timeline"
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFormData({ ...formData, media: e.target.files })}
        />

        {/* Show current files if editing */}
        {editingService && editingService.media && editingService.media.length > 0 && (
          <div className="current-files">
            {editingService.media.map((file, idx) => (
              <a
                key={idx}
                href={`https://adminastrotalk-1.onrender.com${file}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                📎 View File {idx + 1}
              </a>
            ))}
          </div>
        )}

        <button type="submit">{editingService ? "Update" : "Add"} Service</button>
      </form>

      {/* Services Table */}
      <table className="services-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Timeline</th>
            <th>Media</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.description}</td>
              <td>₹{s.price || "N/A"}</td>
              <td>{s.timeline || "N/A"}</td>
              <td>
                {s.media && s.media.length > 0 ? (
                  s.media.map((file, idx) => (
                    <a
                      key={idx}
                      href={`https://adminastrotalk-1.onrender.com${file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="file-link"
                    >
                      📎 File {idx + 1}
                    </a>
                  ))
                ) : (
                  <span>No file uploaded</span>
                )}
              </td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(s._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .services-container {
          max-width: 1000px;
          margin: 20px auto;
          padding: 20px;
          background: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        h2 { text-align: center; margin-bottom: 20px; color: #1f2937; }
        .service-form {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        .service-form input, .service-form button {
          flex: 1 1 200px;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #d1d5db;
        }
        .service-form button {
          flex: 1 1 100px;
          background-color: #3b82f6;
          color: white;
          border: none;
          cursor: pointer;
        }
        .service-form button:hover { background-color: #2563eb; }
        .current-files a {
          display: block;
          margin: 5px 0;
          color: #2563eb;
        }
        .services-table {
          width: 100%;
          border-collapse: collapse;
        }
        .services-table th, .services-table td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        .services-table th { background-color: #f3f4f6; }
        .file-link { display: block; color: #2563eb; }
        .edit-btn { background-color: #10b981; color: white; border: none; padding: 5px 10px; margin-right: 5px; cursor: pointer; }
        .delete-btn { background-color: #ef4444; color: white; border: none; padding: 5px 10px; cursor: pointer; }
        .edit-btn:hover, .delete-btn:hover { opacity: 0.85; }

        @media (max-width: 768px) {
          .service-form { flex-direction: column; }
          .service-form input, .service-form button { flex: 1 1 100%; }
        }
      `}</style>
    </div>
  );
}
