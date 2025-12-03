// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Astrologers.css";

// export default function Astrologers() {
//   const [astrologers, setAstrologers] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     specialization: "",
//     experience: "",
//     rating: "",
//     about: "",
//   });
//   const [editingId, setEditingId] = useState(null);

//   // ✅ Fetch astrologers
//   const fetchAstrologers = async () => {
//     const res = await axios.get("https://localhost:7000/api/astrologers");
//     setAstrologers(res.data);
//   };

//   useEffect(() => {
//     fetchAstrologers();
//   }, []);

//   // ✅ Handle submit (Add / Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`https://localhost:7000/api/astrologers/${editingId}`, formData);
//       setEditingId(null);
//     } else {
//       await axios.post("https://localhost:7000/api/astrologers", formData);
//     }
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       specialization: "",
//       experience: "",
//       rating: "",
//       about: "",
//     });
//     fetchAstrologers();
//   };

//   const handleEdit = (astro) => {
//     setFormData(astro);
//     setEditingId(astro._id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this astrologer?")) {
//       await axios.delete(`https://localhost:7000/api/astrologers/${id}`);
//       fetchAstrologers();
//     }
//   };

//   return (
//     <div className="astrologers-container">
//       <h2>Astrologer Management</h2>

//       <form className="astrologer-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={formData.name}
//           required
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={formData.email}
//           required
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Phone"
//           value={formData.phone}
//           onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Specialization"
//           value={formData.specialization}
//           onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Experience (years)"
//           value={formData.experience}
//           onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Rating (1–5)"
//           value={formData.rating}
//           onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
//         />
//         <textarea
//           placeholder="About"
//           value={formData.about}
//           onChange={(e) => setFormData({ ...formData, about: e.target.value })}
//         ></textarea>

//         <button type="submit">{editingId ? "Update" : "Add Astrologer"}</button>
//       </form>

//       <table className="astrologers-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Specialization</th>
//             <th>Experience</th>
//             <th>Rating</th>
//             <th>About</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {astrologers.map((a) => (
//             <tr key={a._id}>
//               <td>{a.name}</td>
//               <td>{a.email}</td>
//               <td>{a.phone}</td>
//               <td>{a.specialization}</td>
//               <td>{a.experience}</td>
//               <td>{a.rating}</td>
//               <td>{a.about}</td>
//               <td>
//                 <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
//                 <button className="delete-btn" onClick={() => handleDelete(a._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Astrologers.css";

const SPECIALIZATIONS = [
  "Astrology",
  "Numerology",
  "Face Reading",
  "Palmistry",
  "Tarot Card",
  "Vastu"
];

export default function Astrologers() {
  const [astrologers, setAstrologers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: SPECIALIZATIONS[0],
    experience: "",
    rating: "",
    about: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  // Fetch astrologers with optional search
  const fetchAstrologers = async () => {
    const res = await axios.get(`https://adminastrotalk-1.onrender.com/api/astrologers${search ? `?search=${search}` : ""}`);
    setAstrologers(res.data);
  };

  useEffect(() => {
    fetchAstrologers();
  }, [search]);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`https://adminastrotalk-1.onrender.com/api/astrologers/${editingId}`, formData);
      setEditingId(null);
    } else {
      await axios.post("https://adminastrotalk-1.onrender.com/api/astrologers", formData);
    }
    setFormData({
      name: "",
      email: "",
      phone: "",
      specialization: SPECIALIZATIONS[0],
      experience: "",
      rating: "",
      about: "",
    });
    fetchAstrologers();
  };

  const handleEdit = (astro) => {
    setFormData(astro);
    setEditingId(astro._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this astrologer?")) {
      await axios.delete(`https://adminastrotalk-1.onrender.com/api/astrologers/${id}`);
      fetchAstrologers();
    }
  };

  return (
    <div className="astrologers-container">
      <h2>Astrologer Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* Add / Edit Form */}
      <form className="astrologer-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />

        {/* Specialization Dropdown */}
        <select
          value={formData.specialization}
          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        >
          {SPECIALIZATIONS.map((spec) => (
            <option key={spec} value={spec}>{spec}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
        />
        <input
          type="number"
          placeholder="Rating (1–5)"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
        />
        <textarea
          placeholder="About"
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
        ></textarea>

        <button type="submit">{editingId ? "Update" : "Add"} Astrologer</button>
      </form>

      {/* Astrologers Table */}
      <table className="astrologers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Rating</th>
            <th>About</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {astrologers.map((a) => (
            <tr key={a._id}>
              <td>{a.name}</td>
              <td>{a.email}</td>
              <td>{a.phone}</td>
              <td>{a.specialization}</td>
              <td>{a.experience}</td>
              <td>{a.rating}</td>
              <td>{a.about}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(a)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(a._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
