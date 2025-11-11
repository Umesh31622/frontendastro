// import React, { useState, useEffect } from "react";
// import { fetchVault, uploadContent, updateVaultItem, deleteVaultItem } from "../api/api";

// export default function ContentVaultManager() {
//   const [contentList, setContentList] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [currentItem, setCurrentItem] = useState({
//     id: null,
//     title: "",
//     type: "pdf",
//     access: "free",
//     tags: "",
//     file: null,
//     scheduledDate: ""
//   });
//   const [loading, setLoading] = useState(false);

//   // ================== Load content ==================
//   const loadContent = async () => {
//     setLoading(true);
//     try {
//       const res = await fetchVault();
//       setContentList(res.data.data || []);
//     } catch (err) {
//       console.error("Failed to load content:", err);
//       setContentList([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => { loadContent(); }, []);

//   // ================== Save (Add / Update) ==================
//   const saveItem = async () => {
//     if (!currentItem.title.trim()) return alert("Title cannot be empty!");

//     const formData = new FormData();
//     formData.append("title", currentItem.title);
//     formData.append("type", currentItem.type);
//     formData.append("access", currentItem.access);
//     formData.append("tags", currentItem.tags);
//     if (currentItem.file) formData.append("file", currentItem.file);
//     if (currentItem.scheduledDate) formData.append("scheduledDate", currentItem.scheduledDate);

//     try {
//       if (currentItem.id) {
//         await updateVaultItem(currentItem.id, formData);
//       } else {
//         await uploadContent(formData);
//       }

//       setModalOpen(false);
//       setCurrentItem({ id: null, title: "", type: "pdf", access: "free", tags: "", file: null, scheduledDate: "" });
//       loadContent();
//     } catch (err) {
//       console.error("Failed to save content:", err.response?.data || err.message);
//       alert("Failed to save content. Check backend route.");
//     }
//   };

//   // ================== Delete ==================
//   const deleteItem = async (id) => {
//     if (!window.confirm("Delete this content?")) return;
//     try {
//       await deleteVaultItem(id);
//       loadContent();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete content.");
//     }
//   };

//   // ================== File Preview ==================
//   const renderLivePreview = () => {
//     if (!currentItem.file) return null;
//     const fileURL = URL.createObjectURL(currentItem.file);
//     switch (currentItem.type) {
//       case "pdf": return <iframe src={fileURL} title="PDF Preview" width="100%" height="300px"></iframe>;
//       case "audio": return <audio controls src={fileURL} style={{ width: "100%" }}></audio>;
//       case "video": return <video controls style={{ width: "100%" }}><source src={fileURL} type="video/mp4" /></video>;
//       default: return <p>Preview not available</p>;
//     }
//   };

//   const formatDate = (dateStr) => dateStr ? new Date(dateStr).toLocaleString() : "-";

//   // ================== Render File in Table ==================
//   const renderFileInTable = (item) => {
//     if (!item.fileUrl) return "-";
//     const url = item.fileUrl.startsWith("http") ? item.fileUrl : `${process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/"}/${item.fileUrl}`;
//     switch (item.type) {
//       case "pdf": return <a href={url} target="_blank" rel="noreferrer">📄 PDF</a>;
//       case "audio": return <audio controls src={url}></audio>;
//       case "video": return <video controls width="200"><source src={url} type="video/mp4" />Your browser does not support video</video>;
//       default: return <a href={url} target="_blank" rel="noreferrer">📂 File</a>;
//     }
//   };

//   return (
//     <div className="vault-wrapper">
//       <h2>Content & Learning Vault</h2>
//       <button className="add-btn" onClick={() => setModalOpen(true)}>➕ Add Content</button>

//       {loading ? <p>Loading...</p> : (
//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Type</th>
//                 <th>Access</th>
//                 <th>Tags</th>
//                 <th>Scheduled</th>
//                 <th>File</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {contentList.length ? contentList.map(item => (
//                 <tr key={item._id}>
//                   <td>{item.title}</td>
//                   <td>{item.type}</td>
//                   <td>{item.access}</td>
//                   <td>{item.tags?.join(", ") || "-"}</td>
//                   <td>{item.scheduledDate ? formatDate(item.scheduledDate) : "-"}</td>
//                   <td>{renderFileInTable(item)}</td>
//                   <td className="actions">
//                     <button onClick={() => {
//                       setCurrentItem({
//                         ...item,
//                         tags: item.tags?.join(","),
//                         file: null,
//                         scheduledDate: item.scheduledDate ? item.scheduledDate.slice(0,16) : ""
//                       });
//                       setModalOpen(true);
//                     }}>✏️ Edit</button>
//                     <button onClick={() => deleteItem(item._id)}>🗑️ Delete</button>
//                   </td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan="7" style={{ textAlign: "center" }}>No content available</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ================= Modal Form ================= */}
//       {modalOpen && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>{currentItem.id ? "Edit" : "Add"} Content</h3>
//             <div className="form-grid">
//               <input placeholder="Title" value={currentItem.title} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
//               <select value={currentItem.type} onChange={e => setCurrentItem({ ...currentItem, type: e.target.value })}>
//                 <option value="pdf">PDF</option>
//                 <option value="audio">Audio</option>
//                 <option value="video">Video</option>
//                 <option value="blog">Blog</option>
//                 <option value="prompt">Prompt</option>
//               </select>
//               <select value={currentItem.access} onChange={e => setCurrentItem({ ...currentItem, access: e.target.value })}>
//                 <option value="free">Free</option>
//                 <option value="paid">Paid</option>
//                 <option value="program">Program</option>
//               </select>
//               <input placeholder="Tags (comma separated)" value={currentItem.tags} onChange={e => setCurrentItem({ ...currentItem, tags: e.target.value })} />
//               <input type="file" onChange={e => setCurrentItem({ ...currentItem, file: e.target.files[0] })} />
//               <input type="datetime-local" value={currentItem.scheduledDate} onChange={e => setCurrentItem({ ...currentItem, scheduledDate: e.target.value })} />
//             </div>

//             <div className="preview">{renderLivePreview()}</div>

//             <div className="modal-actions">
//               <button onClick={saveItem}>{currentItem.id ? "Save" : "Add"}</button>
//               <button onClick={() => setModalOpen(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ================= Styles ================= */}
//       <style>{`
//         .vault-wrapper { max-width:1000px; margin:auto; padding:20px; background:#1e293b; color:#cbd5e1; border-radius:12px; }
//         h2 { color:#3b82f6; text-align:center; margin-bottom:20px; }
//         .add-btn { background:#3b82f6; border:none; border-radius:8px; color:white; padding:10px 16px; cursor:pointer; margin-bottom:20px; }
//         .table-container { overflow-x:auto; }
//         table { width:100%; border-collapse:collapse; }
//         th, td { padding:10px; border-bottom:1px solid #374151; text-align:left; vertical-align:middle; }
//         th { background:#111827; color:#3b82f6; }
//         td { background:#1e293b; }
//         td.actions button { margin-right:5px; padding:4px 8px; border-radius:6px; border:none; cursor:pointer; }
//         td.actions button:first-child { background:#3b82f6; color:white; }
//         td.actions button:last-child { background:#ef4444; color:white; }

//         .modal-bg { position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.6); display:flex; justify-content:center; align-items:center; z-index:1000; padding:10px; }
//         .modal { background:#1e293b; padding:20px; border-radius:12px; width:100%; max-width:500px; display:flex; flex-direction:column; gap:10px; }
//         .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
//         .form-grid input, .form-grid select { padding:8px; border-radius:8px; border:1px solid #374151; background:#111827; color:white; width:100%; }
//         .modal-actions { display:flex; justify-content:flex-end; gap:10px; margin-top:10px; flex-wrap:wrap; }
//         .modal-actions button:first-child { background:#3b82f6; color:white; border:none; padding:8px 14px; border-radius:8px; }
//         .modal-actions button:last-child { background:#6b7280; color:white; border:none; padding:8px 14px; border-radius:8px; }
//         .preview { margin-top:10px; }
//         audio, video, iframe { max-width:100%; margin-top:10px; border-radius:6px; }

//         @media(max-width:768px) {
//           .form-grid { grid-template-columns:1fr; }
//           td.actions { display:flex; flex-wrap:wrap; gap:5px; }
//           table, th, td { font-size:14px; }
//           .modal { padding:15px; }
//         }
//       `}</style>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  fetchVault,
  uploadContent,
  updateVaultItem,
  deleteVaultItem,
} from "../api/api";
import "./ContentVaultManager.css";

export default function ContentVaultManager() {
  const [contentList, setContentList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: null,
    title: "",
    type: "pdf",
    access: "free",
    tags: "",
    file: null,
    scheduledDate: "",
  });
  const [loading, setLoading] = useState(false);

  // ================== Load content ==================
  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetchVault();
      setContentList(res.data.data || []);
    } catch (err) {
      console.error("Failed to load content:", err);
      setContentList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadContent();
  }, []);

  // ================== Save (Add / Update) ==================
  const saveItem = async () => {
    if (!currentItem.title.trim()) return alert("Title cannot be empty!");

    const formData = new FormData();
    formData.append("title", currentItem.title);
    formData.append("type", currentItem.type);
    formData.append("access", currentItem.access);
    formData.append("tags", currentItem.tags);
    if (currentItem.file) formData.append("file", currentItem.file);
    if (currentItem.scheduledDate)
      formData.append("scheduledDate", currentItem.scheduledDate);

    try {
      if (currentItem.id) {
        await updateVaultItem(currentItem.id, formData);
      } else {
        await uploadContent(formData);
      }

      setModalOpen(false);
      setCurrentItem({
        id: null,
        title: "",
        type: "pdf",
        access: "free",
        tags: "",
        file: null,
        scheduledDate: "",
      });
      loadContent();
    } catch (err) {
      console.error("Failed to save content:", err.response?.data || err.message);
      alert("Failed to save content. Check backend route.");
    }
  };

  // ================== Delete ==================
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this content?")) return;
    try {
      await deleteVaultItem(id);
      loadContent();
    } catch (err) {
      console.error(err);
      alert("Failed to delete content.");
    }
  };

  // ================== File Preview ==================
  const renderLivePreview = () => {
    if (!currentItem.file) return null;
    const fileURL = URL.createObjectURL(currentItem.file);
    switch (currentItem.type) {
      case "pdf":
        return <iframe src={fileURL} title="PDF Preview" width="100%" height="300px"></iframe>;
      case "audio":
        return <audio controls src={fileURL} style={{ width: "100%" }}></audio>;
      case "video":
        return (
          <video controls style={{ width: "100%" }}>
            <source src={fileURL} type="video/mp4" />
          </video>
        );
      default:
        return <p>Preview not available</p>;
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleString() : "-";

  // ================== Render File in Table ==================
  const renderFileInTable = (item) => {
    if (!item.fileUrl) return "-";
    const url = item.fileUrl.startsWith("http")
      ? item.fileUrl
      : `${
          process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/"
        }/${item.fileUrl}`;
    switch (item.type) {
      case "pdf":
        return (
          <a href={url} target="_blank" rel="noreferrer">
            📄 PDF
          </a>
        );
      case "audio":
        return <audio controls src={url}></audio>;
      case "video":
        return (
          <video controls width="200">
            <source src={url} type="video/mp4" />
          </video>
        );
      default:
        return (
          <a href={url} target="_blank" rel="noreferrer">
            📂 File
          </a>
        );
    }
  };

  return (
    <div className="vault-wrapper">
      <h2>Content & Learning Vault</h2>
      <button className="add-btn" onClick={() => setModalOpen(true)}>
        ➕ Add Content
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Access</th>
                <th>Tags</th>
                <th>Scheduled</th>
                <th>File</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contentList.length ? (
                contentList.map((item) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td>{item.access}</td>
                    <td>{item.tags?.join(", ") || "-"}</td>
                    <td>
                      {item.scheduledDate ? formatDate(item.scheduledDate) : "-"}
                    </td>
                    <td>{renderFileInTable(item)}</td>
                    <td className="actions">
                      <button
                        onClick={() => {
                          setCurrentItem({
                            ...item,
                            tags: item.tags?.join(","),
                            file: null,
                            scheduledDate: item.scheduledDate
                              ? item.scheduledDate.slice(0, 16)
                              : "",
                          });
                          setModalOpen(true);
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteItem(item._id)}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No content available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= Modal Form ================= */}
      {modalOpen && (
        <div className="modal-bg">
          <div className="modal">
            <h3>{currentItem.id ? "Edit" : "Add"} Content</h3>
            <div className="form-grid">
              <input
                placeholder="Title"
                value={currentItem.title}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, title: e.target.value })
                }
              />
              <select
                value={currentItem.type}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, type: e.target.value })
                }
              >
                <option value="pdf">PDF</option>
                <option value="audio">Audio</option>
                <option value="video">Video</option>
                <option value="blog">Blog</option>
                <option value="prompt">Prompt</option>
              </select>
              <select
                value={currentItem.access}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, access: e.target.value })
                }
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
                <option value="program">Program</option>
              </select>
              <input
                placeholder="Tags (comma separated)"
                value={currentItem.tags}
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, tags: e.target.value })
                }
              />
              <input
                type="file"
                onChange={(e) =>
                  setCurrentItem({ ...currentItem, file: e.target.files[0] })
                }
              />
              <input
                type="datetime-local"
                value={currentItem.scheduledDate}
                onChange={(e) =>
                  setCurrentItem({
                    ...currentItem,
                    scheduledDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="preview">{renderLivePreview()}</div>

            <div className="modal-actions">
              <button onClick={saveItem}>
                {currentItem.id ? "Save" : "Add"}
              </button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
