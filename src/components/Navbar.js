import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#282c34', padding: '10px' }}>
      <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Login</Link>
      <Link to="/register" style={{ color: 'white' }}>Register</Link>
    </nav>
  );
}

export default Navbar;
