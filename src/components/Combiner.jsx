import React, { useState } from "react";

const SAMPLE_ITEMS = [
  { id:1, name:"White Shirt", category:"top", tags:["white","casual","summer","neutral"], image:"/images/white-shirt.jpg" },
  { id:2, name:"Black Jeans", category:"bottom", tags:["black","casual","evening","neutral"], image:"/images/black-jeans.jpg" },
  { id:3, name:"Sneakers", category:"shoes", tags:["white","casual","sport"], image:"/images/sneakers.jpg" },
  { id:4, name:"Blue Shirt", category:"top", tags:["blue","smart","work","cool"], image:"/images/blue-shirt.jpg" },
  { id:5, name:"Chinos", category:"bottom", tags:["beige","smart","day"], image:"/images/chinos.jpg" },
  { id:6, name:"Loafers", category:"shoes", tags:["brown","smart","formal"], image:"/images/loafers.jpg" }
];

function scoreCombo(a,b,c){
  const s = (x,y)=> x.tags.filter(t=> y.tags.includes(t)).length;
  return s(a,b) + s(a,c) + s(b,c);
}

export default function Combiner(){
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [shoes, setShoes] = useState("");
  const [results, setResults] = useState([]);
  const [catalog] = useState(SAMPLE_ITEMS);

  function match(){
    const tops = catalog.filter(i=> i.category==="top");
    const bottoms = catalog.filter(i=> i.category==="bottom");
    const shoesList = catalog.filter(i=> i.category==="shoes");

    const pickByName = (list, q)=>{
      if(!q) return list;
      const s = q.toLowerCase();
      const found = list.filter(i=> i.name.toLowerCase().includes(s));
      return found.length ? found : list;
    };

    const topsTry = pickByName(tops, top);
    const bottomsTry = pickByName(bottoms, bottom);
    const shoesTry = pickByName(shoesList, shoes);

    const combos = [];
    for(const t of topsTry){
      for(const b of bottomsTry){
        for(const sh of shoesTry){
          const sc = scoreCombo(t,b,sh);
          combos.push({ score: sc, items: [t,b,sh] });
        }
      }
    }
    combos.sort((a,b)=> b.score - a.score);
    const top3 = combos.slice(0,3).map((c,idx)=> ({
      id: idx+1,
      title: c.score>1 ? `Best Match (score ${c.score})` : `Look #${idx+1}`,
      items: c.items
    }));
    setResults(top3);
  }

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Outfit Combiner</h2>

      <div className="grid sm:grid-cols-3 gap-3">
        <input value={top} onChange={e=>setTop(e.target.value)} placeholder="Top (try: white shirt)" className="p-3 border rounded" />
        <input value={bottom} onChange={e=>setBottom(e.target.value)} placeholder="Bottom (try: black jeans)" className="p-3 border rounded" />
        <input value={shoes} onChange={e=>setShoes(e.target.value)} placeholder="Shoes (try: sneakers)" className="p-3 border rounded" />
      </div>

      <div className="mt-4">
        <button onClick={match} className="px-4 py-2 bg-purple-600 text-white rounded">Match</button>
      </div>

      <div className="mt-6">
        {results.length===0 && <div className="text-gray-500">No results yet — enter some items and press Match.</div>}
        {results.map(r=>(
          <div key={r.id} className="mt-3 p-3 border rounded bg-white shadow-sm">
            <div className="flex gap-4 items-center">
              <div className="grid grid-cols-3 gap-2 w-full">
                {r.items.map(it=>(
                  <div key={it.id} className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mb-2">
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover"/>
                    </div>
                    <div className="text-sm font-medium">{it.name}</div>
                    <div className="text-xs text-gray-400">{it.tags.join(", ")}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-end">
                <div className="font-semibold">{r.title}</div>
                <div className="mt-2">
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded">Save</button>
                  <button className="ml-2 px-3 py-1 border rounded">Share</button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
