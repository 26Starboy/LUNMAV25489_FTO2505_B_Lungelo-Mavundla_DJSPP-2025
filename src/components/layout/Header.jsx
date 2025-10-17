import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={{ padding: "1rem", display: "flex", gap: "1rem", background: "#1a1a1a" }}>
      <Link to="/" style={{ color: "#fff" }}>Home</Link>
      <Link to="/favorites" style={{ color: "#fff" }}>Favorites</Link>
    </header>
  );
};

export default Header;
