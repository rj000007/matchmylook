// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ item, onSelect }) {
  return (
    <div className="p-3 border rounded shadow-sm">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
      <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">₹{item.price}</p>
      <button
        onClick={() => onSelect(item)}
        className="mt-2 bg-purple-600 text-white px-3 py-1 rounded"
      >
        Select
      </button>
    </div>
  );
}
