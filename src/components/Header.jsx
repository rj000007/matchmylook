import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo">MatchMyLook</Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/combiner">Combiner</Link>
        </nav>
      </div>
    </header>
  );
}
