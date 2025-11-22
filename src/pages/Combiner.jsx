import React, { useState } from "react";

const products = [
  {
    id: 1,
    name: "White T-Shirt",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=60",
    category: "top",
  },
  {
    id: 2,
    name: "Blue Jeans",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1583001760175-2a9c01f7c0a5?auto=format&fit=crop&w=400&q=60",
    category: "bottom",
  },
  {
    id: 3,
    name: "Black Cap",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=60",
    category: "accessory",
  },
];

function Combiner() {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = (item) => {
    setSelectedItems((prev) => [...prev, item]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Combiner — Create Your Look</h1>

      {/* Products */}
      <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
        {products.map((item) => (
          <div key={item.id} style={{ width: "180px" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p><b>{item.name}</b></p>
            <p>₹{item.price}</p>
            <button onClick={() => addItem(item)}>Select</button>
          </div>
        ))}
      </div>

      {/* Selected Items */}
      <h2 style={{ marginTop: "40px" }}>Selected</h2>

      {selectedItems.length === 0 && <p>No items selected yet.</p>}

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {selectedItems.map((item, index) => (
          <div key={index} style={{ width: "150px" }}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p>{item.name}</p>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Combiner;
