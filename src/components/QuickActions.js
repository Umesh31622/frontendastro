// import React from "react";

// export default function QuickActions() {
//   const actions = [
//     { label: "Upload Report", emoji: "📄" },
//     { label: "Add Remedy / Ritual", emoji: "💊" },
//     { label: "Schedule Call", emoji: "📞" },
//     { label: "Push Broadcast", emoji: "📣" },
//     { label: "Create New Service / Form", emoji: "📝" },
//     { label: "Set Consultation Slot", emoji: "🕒" },
//   ];

//   return (
//     <div className="quick-actions">
//       <h3>Quick Actions</h3>
//       <div className="actions-grid">
//         {actions.map((action, i) => (
//           <button key={i} className="action-btn">
//             <span className="emoji">{action.emoji}</span> {action.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/Dashboard.css";

Modal.setAppElement("#root"); // For accessibility

export default function QuickActions() {
  const actions = [
    { label: "Upload Report", emoji: "📄" },
    { label: "Add Remedy / Ritual", emoji: "💊" },
    { label: "Schedule Call", emoji: "📞" },
    { label: "Push Broadcast", emoji: "📣" },
    { label: "Create New Service / Form", emoji: "📝" },
    { label: "Set Consultation Slot", emoji: "🕒" },
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeAction, setActiveAction] = useState("");

  const openModal = (action) => {
    setActiveAction(action);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActiveAction("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${activeAction} form submitted!`);
    closeModal();
  };

  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="actions-grid">
        {actions.map((action, i) => (
          <button
            key={i}
            className="action-btn"
            onClick={() => openModal(action.label)}
          >
            <span className="emoji">{action.emoji}</span> {action.label}
          </button>
        ))}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={activeAction}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{activeAction}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Client Name:
            <input type="text" required placeholder="Enter client name" />
          </label>

          {activeAction === "Upload Report" && (
            <label>
              Upload File:
              <input type="file" required />
            </label>
          )}

          {activeAction === "Schedule Call" && (
            <label>
              Call Date & Time:
              <input type="datetime-local" required />
            </label>
          )}

          {activeAction === "Add Remedy / Ritual" && (
            <label>
              Remedy Details:
              <textarea required placeholder="Enter remedy/ritual details"></textarea>
            </label>
          )}

          {activeAction === "Push Broadcast" && (
            <label>
              Message:
              <textarea required placeholder="Enter broadcast message"></textarea>
            </label>
          )}

          {activeAction === "Create New Service / Form" && (
            <label>
              Service Name:
              <input type="text" required placeholder="Enter service name" />
            </label>
          )}

          {activeAction === "Set Consultation Slot" && (
            <label>
              Available Slot:
              <input type="datetime-local" required />
            </label>
          )}

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <button type="button" className="cancel-btn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
