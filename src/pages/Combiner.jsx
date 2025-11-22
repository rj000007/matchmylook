import React, { useEffect, useState } from "react";

/**
 * NOTE:
 * If you uploaded a screenshot earlier, its path (on this machine) is included below.
 * Use it for local testing only. It won't work when deployed unless you copy it into
 * your public/ folder and reference it as '/your-file.png'.
 */
const UPLOADED_IMAGE_PATH = "/mnt/data/matchmylook - Brave 11_23_2025 1_01_24 AM.png";

/* --- demo products (replace with your real data later) --- */
const products = [
  {
    id: 1,
    name: "White T-Shirt",
    price: 499,
    // fallback to the uploaded path if you want to test locally
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

/* --- storage keys --- */
const STORAGE_KEY_CURRENT = "matchmylook:selected";
const STORAGE_KEY_SAVED = "matchmylook:savedLooks";

/* Utility to generate a quick id */
const id = () => Math.random().toString(36).slice(2, 9);

function Combiner() {
  const [selectedByCategory, setSelectedByCategory] = useState({});
  const [savedLooks, setSavedLooks] = useState([]);
  const [importError, setImportError] = useState("");

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
      if (raw) setSelectedByCategory(JSON.parse(raw));
    } catch (e) {
      console.warn("read current selection failed", e);
    }
    try {
      const sraw = localStorage.getItem(STORAGE_KEY_SAVED);
      if (sraw) setSavedLooks(JSON.parse(sraw));
    } catch (e) {
      console.warn("read saved looks failed", e);
    }
  }, []);

  // persist current selection
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(selectedByCategory));
    } catch (e) {
      console.warn("write current selection failed", e);
    }
  }, [selectedByCategory]);

  // persist saved looks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(savedLooks));
    } catch (e) {
      console.warn("write saved looks failed", e);
    }
  }, [savedLooks]);

  /* --- selection logic (one per category) --- */
  const selectItem = (item) => {
    setSelectedByCategory((prev) => {
      if (prev[item.category] === item.id) {
        const copy = { ...prev };
        delete copy[item.category];
        return copy;
      }
      return { ...prev, [item.category]: item.id };
    });
  };

  const removeCategory = (category) => {
    setSelectedByCategory((prev) => {
      const copy = { ...prev };
      delete copy[category];
      return copy;
    });
  };

  const clearAll = () => setSelectedByCategory({});

  // selected product objects
  const selectedProducts = Object.values(selectedByCategory)
    .map((pid) => products.find((p) => p.id === pid))
    .filter(Boolean);

  const totalPrice = selectedProducts.reduce((s, p) => s + (p?.price || 0), 0);

  /* --- Save/Load saved looks --- */
  const saveCurrentLook = async () => {
    // simple prompt for name (you can replace with a nicer modal later)
    const name = window.prompt("Save current look — give it a name:");
    if (!name) return;
    const look = {
      id: id(),
      name,
      createdAt: Date.now(),
      selection: selectedByCategory,
      // optionally link one preview image (uses the first selected product image or the uploaded image)
      preview:
        selectedProducts[0]?.image ||
        // you may test the uploaded local file path on your machine:
        UPLOADED_IMAGE_PATH,
    };
    setSavedLooks((s) => [look, ...s]);
    alert("Saved look ✅");
  };

  const loadSavedLook = (look) => {
    setSelectedByCategory(look.selection || {});
  };

  const deleteSavedLook = (lookId) => {
    if (!window.confirm("Delete this saved look?")) return;
    setSavedLooks((s) => s.filter((l) => l.id !== lookId));
  };

  /* --- export / import saved looks (JSON) --- */
  const exportSaved = () => {
    const payload = JSON.stringify(savedLooks, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "matchmylook-saved-looks.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSaved = (file) => {
    if (!file) return;
    setImportError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        // Expect array of looks
        if (!Array.isArray(data)) {
          setImportError("Invalid file: expected an array of looks.");
          return;
        }
        // make sure new looks have ids
        const normalized = data.map((lk) => ({ id: lk.id || id(), ...lk }));
        // Merge by id (prefer imported items, but avoid duplicates)
        const map = new Map(savedLooks.map((s) => [s.id, s]));
        normalized.forEach((n) => map.set(n.id, n));
        setSavedLooks(Array.from(map.values()));
        alert("Imported saved looks ✅");
      } catch (err) {
        console.error(err);
        setImportError("Failed to parse JSON file.");
      }
    };
    reader.readAsText(file);
  };

  /* helper to pretty date */
  const fmtDate = (ts) => new Date(ts).toLocaleString();

  return (
    <div style={{ padding: 24, fontFamily: '"Inter", system-ui, Arial', maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ margin: 0 }}>Combiner — Create Your Look</h1>

        <div style={{ textAlign: "right" }}>
          <div style={{ fontWeight: 700 }}>Total: ₹{totalPrice}</div>
          <div style={{ marginTop: 8, display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={saveCurrentLook} style={btnStyle}>
              Save Look
            </button>
            <button onClick={clearAll} style={btnStyleOutline}>
              Clear
            </button>
          </div>
        </div>
      </header>

      {/* Products */}
      <section style={{ marginTop: 22 }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {products.map((item) => {
            const isSelected = selectedByCategory[item.category] === item.id;
            return (
              <div key={item.id} style={{ width: 220, border: "1px solid #eee", borderRadius: 10, padding: 12 }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 8 }}
                />
                <div style={{ marginTop: 8, fontWeight: 700 }}>{item.name}</div>
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
                  {isSelected && (
                    <button onClick={() => removeCategory(item.category)} style={btnSmall}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Selected */}
      <section style={{ marginTop: 28 }}>
        <h2>Selected</h2>
        {selectedProducts.length === 0 ? (
          <p>No items selected yet. Choose one per category.</p>
        ) : (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {selectedProducts.map((p) => (
              <div key={p.id} style={{ width: 220, border: "1px solid #eee", borderRadius: 10, padding: 10, position: "relative" }}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: 110, objectFit: "cover", borderRadius: 8 }} />
                <div style={{ marginTop: 8, fontWeight: 700 }}>{p.name}</div>
                <div style={{ marginTop: 4 }}>₹{p.price}</div>
                <div style={{ marginTop: 6, color: "#666" }}>{p.category}</div>
                <button onClick={() => removeCategory(p.category)} style={{ ...btnSmall, position: "absolute", top: 10, right: 10 }}>
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Saved looks */}
      <section style={{ marginTop: 36 }}>
        <h2>Saved Looks</h2>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={exportSaved} style={btnStyle}>
            Export JSON
          </button>

          <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input
              type="file"
              accept=".json,application/json"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                importSaved(f);
                // reset input
                e.target.value = "";
              }}
            />
            <span style={btnStyleOutline}>Import JSON</span>
          </label>
        </div>

        {importError && <div style={{ color: "red", marginTop: 8 }}>{importError}</div>}

        <div style={{ marginTop: 12 }}>
          {savedLooks.length === 0 ? (
            <p>No saved looks yet — save the current look with the Save Look button.</p>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {savedLooks.map((lk) => (
                <div key={lk.id} style={{ border: "1px solid #eee", borderRadius: 8, padding: 10, display: "flex", gap: 12, alignItems: "center" }}>
                  <img
                    src={lk.preview || (lk.selection && products.find((p) => p.id === Object.values(lk.selection)[0])?.image)}
                    alt={lk.name}
                    style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 6 }}
                    onError={(e) => {
                      // fallback if preview URL not reachable (e.g. local filesystem path when deployed)
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/160x100?text=Preview";
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{lk.name}</div>
                    <div style={{ color: "#666", fontSize: 13 }}>Saved: {fmtDate(lk.createdAt)}</div>
                    <div style={{ marginTop: 6 }}>
                      <button onClick={() => loadSavedLook(lk)} style={btnSmall}>
                        Load
                      </button>
                      <button onClick={() => deleteSavedLook(lk.id)} style={{ ...btnSmall, marginLeft: 8 }}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* small button styles */
const btnStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "none",
  background: "#6366f1",
  color: "#fff",
  cursor: "pointer",
};

const btnStyleOutline = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#fff",
  color: "#000",
  cursor: "pointer",
};

const btnSmall = {
  padding: "6px 8px",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#fff",
  cursor: "pointer",
};

export default Combiner;
