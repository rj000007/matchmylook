import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import SelectedPanel from "../components/SelectedPanel";

const SAMPLE_PRODUCTS = [
  { id: "p1", title: "White T-Shirt", price: 12, img: "" },
  { id: "p2", title: "Blue Jeans", price: 28, img: "" },
  { id: "p3", title: "Sneakers", price: 45, img: "" },
  { id: "p4", title: "Cap", price: 8, img: "" },
];

export default function Combiner() {
  const [selected, setSelected] = useState([]);

  const addItem = (product) => {
    if (selected.find((s) => s.id === product.id)) return;
    setSelected((s) => [...s, product]);
  };

  const removeItem = (id) => setSelected((s) => s.filter((x) => x.id !== id));
  const clearAll = () => setSelected([]);

  return (
    <div className="combiner-page page-container">
      <div className="combiner-grid">
        <section className="products">
          <h2>Products</h2>
          <div className="product-list">
            {SAMPLE_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={() => addItem(p)} />
            ))}
          </div>
        </section>

        <aside className="selected">
          <SelectedPanel items={selected} onRemove={removeItem} onClear={clearAll} />
        </aside>
      </div>
    </div>
  );
}
