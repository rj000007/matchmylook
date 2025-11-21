import React from "react";

export default function Hero({onStart}) {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">Create stylish outfits in seconds</h1>
          <p className="mt-4 text-gray-600">Select tops, bottoms and accessories — MatchMyLook shows curated combos and direct buy links.</p>
          <div className="mt-6 flex gap-3">
            <button onClick={onStart} className="px-5 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg">Create Your Look</button>
            <button className="px-5 py-3 rounded-lg border border-gray-200 text-gray-700">Explore Looks</button>
          </div>
          <div className="mt-6 text-sm text-gray-500">Free to start • No credit card</div>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <img src="/images/hero.png" alt="fashion" className="w-full rounded-md object-cover h-72"/>
        </div>
      </div>
    </section>
  );
}
