// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://adminastrotalk-1.onrender.com/api/our-cilents";

// export default function OurCilents() {
//   const [cilents, setCilents] = useState([]);
//   const [formOpen, setFormOpen] = useState(false);
//   const [editing, setEditing] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     image: "",
//     description: "",
//   });

//   const loadData = async () => {
//     const res = await axios.get(API);
//     if (res.data.success) setCilents(res.data.cilents);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const save = async () => {
//     if (editing) {
//       await axios.put(`${API}/${editing}`, form);
//     } else {
//       await axios.post(API, form);
//     }
//     loadData();
//     closeForm();
//   };

//   const deleteCilent = async (id) => {
//     if (!window.confirm("Delete?")) return;
//     await axios.delete(`${API}/${id}`);
//     loadData();
//   };

//   const openForm = (data = null) => {
//     setFormOpen(true);
//     if (data) {
//       setEditing(data._id);
//       setForm(data);
//     } else {
//       setEditing(null);
//       setForm({ name: "", image: "", description: "" });
//     }
//   };

//   const closeForm = () => {
//     setFormOpen(false);
//     setEditing(null);
//   };

//   return (
//     <div className="card">
//       <h2>🌟 Our Esteemed Clients</h2>

//       <button onClick={() => openForm()}>+ Add Client</button>

//       {formOpen && (
//         <div className="crud-form">
//           <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
//           <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
//           <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

//           <button onClick={save}>{editing ? "Update" : "Add"}</button>
//           <button onClick={closeForm}>Cancel</button>
//         </div>
//       )}

//       <table className="crud-table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {cilents.map((c) => (
//             <tr key={c._id}>
//               <td><img src={c.image} width="60" /></td>
//               <td>{c.name}</td>
//               <td>{c.description}</td>
//               <td>
//                 <button onClick={() => openForm(c)}>✏️</button>
//                 <button onClick={() => deleteCilent(c._id)}>🗑</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://adminastrotalk-1.onrender.com/api/our-clients";

// export default function OurClients() {
//   const [clients, setClients] = useState([]);
//   const [formOpen, setFormOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [preview, setPreview] = useState(null);

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//   });

//   const [imageFile, setImageFile] = useState(null);

//   // Load all clients
//   const loadData = async () => {
//     try {
//       const res = await axios.get(API);
//       if (res.data.success) setClients(res.data.clients);
//     } catch (err) {
//       console.error("Load Error:", err);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);

//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   // Save (Add or Update)
//   const save = async () => {
//     try {
//       const fd = new FormData();
//       fd.append("name", form.name);
//       fd.append("description", form.description);

//       if (imageFile) fd.append("image", imageFile);

//       if (editing) {
//         await axios.put(`${API}/${editing}`, fd);
//       } else {
//         await axios.post(API, fd);
//       }

//       loadData();
//       closeForm();
//     } catch (err) {
//       console.error("Save Error:", err);
//       alert("Something went wrong!");
//     }
//   };

//   // Delete Client
//   const deleteClient = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     await axios.delete(`${API}/${id}`);
//     loadData();
//   };

//   // OPEN FORM
//   const openForm = (data = null) => {
//     setFormOpen(true);

//     if (data) {
//       setEditing(data._id);
//       setForm({
//         name: data.name,
//         description: data.description,
//       });
//       setPreview(data.image);
//       setImageFile(null);
//     } else {
//       setEditing(null);
//       setForm({
//         name: "",
//         description: "",
//       });
//       setPreview(null);
//       setImageFile(null);
//     }
//   };

//   // CLOSE FORM
//   const closeForm = () => {
//     setFormOpen(false);
//     setEditing(null);
//     setPreview(null);
//     setImageFile(null);
//   };

//   return (
//     <div className="card">
//       <h2>🌟 Our Esteemed Clients</h2>

//       <button onClick={() => openForm()}>+ Add Client</button>

//       {formOpen && (
//         <div className="crud-form">
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Client Name"
//           />

//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Client Description"
//           />

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImage}
//           />

//           {/* Image Preview */}
//           {preview && (
//             <img
//               src={preview}
//               alt="Preview"
//               width="120"
//               style={{ marginTop: "10px", borderRadius: "6px" }}
//             />
//           )}

//           <button onClick={save}>{editing ? "Update" : "Add"}</button>
//           <button onClick={closeForm}>Cancel</button>
//         </div>
//       )}

//       <table className="crud-table">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {clients.map((c) => (
//             <tr key={c._id}>
//               <td>
//                 <img
//                   src={c.image}
//                   width="60"
//                   style={{ borderRadius: "6px" }}
//                   alt=""
//                 />
//               </td>
//               <td>{c.name}</td>
//               <td>{c.description}</td>
//               <td>
//                 <button onClick={() => openForm(c)}>✏️</button>
//                 <button onClick={() => deleteClient(c._id)}>🗑</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const API = "https://adminastrotalk-1.onrender.com/api/our-clients";
const BASE_URL = "https://adminastrotalk-1.onrender.com"; // change if your backend runs elsewhere

export default function OurClients() {
  const [clients, setClients] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const objectUrlRef = useRef(null);

  // Helper: convert stored image path to public URL
  const toPublicUrl = (img) => {
    if (!img) return "";
    // already absolute?
    if (img.startsWith("http://") || img.startsWith("https://")) return img;
    // backend returns "/uploads/xyz.jpg"
    if (img.startsWith("/")) return `${BASE_URL}${img}`;
    // otherwise assume relative
    return `${BASE_URL}/${img}`;
  };

  // Load all clients
  const loadData = async () => {
    try {
      const res = await axios.get(API);
      if (res.data?.success) {
        // API returns { success: true, clients: [...] }
        // But older versions had "cilents" name — normalize:
        const list = res.data.clients || res.data.cilents || [];
        setClients(list);
      } else {
        setClients([]);
      }
    } catch (err) {
      console.error("Load Error:", err?.response?.data || err.message);
      setClients([]);
    }
  };

  useEffect(() => {
    loadData();
    // cleanup on unmount
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // revoke previous
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (file) {
      const objUrl = URL.createObjectURL(file);
      objectUrlRef.current = objUrl;
      setPreview(objUrl);
    } else {
      setPreview(null);
    }
  };

  // Save (Add or Update)
  const save = async () => {
    try {
      if (!form.name?.trim()) {
        return alert("Please enter client name");
      }

      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description || "");

      if (imageFile) fd.append("image", imageFile);

      if (editing) {
        await axios.put(`${API}/${editing}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(API, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await loadData();
      closeForm();
    } catch (err) {
      console.error("Save Error:", err?.response?.data || err.message);
      alert("Something went wrong while saving. Check console / network tab.");
    }
  };

  // Delete Client
  const deleteClient = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      await loadData();
    } catch (err) {
      console.error("Delete Error:", err?.response?.data || err.message);
      alert("Delete failed. Check console.");
    }
  };

  // OPEN FORM
  const openForm = (data = null) => {
    setFormOpen(true);

    if (data) {
      setEditing(data._id);
      setForm({
        name: data.name || "",
        description: data.description || "",
      });
      // if DB stores path like "/uploads/...", prefix base
      setPreview(toPublicUrl(data.image));
      setImageFile(null);
    } else {
      setEditing(null);
      setForm({
        name: "",
        description: "",
      });
      setPreview(null);
      setImageFile(null);
    }
  };

  // CLOSE FORM
  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);

    // revoke any created object URL
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setPreview(null);
    setImageFile(null);
  };

  return (
    <div className="card">
      <h2>🌟 Our Esteemed Clients</h2>

      <button onClick={() => openForm()}>+ Add Client</button>

      {formOpen && (
        <div className="crud-form">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Client Name"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Client Description"
          />

          <input type="file" accept="image/*" onChange={handleImage} />

          {/* Image Preview */}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              width="120"
              style={{ marginTop: "10px", borderRadius: "6px" }}
            />
          )}

          <div style={{ marginTop: 8 }}>
            <button onClick={save}>{editing ? "Update" : "Add"}</button>
            <button onClick={closeForm} style={{ marginLeft: 8 }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <table className="crud-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(clients) && clients.length ? (
            clients.map((c) => (
              <tr key={c._id}>
                <td>
                  <img
                    src={toPublicUrl(c.image)}
                    width="60"
                    style={{ borderRadius: "6px", objectFit: "cover" }}
                    alt={c.name || "client"}
                    onError={(e) => {
                      // fallback if image fails
                      e.currentTarget.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='40' viewBox='0 0 60 40'%3E%3Crect width='100%25' height='100%25' fill='%23eee'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-size='10'%3Eno image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </td>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>
                  <button onClick={() => openForm(c)}>✏️</button>
                  <button onClick={() => deleteClient(c._id)}>🗑</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No clients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
