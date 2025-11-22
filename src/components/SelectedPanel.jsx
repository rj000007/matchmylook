import React from "react";

export default function SelectedPanel({ items, onRemove, onClear }) {
  const total = items.reduce((acc, i) => acc + i.price, 0);
  return (
    <div className="selected-panel">
      <h2>Your Look</h2>
      {items.length === 0 ? (
        <p>No items selected yet.</p>
      ) : (
        <div>
          <ul className="selected-list">
            {items.map((it) => (
              <li key={it.id} className="selected-item">
                <span>{it.title}</span>
                <span>₹{it.price}</span>
                <button className="small" onClick={() => onRemove(it.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="selected-footer">
            <strong>Total: ₹{total}</strong>
            <div className="actions">
              <button onClick={onClear}>Clear</button>
              <button onClick={() => alert("Checkout not implemented in this tutorial")}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
