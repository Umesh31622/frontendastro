// import React, { useState, useEffect } from "react";
// import { submissionApi, formApi } from "../api";

// export default function SubmissionDashboard() {
//   const [forms, setForms] = useState([]);
//   const [submissions, setSubmissions] = useState([]);
//   const [selectedForm, setSelectedForm] = useState("");

//   const fetchForms = async () => {
//     const res = await formApi.get("/service/all"); // optionally fetch all forms
//     setForms(res.data);
//   };

//   const fetchSubmissions = async (formId) => {
//     const res = await submissionApi.get(`/form/${formId}`);
//     setSubmissions(res.data);
//   };

//   useEffect(() => { fetchForms(); }, []);

//   return (
//     <div>
//       <h2>Submission Dashboard</h2>
//       <select value={selectedForm} onChange={e => {
//         setSelectedForm(e.target.value);
//         fetchSubmissions(e.target.value);
//       }}>
//         <option value="">Select Form</option>
//         {forms.map(f => <option key={f._id} value={f._id}>{f.title}</option>)}
//       </select>

//       <table>
//         <thead>
//           <tr>
//             <th>Submission ID</th>
//             <th>Data</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submissions.map(s => (
//             <tr key={s._id}>
//               <td>{s._id}</td>
//               <td>{JSON.stringify(s.data)}</td>
//               <td>{s.status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { formApi, submissionApi } from "../api";

export default function SubmissionDashboard({ token }) {
  const [forms, setForms] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all forms
  const fetchForms = async () => {
    try {
      const res = await formApi.get("/service/all", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setForms(res.data);
    } catch (err) {
      console.error("Error fetching forms:", err);
      setError(err.response?.data?.message || err.message);
    }
  };

  // Fetch submissions based on selected form
  const fetchSubmissions = async (formId) => {
    if (!formId) {
      setSubmissions([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await submissionApi.get(`/form/${formId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSubmissions(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch submissions.");
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="submissions-container">
      <h2>Submission Dashboard</h2>

      {error && <p className="error">{error}</p>}

      <select
        value={selectedForm}
        onChange={(e) => {
          setSelectedForm(e.target.value);
          fetchSubmissions(e.target.value);
        }}
      >
        <option value="">Select Form</option>
        {forms.map((f) => (
          <option key={f._id} value={f._id}>
            {f.title}
          </option>
        ))}
      </select>

      {loading ? (
        <p>Loading submissions...</p>
      ) : submissions.length === 0 ? (
        <p className="no-submissions">No submissions found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="submission-table">
            <thead>
              <tr>
                <th>Submission ID</th>
                <th>Form Title</th>
                <th>Submitted By</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s._id}>
                  <td>{s._id}</td>
                  <td>{s.formId?.title || "Form"}</td>
                  <td>{s.userEmail || "Anonymous"}</td>
                  <td>
                    <pre>{JSON.stringify(s.data, null, 2)}</pre>
                  </td>
                  <td>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .submissions-container {
          padding: 20px;
          max-width: 1000px;
          margin: 20px auto;
          background: #f9fafb;
          border-radius: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        select {
          display: block;
          margin: 0 auto 20px auto;
          padding: 8px 12px;
          font-size: 16px;
        }
        .table-wrapper {
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th,
        td {
          border: 1px solid #e2e8f0;
          padding: 10px;
          text-align: left;
          vertical-align: top;
        }
        th {
          background: #f1f5f9;
        }
        td pre {
          background: #f1f5f9;
          padding: 8px;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 13px;
          white-space: pre-wrap;
        }
        .error {
          color: red;
          text-align: center;
          margin-bottom: 10px;
        }
        .no-submissions {
          text-align: center;
          color: #64748b;
        }
      `}</style>
    </div>
  );
}
