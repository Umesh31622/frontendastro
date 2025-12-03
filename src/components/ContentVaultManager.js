// import React, { useState, useEffect } from "react";
// import {
//   fetchVault,
//   uploadContent,
//   updateVaultItem,
//   deleteVaultItem,
// } from "../api/api";
// import "./ContentVaultManager.css";

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
//     scheduledDate: "",
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

//   useEffect(() => {
//     loadContent();
//   }, []);

//   // ================== Save (Add / Update) ==================
//   const saveItem = async () => {
//     if (!currentItem.title.trim()) return alert("Title cannot be empty!");

//     const formData = new FormData();
//     formData.append("title", currentItem.title);
//     formData.append("type", currentItem.type);
//     formData.append("access", currentItem.access);
//     formData.append("tags", currentItem.tags);
//     if (currentItem.file) formData.append("file", currentItem.file);
//     if (currentItem.scheduledDate)
//       formData.append("scheduledDate", currentItem.scheduledDate);

//     try {
//       if (currentItem.id) {
//         await updateVaultItem(currentItem.id, formData);
//       } else {
//         await uploadContent(formData);
//       }

//       setModalOpen(false);
//       setCurrentItem({
//         id: null,
//         title: "",
//         type: "pdf",
//         access: "free",
//         tags: "",
//         file: null,
//         scheduledDate: "",
//       });
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
//       case "pdf":
//         return <iframe src={fileURL} title="PDF Preview" width="100%" height="300px"></iframe>;
//       case "audio":
//         return <audio controls src={fileURL} style={{ width: "100%" }}></audio>;
//       case "video":
//         return (
//           <video controls style={{ width: "100%" }}>
//             <source src={fileURL} type="video/mp4" />
//           </video>
//         );
//       default:
//         return <p>Preview not available</p>;
//     }
//   };

//   const formatDate = (dateStr) =>
//     dateStr ? new Date(dateStr).toLocaleString() : "-";

//   // ================== Render File in Table ==================
//   const renderFileInTable = (item) => {
//     if (!item.fileUrl) return "-";
//     const url = item.fileUrl.startsWith("http")
//       ? item.fileUrl
//       : `${
//           process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/"
//         }/${item.fileUrl}`;
//     switch (item.type) {
//       case "pdf":
//         return (
//           <a href={url} target="_blank" rel="noreferrer">
//             📄 PDF
//           </a>
//         );
//       case "audio":
//         return <audio controls src={url}></audio>;
//       case "video":
//         return (
//           <video controls width="200">
//             <source src={url} type="video/mp4" />
//           </video>
//         );
//       default:
//         return (
//           <a href={url} target="_blank" rel="noreferrer">
//             📂 File
//           </a>
//         );
//     }
//   };

//   return (
//     <div className="vault-wrapper">
//       <h2>Content & Learning Vault</h2>
//       <button className="add-btn" onClick={() => setModalOpen(true)}>
//         ➕ Add Content
//       </button>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
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
//               {contentList.length ? (
//                 contentList.map((item) => (
//                   <tr key={item._id}>
//                     <td>{item.title}</td>
//                     <td>{item.type}</td>
//                     <td>{item.access}</td>
//                     <td>{item.tags?.join(", ") || "-"}</td>
//                     <td>
//                       {item.scheduledDate ? formatDate(item.scheduledDate) : "-"}
//                     </td>
//                     <td>{renderFileInTable(item)}</td>
//                     <td className="actions">
//                       <button
//                         onClick={() => {
//                           setCurrentItem({
//                             ...item,
//                             tags: item.tags?.join(","),
//                             file: null,
//                             scheduledDate: item.scheduledDate
//                               ? item.scheduledDate.slice(0, 16)
//                               : "",
//                           });
//                           setModalOpen(true);
//                         }}
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button onClick={() => deleteItem(item._id)}>🗑️ Delete</button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" style={{ textAlign: "center" }}>
//                     No content available
//                   </td>
//                 </tr>
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
//               <input
//                 placeholder="Title"
//                 value={currentItem.title}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, title: e.target.value })
//                 }
//               />
//               <select
//                 value={currentItem.type}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, type: e.target.value })
//                 }
//               >
//                 <option value="pdf">PDF</option>
//                 <option value="audio">Audio</option>
//                 <option value="video">Video</option>
//                 <option value="blog">Blog</option>
//                 <option value="prompt">Prompt</option>
//               </select>
//               <select
//                 value={currentItem.access}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, access: e.target.value })
//                 }
//               >
//                 <option value="free">Free</option>
//                 <option value="paid">Paid</option>
//                 <option value="program">Program</option>
//               </select>
//               <input
//                 placeholder="Tags (comma separated)"
//                 value={currentItem.tags}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, tags: e.target.value })
//                 }
//               />
//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, file: e.target.files[0] })
//                 }
//               />
//               <input
//                 type="datetime-local"
//                 value={currentItem.scheduledDate}
//                 onChange={(e) =>
//                   setCurrentItem({
//                     ...currentItem,
//                     scheduledDate: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="preview">{renderLivePreview()}</div>

//             <div className="modal-actions">
//               <button onClick={saveItem}>
//                 {currentItem.id ? "Save" : "Add"}
//               </button>
//               <button onClick={() => setModalOpen(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// // import {
// //   fetchVault,
// //   uploadContent,
// //   updateVaultItem,
// //   deleteVaultItem,
// // } from "../api/api";
// import "./ContentVaultManager.css";

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
//     fileUrl: "",
//     scheduledDate: "",
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

//   useEffect(() => {
//     loadContent();
//   }, []);

//   // ================== Save (Add / Update) ==================
//   const saveItem = async () => {
//     if (!currentItem.title.trim()) return alert("Title cannot be empty!");

//     const formData = new FormData();
//     formData.append("title", currentItem.title);
//     formData.append("type", currentItem.type);
//     formData.append("access", currentItem.access);
//     formData.append("tags", currentItem.tags);

//     if (currentItem.scheduledDate)
//       formData.append("scheduledDate", currentItem.scheduledDate);

//     if (currentItem.file) {
//       formData.append("file", currentItem.file);
//       formData.append("oldFileUrl", currentItem.fileUrl || "");
//     }

//     try {
//       if (currentItem.id) {
//         await updateVaultItem(currentItem.id, formData);
//       } else {
//         await uploadContent(formData);
//       }

//       setModalOpen(false);

//       setCurrentItem({
//         id: null,
//         title: "",
//         type: "pdf",
//         access: "free",
//         tags: "",
//         file: null,
//         fileUrl: "",
//         scheduledDate: "",
//       });

//       loadContent();
//     } catch (err) {
//       console.error("Failed to save content:", err);
//       alert("Failed to save content.");
//     }
//   };

//   // ================== Delete ==================
//   const deleteItem = async (id) => {
//     if (!window.confirm("Delete this content?")) return;

//     try {
//       await deleteVaultItem(id);
//       loadContent();
//     } catch (err) {
//       alert("Failed to delete content.");
//     }
//   };

//   // ================== Preview in Modal ==================
//   const renderLivePreview = () => {
//     if (!currentItem.file) return null;

//     const fileURL = URL.createObjectURL(currentItem.file);

//     switch (currentItem.type) {
//       case "pdf":
//         return <iframe src={fileURL} width="100%" height="150px"></iframe>;

//       case "audio":
//         return <audio controls src={fileURL} style={{ width: "100%" }} />;

//       case "video":
//         return (
//           <video
//             src={fileURL}
//             controls
//             style={{
//               width: "100%",
//               height: "200px",
//               objectFit: "cover",
//               borderRadius: "10px",
//             }}
//           />
//         );

//       default:
//         return <p>No Preview</p>;
//     }
//   };

//   const formatDate = (dateStr) =>
//     dateStr ? new Date(dateStr).toLocaleString() : "-";

//   // ================== File Preview in Table ==================
//   const renderFileInTable = (item) => {
//     if (!item.fileUrl) return "-";

//     const url = item.fileUrl;

//     switch (item.type) {
//       case "pdf":
//         return <a href={url} target="_blank">📄 PDF</a>;

//       case "audio":
//         return <audio controls src={url} style={{ width: "160px" }} />;

//       case "video":
//         return (
//           <div
//             style={{
//               width: "180px",
//               height: "100px",
//               borderRadius: "10px",
//               overflow: "hidden",
//               background: "#000",
//               border: "1px solid #ddd",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <video
//               src={url}
//               controls
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//               }}
//             />
//           </div>
//         );

//       default:
//         return (
//           <a href={url} target="_blank">
//             📂 File
//           </a>
//         );
//     }
//   };

//   // ================== UI ==================
//   return (
//     <div className="vault-wrapper">
//       <h2>Content & Learning Vault</h2>

//       <button className="add-btn" onClick={() => setModalOpen(true)}>
//         ➕ Add Content
//       </button>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
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
//               {contentList.length ? (
//                 contentList.map((item) => (
//                   <tr key={item._id}>
//                     <td>{item.title}</td>
//                     <td>{item.type}</td>
//                     <td>{item.access}</td>
//                     <td>{item.tags?.join(", ")}</td>
//                     <td>{formatDate(item.scheduledDate)}</td>
//                     <td>{renderFileInTable(item)}</td>

//                     <td className="actions">
//                       <button
//                         onClick={() => {
//                           setCurrentItem({
//                             id: item._id,
//                             title: item.title,
//                             type: item.type,
//                             access: item.access,
//                             tags: item.tags?.join(",") || "",
//                             file: null,
//                             fileUrl: item.fileUrl,
//                             scheduledDate: item.scheduledDate
//                               ? item.scheduledDate.slice(0, 16)
//                               : "",
//                           });
//                           setModalOpen(true);
//                         }}
//                       >
//                         ✏️ Edit
//                       </button>

//                       <button onClick={() => deleteItem(item._id)}>
//                         🗑️ Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" style={{ textAlign: "center" }}>
//                     No content found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* ================= Modal ================= */}
//       {modalOpen && (
//         <div className="modal-bg">
//           <div className="modal">
//             <h3>{currentItem.id ? "Edit" : "Add"} Content</h3>

//             <div className="form-grid">
//               <input
//                 placeholder="Title"
//                 value={currentItem.title}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, title: e.target.value })
//                 }
//               />

//               <select
//                 value={currentItem.type}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, type: e.target.value })
//                 }
//               >
//                 <option value="pdf">PDF</option>
//                 <option value="audio">Audio</option>
//                 <option value="video">Video</option>
//                 <option value="blog">Blog</option>
//                 <option value="prompt">Prompt</option>
//               </select>

//               <select
//                 value={currentItem.access}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, access: e.target.value })
//                 }
//               >
//                 <option value="free">Free</option>
//                 <option value="paid">Paid</option>
//                 <option value="program">Program</option>
//               </select>

//               <input
//                 placeholder="Tags (comma separated)"
//                 value={currentItem.tags}
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, tags: e.target.value })
//                 }
//               />

//               <input
//                 type="file"
//                 onChange={(e) =>
//                   setCurrentItem({ ...currentItem, file: e.target.files[0] })
//                 }
//               />

//               <input
//                 type="datetime-local"
//                 value={currentItem.scheduledDate}
//                 onChange={(e) =>
//                   setCurrentItem({
//                     ...currentItem,
//                     scheduledDate: e.target.value,
//                   })
//                 }
//               />
//             </div>

//             <div className="preview">{renderLivePreview()}</div>

//             <div className="modal-actions">
//               <button onClick={saveItem}>
//                 {currentItem.id ? "Save" : "Add"}
//               </button>

//               <button onClick={() => setModalOpen(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
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
    fileUrl: "",
    publicId: "",
    scheduledDate: "",
  });
  const [loading, setLoading] = useState(false);

  // ================== Load content ==================
  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await fetchVault(); // API 👍
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
    formData.append("publicId", currentItem.publicId || "");

    if (currentItem.scheduledDate)
      formData.append("scheduledDate", currentItem.scheduledDate);

    if (currentItem.file) {
      formData.append("file", currentItem.file);
      formData.append("oldFileUrl", currentItem.fileUrl || "");
    }

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
        fileUrl: "",
        publicId: "",
        scheduledDate: "",
      });

      loadContent();
    } catch (err) {
      console.error("Failed to save content:", err);
      alert("Failed to save content.");
    }
  };

  // ================== Delete ==================
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this content?")) return;

    try {
      await deleteVaultItem(id);
      loadContent();
    } catch (err) {
      alert("Failed to delete content.");
    }
  };

  // ================== Preview in Modal ==================
  const renderLivePreview = () => {
    if (!currentItem.file) return null;

    const fileURL = URL.createObjectURL(currentItem.file);

    switch (currentItem.type) {
      case "pdf":
        return <iframe src={fileURL} width="100%" height="150px"></iframe>;

      case "audio":
        return <audio controls src={fileURL} style={{ width: "100%" }} />;

      case "video":
        return (
          <video
            src={fileURL}
            controls
            style={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        );

      default:
        return <p>No Preview</p>;
    }
  };

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleString() : "-";

  // ================== File In Table ==================
  const renderFileInTable = (item) => {
    if (!item.fileUrl) return "-";

    const url = item.fileUrl;

    switch (item.type) {
      case "pdf":
        return <a href={url} target="_blank" rel="noreferrer">📄 PDF</a>;

      case "audio":
        return <audio controls src={url} style={{ width: "160px" }} />;

      case "video":
        return (
          <div
            style={{
              width: "180px",
              height: "100px",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#000",
              border: "1px solid #ddd",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <video
              src={url}
              controls
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        );

      default:
        return (
          <a href={url} target="_blank" rel="noreferrer">
            📂 File
          </a>
        );
    }
  };

  // ================== UI ==================
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
                    <td>{item.tags?.join(", ")}</td>
                    <td>{formatDate(item.scheduledDate)}</td>
                    <td>{renderFileInTable(item)}</td>

                    <td className="actions">
                      <button
                        onClick={() => {
                          setCurrentItem({
                            id: item._id,
                            title: item.title,
                            type: item.type,
                            access: item.access,
                            tags: item.tags?.join(",") || "",
                            file: null,
                            fileUrl: item.fileUrl,
                            publicId: item.publicId || "",
                            scheduledDate: item.scheduledDate
                              ? item.scheduledDate.slice(0, 16)
                              : "",
                          });
                          setModalOpen(true);
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button onClick={() => deleteItem(item._id)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No content found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

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
