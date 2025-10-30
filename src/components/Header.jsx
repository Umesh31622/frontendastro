import React from "react";

export default function Header({ logout }) {
  return (
    <header>
      <h1>Learning Vault</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
