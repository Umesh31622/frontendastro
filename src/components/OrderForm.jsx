// src/components/OrderForm.jsx
import React, { useState } from 'react';
import './Orders.css';

export default function OrderForm({ initial = {}, onSubmit, submitText = 'Save' }) {
  const [clientName, setClientName] = useState(initial.clientName || '');
  const [clientEmail, setClientEmail] = useState(initial.clientEmail || '');
  const [serviceType, setServiceType] = useState(initial.serviceType || 'kundli');
  const [description, setDescription] = useState(initial.description || '');
  const [amount, setAmount] = useState(initial.amount || 0);
  const [files, setFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('clientName', clientName);
    data.append('clientEmail', clientEmail);
    data.append('serviceType', serviceType);
    data.append('description', description);
    data.append('amount', amount);
    for (let i = 0; i < files.length; i++) {
      data.append('files', files[i]);
    }
    onSubmit(data, true);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="row">
        <label>Client Name</label>
        <input value={clientName} onChange={e => setClientName(e.target.value)} required />
      </div>

      <div className="row">
        <label>Client Email</label>
        <input value={clientEmail} onChange={e => setClientEmail(e.target.value)} />
      </div>

      <div className="row">
        <label>Service Type</label>
        <select value={serviceType} onChange={e => setServiceType(e.target.value)}>
          <option value="kundli">Kundli</option>
          <option value="matchmaking">Matchmaking</option>
          <option value="remedy">Remedy</option>
          <option value="consultation">Consultation</option>
        </select>
      </div>

      <div className="row">
        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="row">
        <label>Amount (₹)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>

      <div className="row">
        <label>Files</label>
        <input type="file" multiple onChange={e => setFiles(e.target.files)} />
      </div>

      <div className="row actions">
        <button type="submit" className="btn primary">{submitText}</button>
      </div>
    </form>
  );
}
