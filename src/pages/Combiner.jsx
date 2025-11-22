import React, { useState } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Combiner() {
  const [selected, setSelected] = useState([]);

  function onSelect(item) {
    // toggle selection
    setSelected(prev => (prev.find(p => p.id === item.id) ? prev.filter(p => p.id !== item.id) : [...prev, item]));
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Combiner — Create Your Look</h1>

      <section className="grid md:grid-cols-3 gap-4">
        {products.map(item => (
          <ProductCard key={item.id} item={item} onSelect={onSelect} />
        ))}
      </section>

      <aside className="mt-6">
        <h2 className="text-xl font-semibold">Selected</h2>
        <ul>
          {selected.map(s => (
            <li key={s.id}>{s.name} — ₹{s.price}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
