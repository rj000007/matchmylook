import React, { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Combiner from "./components/Combiner";

export default function App(){
  const [started, setStarted] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero onStart={()=>setStarted(true)} />
      <div className="max-w-6xl mx-auto">
        {started && <Combiner />}
      </div>
      <footer className="mt-12 p-6 text-center text-sm text-gray-500">© MatchMyLook</footer>
    </div>
  );
}
