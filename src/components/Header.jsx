import React from "react";

export default function Header(){ 
  return (
    <header className="max-w-6xl mx-auto p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold">M</div>
        <div className="text-lg font-semibold">MatchMyLook</div>
      </div>
      <nav className="hidden md:flex gap-6 items-center text-sm text-gray-600">
        <a className="hover:text-gray-900" href="#">Explore</a>
        <a className="hover:text-gray-900" href="#">Combiner</a>
        <a className="hover:text-gray-900" href="#">Saved</a>
        <button className="ml-4 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 text-white">Sign in</button>
      </nav>
    </header>
  );
}
