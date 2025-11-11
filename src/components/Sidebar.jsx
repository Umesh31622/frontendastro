import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/vault">Vault</Link>
        <Link to="/upload">Upload Content</Link>
      </nav>
    </aside>
  );
}
