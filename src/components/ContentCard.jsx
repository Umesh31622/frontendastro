// import React from "react";

// export default function ContentCard({ item }) {
//   return (
//     <div className="card">
//       <h3>{item.title}</h3>
//       <p>Type: {item.type}</p>
//       <p>Tags: {item.tags?.join(", ")}</p>
//       {item.fileUrl && (
//         <a href={`https://adminastrotalk-1.onrender.com/${item.fileUrl}`} target="_blank" rel="noreferrer">
//           📄 View/Download
//         </a>
//       )}
//       <style>{`
//         .card { background:#1e293b; color:#cbd5e1; padding:15px; border-radius:10px; margin:10px 0; }
//         a { color:#3b82f6; text-decoration:none; }
//         h3 { margin:0 0 5px 0; color:#60a5fa; }
//       `}</style>
//     </div>
//   );
// }

import React from "react";

export default function ContentCard({ item }) {
  const baseURL = process.env.REACT_APP_API_URL || "https://adminastrotalk-1.onrender.com/";
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p>Type: {item.type}</p>
      <p>Access: {item.access}</p>
      {item.tags?.length > 0 && <p>Tags: {item.tags.join(", ")}</p>}
      {item.scheduledDate && <p>Scheduled: {new Date(item.scheduledDate).toLocaleString()}</p>}
      {item.fileUrl && (
        <a href={`${baseURL}/${item.fileUrl}`} target="_blank" rel="noreferrer">📄 View/Download</a>
      )}
      <style>{`
        .card { background:#1e293b; color:#cbd5e1; padding:15px; border-radius:10px; margin:10px 0; }
        h3 { margin:0 0 5px 0; color:#60a5fa; }
        a { color:#3b82f6; text-decoration:none; }
      `}</style>
    </div>
  );
}
