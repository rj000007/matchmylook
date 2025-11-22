import React from "react";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <div className="product-img">{product.img ? <img src={product.img} alt="" /> : <div className="placeholder">IMG</div>}</div>
      <div className="product-body">
        <h3>{product.title}</h3>
        <p className="price">₹{product.price}</p>
        <button onClick={onAdd} className="btn">Add</button>
      </div>
    </div>
  );
}
