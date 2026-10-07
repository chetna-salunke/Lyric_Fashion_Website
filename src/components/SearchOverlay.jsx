import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { CATEGORIES, BRANDS, formatPrice, searchProducts } from "../data/products.js";
import { useStore } from "../context/Store.jsx";
import SafeImage from "./SafeImage.jsx";
import { IconClose, IconSearch } from "./Icons.jsx";
import "./SearchOverlay.css";

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const input = useRef(null);
  const navigate = useNavigate();
  const results = searchProducts(q).slice(0, 8);

  useEffect(() => {
    if (!searchOpen) return undefined;
    setQ("");
    const t = setTimeout(() => input.current?.focus(), 80);
    const onKey = (e) => e.key === "Escape" && setSearchOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [searchOpen, setSearchOpen]);

  const go = (path) => { setSearchOpen(false); navigate(path); };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div className="search" role="dialog" aria-modal="true" aria-label="Search products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="search__scrim" onClick={() => setSearchOpen(false)} />
          <motion.div className="search__panel" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <form className="search__form" onSubmit={(e) => { e.preventDefault(); if (results[0]) go(`/product/${results[0].id}`); }}>
              <IconSearch />
              <label className="visually-hidden" htmlFor="site-search">Search</label>
              <input id="site-search" ref={input} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dresses, bags, kurtis, brands…" autoComplete="off" />
              <button type="button" className="search__close" aria-label="Close search" onClick={() => setSearchOpen(false)}><IconClose /></button>
            </form>

            {!q.trim() ? (
              <div className="search__suggest">
                <p>Popular categories</p>
                <div>
                  {CATEGORIES.map((c) => (
                    <button key={c.id} className="search__chip" onClick={() => go(`/shop/${c.id}`)}>{c.name}</button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="search__empty" role="status">No matches for “{q}”. Try “bag”, “kurti” or “coat”.</p>
            ) : (
              <ul className="search__results" aria-label="Search results">
                {results.map((r) => (
                  <li key={r.id}>
                    <button onClick={() => go(`/product/${r.id}`)}>
                      <span className="search__thumb"><SafeImage src={r.thumb} alt="" label="" /></span>
                      <span className="search__info"><strong>{r.name}</strong><small>{BRANDS[r.brand].name}</small></span>
                      <span className="search__price">{formatPrice(r.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
