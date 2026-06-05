import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">WECE EOH</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/camera">Camera</Link>
        <Link to="/gps">GPS</Link>
      </div>
    </nav>
  );
}

export default Navbar;