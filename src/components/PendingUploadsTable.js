// // import React, { useState } from "react";

// // export default function PendingUploadsTable() {
// //   const [uploads] = useState([
// //     { id: 1, client: "John Doe", report: "PDF #A12", date: "2025-10-10" },
// //     { id: 2, client: "Jane Smith", report: "PDF #A13", date: "2025-10-12" },
// //     { id: 3, client: "Alex Johnson", report: "PDF #A14", date: "2025-10-14" },
// //   ]);

// //   const sortedUploads = [...uploads].sort((a, b) => new Date(a.date) - new Date(b.date));

// //   return (
// //     <div className="table-container">
// //       <h3>Pending PDF Uploads</h3>
// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Client</th>
// //             <th>Report</th>
// //             <th>Date</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {sortedUploads.map((upload) => (
// //             <tr key={upload.id}>
// //               <td>{upload.client}</td>
// //               <td>{upload.report}</td>
// //               <td>{upload.date}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";

// export default function PendingUploadsTable() {
//   const [uploads, setUploads] = useState([
//     { id: 1, client: "John Doe", report: "PDF #A12", date: "2025-10-10" },
//     { id: 2, client: "Jane Smith", report: "PDF #A13", date: "2025-10-12" },
//     { id: 3, client: "Alex Johnson", report: "PDF #A14", date: "2025-10-14" },
//   ]);

//   const sortByDate = () => {
//     const sorted = [...uploads].sort(
//       (a, b) => new Date(a.date) - new Date(b.date)
//     );
//     setUploads(sorted);
//   };

//   return (
//     <div className="table-container">
//       <h3>Pending PDF Uploads</h3>
//       <button onClick={sortByDate} className="action-btn" style={{marginBottom:"10px"}}>
//         Sort by Date
//       </button>
//       <table>
//         <thead>
//           <tr>
//             <th>Client</th>
//             <th>Report</th>
//             <th>Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {uploads.map((upload) => (
//             <tr key={upload.id}>
//               <td>{upload.client}</td>
//               <td>{upload.report}</td>
//               <td>{upload.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import React from "react";

export default function PendingUploads({ pending }) {
  return (
    <div className="pending-uploads">
      <h3>Pending Uploads: {pending}</h3>
    </div>
  );
}
