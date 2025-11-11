

// // import React, { useEffect, useState } from "react";
// // import { submissionApi } from "../api/api";

// // export default function Submissions({ token }) {
// //   const [submissions, setSubmissions] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const fetchSubmissions = async () => {
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const res = await submissionApi.get("/", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       console.log("API Response:", res.data); // Debug API response

// //       if (Array.isArray(res.data.submissions)) {
// //         setSubmissions(res.data.submissions);
// //       } else if (Array.isArray(res.data)) {
// //         setSubmissions(res.data); // fallback
// //       } else {
// //         setSubmissions([]);
// //         setError("No submissions found in response.");
// //       }
// //     } catch (err) {
// //       console.error("Error fetching submissions:", err);
// //       setError(err.response?.data?.message || err.message || "Failed to fetch submissions.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchSubmissions();
// //   }, []);

// //   return (
// //     <div className="submissions-container">
// //       <h2>Form Submissions</h2>

// //       {loading ? (
// //         <p>Loading submissions...</p>
// //       ) : error ? (
// //         <p className="error">{error}</p>
// //       ) : submissions.length === 0 ? (
// //         <p className="no-submissions">No submissions yet.</p>
// //       ) : (
// //         <div className="table-wrapper">
// //           <table className="submission-table">
// //             <thead>
// //               <tr>
// //                 <th>Form Title</th>
// //                 <th>Submitted By</th>
// //                 <th>Submission Data</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {submissions.map((s) => (
// //                 <tr key={s._id || Math.random()}>
// //                   <td>{s.formId?.title || "Form"}</td>
// //                   <td>{s.userEmail || "Anonymous"}</td>
// //                   <td>
// //                     <pre>{JSON.stringify(s.data, null, 2)}</pre>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       <style jsx>{`
// //         .submissions-container {
// //           padding: 20px;
// //           max-width: 1000px;
// //           margin: 20px auto;
// //           background: #f9fafb;
// //           border-radius: 10px;
// //           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
// //         }
// //         h2 {
// //           margin-bottom: 20px;
// //           color: #1e293b;
// //           text-align: center;
// //         }
// //         .table-wrapper {
// //           overflow-x: auto;
// //         }
// //         table.submission-table {
// //           width: 100%;
// //           border-collapse: collapse;
// //         }
// //         table th,
// //         table td {
// //           padding: 12px;
// //           border: 1px solid #e2e8f0;
// //           text-align: left;
// //           vertical-align: top;
// //         }
// //         table th {
// //           background: #f1f5f9;
// //           color: #1e293b;
// //         }
// //         table td pre {
// //           background: #f1f5f9;
// //           padding: 10px;
// //           border-radius: 5px;
// //           overflow-x: auto;
// //           font-size: 13px;
// //           white-space: pre-wrap;
// //         }
// //         .no-submissions,
// //         .error {
// //           text-align: center;
// //           color: #64748b;
// //         }
// //         .error {
// //           color: red;
// //         }

// //         @media (max-width: 600px) {
// //           table th,
// //           table td {
// //             padding: 8px;
// //             font-size: 12px;
// //           }
// //           table td pre {
// //             font-size: 11px;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import { formApi, submissionApi } from "../api/api";

// export default function FormSubmit({ token }) {
//   const [forms, setForms] = useState([]);
//   const [selectedForm, setSelectedForm] = useState("");
//   const [formData, setFormData] = useState({});
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchForms = async () => {
//       const res = await formApi.get("/service/all", { headers: { Authorization: `Bearer ${token}` } });
//       setForms(res.data);
//     };
//     fetchForms();
//   }, []);

//   const handleChange = (field, value) => setFormData({ ...formData, [field]: value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedForm) return alert("Select a form");

//     try {
//       await submissionApi.post("/", { formId: selectedForm, userEmail: "test@example.com", data: formData }, { headers: { Authorization: `Bearer ${token}` } });
//       setMessage("✅ Form submitted successfully!");
//       setFormData({});
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Submission failed");
//     }
//   };

//   const renderFields = () => {
//     const form = forms.find(f => f._id === selectedForm);
//     if (!form) return null;

//     return form.fields.map((f, idx) => (
//       <input
//         key={idx}
//         placeholder={f.label}
//         type={f.type}
//         required={f.required}
//         value={formData[f.label] || ""}
//         onChange={e => handleChange(f.label, e.target.value)}
//       />
//     ));
//   };

//   return (
//     <div>
//       <h2>Submit Form</h2>
//       <select value={selectedForm} onChange={e => setSelectedForm(e.target.value)}>
//         <option value="">Select Form</option>
//         {forms.map(f => <option key={f._id} value={f._id}>{f.title}</option>)}
//       </select>

//       {selectedForm && <form onSubmit={handleSubmit}>
//         {renderFields()}
//         <button type="submit">Submit</button>
//       </form>}

//       {message && <p>{message}</p>}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";

const Submissions = () => {
  const [forms, setForms] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({});
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchForms();
    fetchServices();
    fetchSubmissions();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await axios.get("https://adminastrotalk-1.onrender.com/api/forms");
      console.log("Forms response:", res.data);
      if (res.data.success) setForms(res.data.forms);
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get("https://adminastrotalk-1.onrender.com/api/services");
      console.log("Services response:", res.data);
      if (res.data.success) setServices(res.data.services);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get("https://adminastrotalk-1.onrender.com/api/submissions");
      console.log("Submissions response:", res.data);
      if (res.data.success) setSubmissions(res.data.submissions);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedForm) return alert("Please select a form!");

    try {
      await axios.post("https://adminastrotalk-1.onrender.com/api/submissions", {
        formId: selectedForm,
        serviceId: selectedService || null,
        userEmail: "user@example.com", // replace with actual user if needed
        data: formData,
      });
      alert("Submission successful!");
      setFormData({});
      setSelectedForm("");
      setSelectedService("");
      fetchSubmissions();
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Failed to submit form. Check console.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "15px" }}>Create Submission</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px", marginBottom: "30px" }}>
        <div>
          <label>Select Form:</label>
          <select
            value={selectedForm}
            onChange={(e) => setSelectedForm(e.target.value)}
            required
            style={{ width: "100%", padding: "5px", marginTop: "5px" }}
          >
            <option value="">--Select Form--</option>
            {forms.map((f) => (
              <option key={f._id} value={f._id}>
                {f.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Service:</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            style={{ width: "100%", padding: "5px", marginTop: "5px" }}
          >
            <option value="">--Select Service--</option>
            {services.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Field 1:</label>
          <input
            type="text"
            value={formData.field1 || ""}
            onChange={(e) => setFormData({ ...formData, field1: e.target.value })}
            style={{ width: "100%", padding: "5px", marginTop: "5px" }}
          />
        </div>

        <div>
          <label>Field 2:</label>
          <input
            type="text"
            value={formData.field2 || ""}
            onChange={(e) => setFormData({ ...formData, field2: e.target.value })}
            style={{ width: "100%", padding: "5px", marginTop: "5px" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px", backgroundColor: "#007BFF", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>

      <h2 style={{ marginBottom: "10px" }}>All Submissions</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ccc" }}>
              <th style={{ padding: "10px" }}>Form</th>
              <th style={{ padding: "10px" }}>Service</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Data</th>
              <th style={{ padding: "10px" }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s._id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{s.formId?.title || s.formId}</td>
                <td style={{ padding: "10px" }}>{s.serviceId?.name || "-"}</td>
                <td style={{ padding: "10px" }}>{s.userEmail}</td>
                <td style={{ padding: "10px" }}>{JSON.stringify(s.data)}</td>
                <td style={{ padding: "10px" }}>{new Date(s.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Submissions;
