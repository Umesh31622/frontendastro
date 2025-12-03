import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserWFullProfileModal.css";

const API = "https://adminastrotalk-1.onrender.com/api/userweb";


export default function UserWFullProfileModal({ userId, token, onClose }) {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("profile");

  const fetchFullHistory = async () => {
    try {
      const res = await axios.get(`${API}/${userId}/full-history`, {
        headers: { Authorization: token }
      });
      setData(res.data.data);
    } catch (err) {
      console.error("Full history error:", err);
    }
  };

  useEffect(() => {
    fetchFullHistory();
  }, []);

  if (!data) return <div className="user-modal">Loading...</div>;

  return (
    <div className="user-modal-overlay">
      <div className="user-modal">
        <button className="close-btn" onClick={onClose}>✖</button>

        <h2>User Profile Summary</h2>

        {/* Tabs */}
        <div className="tabs">
          <button className={tab === "profile" ? "active" : ""} onClick={() => setTab("profile")}>Profile</button>
          <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>Orders</button>
          <button className={tab === "payments" ? "active" : ""} onClick={() => setTab("payments")}>Payments</button>
          <button className={tab === "kundli" ? "active" : ""} onClick={() => setTab("kundli")}>Kundli</button>
          <button className={tab === "remedies" ? "active" : ""} onClick={() => setTab("remedies")}>Remedies</button>
          <button className={tab === "wallet" ? "active" : ""} onClick={() => setTab("wallet")}>Wallet</button>
        </div>

        {/* CONTENT SECTION */}
        <div className="tab-content">

          {/* PROFILE TAB */}
          {tab === "profile" && (
            <div>
              <h3>Basic Details</h3>
              <p><b>Name:</b> {data.user?.name}</p>
              <p><b>Email:</b> {data.user?.email}</p>
              <p><b>Phone:</b> {data.user?.phone}</p>
              <p><b>Gender:</b> {data.user?.gender}</p>
              <p><b>DOB:</b> {data.user?.dob}</p>
              <p><b>Created:</b> {new Date(data.user?.createdAt).toLocaleString()}</p>
            </div>
          )}

          {/* ORDERS TAB */}
          {tab === "orders" && (
            <div>
              <h3>User Orders</h3>
              {data.orders.length === 0 ? <p>No Orders</p> :
                data.orders.map(o => (
                  <div className="box" key={o._id}>
                    <p><b>Order ID:</b> {o._id}</p>
                    <p><b>Service:</b> {o.serviceName}</p>
                    <p><b>Amount:</b> ₹{o.amount}</p>
                  </div>
                ))
              }
            </div>
          )}

          {/* PAYMENTS TAB */}
          {tab === "payments" && (
            <div>
              <h3>Payment History</h3>
              {data.payments.length === 0 ? <p>No Payments</p> :
                data.payments.map(p => (
                  <div className="box" key={p._id}>
                    <p><b>Payment ID:</b> {p.paymentId}</p>
                    <p><b>Amount:</b> ₹{p.amount}</p>
                    <p><b>Status:</b> {p.status}</p>
                  </div>
                ))
              }
            </div>
          )}

          {/* KUNDLI TAB */}
          {tab === "kundli" && (
            <div>
              <h3>Kundli Info</h3>
              {data.kundli ? (
                <>
                  <p><b>Mangal:</b> {data.kundli.mangal}</p>
                  <p><b>Nakshatra:</b> {data.kundli.nakshatra}</p>
                  <p><b>Moon Sign:</b> {data.kundli.moonSign}</p>
                </>
              ) : <p>No kundli generated</p>}
            </div>
          )}

          {/* REMEDIES TAB */}
          {tab === "remedies" && (
            <div>
              <h3>Remedies List</h3>
              {data.remedies.length === 0 ? <p>No Remedies</p> :
                data.remedies.map(r => (
                  <div className="box" key={r._id}>
                    <p><b>Remedy:</b> {r.name}</p>
                    <p><b>Status:</b> {r.status}</p>
                  </div>
                ))
              }
            </div>
          )}

          {/* WALLET TAB */}
          {tab === "wallet" && (
            <div>
              <h3>Wallet Summary</h3>
              {data.wallet ? (
                <>
                  <p><b>Balance:</b> ₹{data.wallet.balance}</p>
                  <p><b>Total Added:</b> ₹{data.wallet.totalAdded}</p>
                </>
              ) : <p>No wallet found</p>}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
