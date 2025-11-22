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
  // store selected items as array of product ids (keeps it simple and avoids duplicate full objects)
  const [selectedItems, setSelectedItems] = useState([]);

  // toggle select / unselect
  const toggleSelect = (item) => {
    setSelectedItems((prev) => {
      // if already selected -> remove
      if (prev.includes(item.id)) return prev.filter((id) => id !== item.id);
      // otherwise add
      return [...prev, item.id];
    });
  };

  // remove by id (same as toggling, but explicit)
  const removeItem = (id) => {
    setSelectedItems((prev) => prev.filter((pid) => pid !== id));
  };

  // get full product objects for rendering the "Selected" area
  const selectedProducts = selectedItems
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const totalPrice = selectedProducts.reduce((s, p) => s + (p?.price || 0), 0);

  return (
    <div style={{ padding: "22px", fontFamily: "system-ui, Arial" }}>
      <h1>Combiner — Create Your Look</h1>

      {/* Products grid */}
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginTop: 8 }}>
        {products.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            <div
              key={item.id}
              style={{
                width: 180,
                padding: 12,
                border: "1px solid #eee",
                borderRadius: 10,
                boxShadow: isSelected ? "0 4px 14px rgba(99,102,241,0.12)" : undefined,
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }}
              />
              <p style={{ margin: "8px 0 4px", fontWeight: 700 }}>{item.name}</p>
              <p style={{ margin: "0 0 8px" }}>₹{item.price}</p>

              <button
                onClick={() => toggleSelect(item)}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                  borderRadius: 6,
                  border: "1px solid #666",
                  background: isSelected ? "#6366f1" : "#fff",
                  color: isSelected ? "#fff" : "#000",
                }}
              >
                {isSelected ? "Selected ✓ (click to remove)" : "Select"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected area */}
      <div style={{ marginTop: 36 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Selected ({selectedProducts.length})</h2>
          <div style={{ fontWeight: 700 }}>Total: ₹{totalPrice}</div>
        </div>

        {selectedProducts.length === 0 && <p>No items selected yet. Click “Select” to add.</p>}

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 10 }}>
          {selectedProducts.map((item) => (
            <div
              key={item.id}
              style={{
                width: 150,
                padding: 10,
                borderRadius: 8,
                border: "1px solid #eee",
                position: "relative",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 6 }}
              />
              <p style={{ margin: "8px 0 4px", fontWeight: 600 }}>{item.name}</p>
              <p style={{ margin: 0 }}>₹{item.price}</p>

              <button
                onClick={() => removeItem(item.id)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  padding: "4px 6px",
                  cursor: "pointer",
                }}
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Combiner;
