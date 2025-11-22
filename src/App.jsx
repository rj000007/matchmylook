import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Combiner from "./pages/Combiner";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/combiner" element={<Combiner />} />
        </Routes>
      </main>
    </div>
  );
}

function Home() {
  return (
    <div className="page-container">
      <h1>Welcome — MatchMyLook</h1>
      <p>
        Quick links:
        <br />
        <Link to="/combiner">Go to Combiner (Create Your Look)</Link>
      </p>
    </div>
  );
}
