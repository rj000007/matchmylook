import React, { useEffect, useState } from "react";

/**
 * Example product list.
 * Each product has: id, name, price, image, category
 */
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

const STORAGE_KEY = "matchmylook:selected";

function Combiner() {
  // selectedByCategory: { top: productId, bottom: productId, accessory: productId }
  const [selectedByCategory, setSelectedByCategory] = useState({});

  // load saved selection from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSelectedByCategory(JSON.parse(raw));
      }
    } catch (e) {
      console.warn("Failed to read localStorage:", e);
    }
  }, []);

  // save whenever selectedByCategory changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedByCategory));
    } catch (e) {
      console.warn("Failed to write localStorage:", e);
    }
  }, [selectedByCategory]);

  // Select: Enforce one-per-category. Selecting item will replace any previously selected item of same category.
  const selectItem = (item) => {
    setSelectedByCategory((prev) => {
      // if same item clicked and is already selected -> remove it (toggle off)
      if (prev[item.category] === item.id) {
        const copy = { ...prev };
        delete copy[item.category];
        return copy;
      }
      // otherwise set that category to this item id
      return { ...prev, [item.category]: item.id };
    });
  };

  // Remove by category (e.g. remove the chosen top)
  const removeCategory = (category) => {
    setSelectedByCategory((prev) => {
      const copy = { ...prev };
      delete copy[category];
      return copy;
    });
  };

  // Clear all
  const clearAll = () => setSelectedByCategory({});

  // Build selectedProducts array (full objects)
  const selectedProducts = Object.values(selectedByCategory)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const totalPrice = selectedProducts.reduce((s, p) => s + (p?.price || 0), 0);

  return (
    <div style={{ padding: 22, fontFamily: "system-ui, Arial" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Combiner — Create Your Look</h1>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700 }}>Total: ₹{totalPrice}</div>
          <div style={{ marginTop: 6 }}>
            <button
              onClick={clearAll}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: "1px solid #ddd",
                cursor: "pointer",
                background: "#fff",
              }}
            >
              Clear All
            </button>
          </div>
        </div>
      </header>

      <section style={{ marginTop: 20 }}>
        {/* Products */}
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {products.map((item) => {
            const isSelected = selectedByCategory[item.category] === item.id;
            return (
              <div
                key={item.id}
                style={{
                  width: 200,
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: 12,
                  boxShadow: isSelected ? "0 6px 20px rgba(99,102,241,0.12)" : undefined,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: 130, objectFit: "cover", borderRadius: 8 }}
                />
                <div style={{ marginTop: 10 }}>
                  <strong>{item.name}</strong>
                </div>
                <div style={{ marginTop: 6 }}>₹{item.price}</div>
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  <button
                    onClick={() => selectItem(item)}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: isSelected ? "none" : "1px solid #666",
                      background: isSelected ? "#6366f1" : "#fff",
                      color: isSelected ? "#fff" : "#000",
                      cursor: "pointer",
                    }}
                  >
                    {isSelected ? "Selected ✓" : `Select ${item.category}`}
                  </button>
                  {/* quick remove when selected */}
                  {isSelected && (
                    <button
                      onClick={() => removeCategory(item.category)}
                      style={{
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginTop: 34 }}>
        <h2>Selected</h2>
        {selectedProducts.length === 0 ? (
          <p>No items selected yet. Choose one per category (top, bottom, accessory).</p>
        ) : (
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                style={{
                  width: 220,
                  border: "1px solid #eee",
                  borderRadius: 10,
                  padding: 12,
                  position: "relative",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }}
                />
                <div style={{ marginTop: 8, fontWeight: 700 }}>{p.name}</div>
                <div style={{ marginTop: 6 }}>₹{p.price}</div>
                <div style={{ marginTop: 8, color: "#555" }}>{p.category}</div>

                <button
                  onClick={() => removeCategory(p.category)}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    padding: "6px 8px",
                    borderRadius: 6,
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                  aria-label={`Remove ${p.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Combiner;
