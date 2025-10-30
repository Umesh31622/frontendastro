import React from "react";

export default function StatsCards() {
  const stats = {
    activeOrders: 12,
    completedOrders: 8,
    pendingUploads: 3,
    remediesInProgress: 5,
    topServices: ["Astrology Consultation", "Gemstone Recommendation"],
    activeClients: ["client1@example.com", "client2@example.com"],
    revenue: { daily: 5000, weekly: 32000, monthly: 124000 },
  };

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="icon bg-blue">📦</div>
        <div>
          <h3>Active Orders</h3>
          <p>{stats.activeOrders}</p>
          <small>Completed: {stats.completedOrders}</small>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-yellow">⏳</div>
        <div>
          <h3>Pending Uploads</h3>
          <p>{stats.pendingUploads}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-green">💊</div>
        <div>
          <h3>Remedies In Progress</h3>
          <p>{stats.remediesInProgress}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-purple">⭐</div>
        <div>
          <h3>Top Services</h3>
          <p>{stats.topServices.join(", ")}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-pink">👤</div>
        <div>
          <h3>Active Clients</h3>
          <p>{stats.activeClients.join(", ")}</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon bg-orange">💰</div>
        <div>
          <h3>Revenue</h3>
          <p>Daily: ₹{stats.revenue.daily}</p>
          <p>Weekly: ₹{stats.revenue.weekly}</p>
          <p>Monthly: ₹{stats.revenue.monthly}</p>
        </div>
      </div>
    </div>
  );
}
