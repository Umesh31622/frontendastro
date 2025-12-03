import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function SearchModal({ isOpen, onClose, results }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={{ content: { width: "70%", margin: "auto" } }}>
      <h2>Search Results</h2>
      <button onClick={onClose}>Close</button>

      {["clients", "orders", "reports", "remedies"].map((section) => (
        <div key={section} style={{ marginTop: "1rem" }}>
          <h3>{section.toUpperCase()}</h3>
          {results[section]?.length > 0 ? (
            <ul>
              {results[section].map((item) => (
                <li key={item._id}>
                  {section === "clients" && `${item.name} - ${item.email}`}
                  {section === "orders" && `${item.clientName} - ₹${item.amount}`}
                  {section === "reports" && `${item.title}`}
                  {section === "remedies" && `${item.name}`}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found in {section}</p>
          )}
        </div>
      ))}
    </Modal>
  );
}
