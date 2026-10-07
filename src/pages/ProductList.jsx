import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { CATEGORIES, COLLECTIONS, byCategory, byCollection, categoryOf, collectionOf } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SafeImage from "../components/SafeImage.jsx";
import NotFound from "./NotFound.jsx";
import "./ProductList.css";

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  low: { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  high: { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  deal: { label: "Biggest discount", fn: (a, b) => (b.mrp - b.price) / b.mrp - (a.mrp - a.price) / a.mrp },
};
const RANGES = [
  { id: "all", label: "Any price", test: () => true },
  { id: "u5", label: "Under ₹5,000", test: (p) => p.price < 5000 },
  { id: "5-10", label: "₹5,000 – ₹10,000", test: (p) => p.price >= 5000 && p.price < 10000 },
  { id: "10-20", label: "₹10,000 – ₹20,000", test: (p) => p.price >= 10000 && p.price < 20000 },
  { id: "20+", label: "₹20,000 +", test: (p) => p.price >= 20000 },
];

/* One page for both /shop/:category and /collection/:slug */
export default function ProductList({ kind }) {
  const params = useParams();
  const [sort, setSort] = useState("featured");
  const [range, setRange] = useState("all");

  const isCat = kind === "category";
  const meta = isCat ? categoryOf(params.category) : collectionOf(params.slug);
  const base = isCat ? byCategory(params.category) : byCollection(params.slug);

  const items = useMemo(() => {
    const r = RANGES.find((x) => x.id === range);
    return base.filter(r.test).sort(SORTS[sort].fn);
  }, [base, sort, range]);

  if (!meta) return <NotFound />;

  const parent = isCat ? { to: "/shop", label: "Shop" } : { to: "/collection", label: "Categories" };

  return (
    <div className="page plist">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to={parent.to}>{parent.label}</Link><span aria-hidden="true">/</span><span aria-current="page">{meta.name}</span>
        </nav>

        <header className="plist__head">
          <motion.h1 className="display plist__title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>{meta.name}</motion.h1>
          <p className="lede">{meta.blurb}</p>
        </header>

        {isCat && (
          <>
          <p className="eyebrow look__label">Featured look · more from {meta.name}</p>
          <section className="look" aria-label={`${meta.name} lookbook`}>
            <figure className="look__lead">
              <SafeImage src={meta.cover} alt={`${meta.name} — featured look`} label={meta.name} loading="eager" />
            </figure>
            {meta.lookbook?.length > 0 && (
              <div className="look__strip" role="list" aria-label="More looks">
                {meta.lookbook.map((src, i) => (
                  <figure role="listitem" className="look__item" key={src}>
                    <SafeImage src={src} alt={`${meta.name} look ${i + 2}`} label={meta.name} />
                  </figure>
                ))}
              </div>
            )}
          </section>
          </>
        )}

        <div className="plist__bar">
          <div className="plist__ranges" role="group" aria-label="Filter by price">
            {RANGES.map((r) => (
              <button key={r.id} className="chip" aria-pressed={range === r.id} onClick={() => setRange(r.id)}>{r.label}</button>
            ))}
          </div>
          <label className="plist__sort">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </label>
        </div>

        <p className="plist__count" role="status">{items.length} {items.length === 1 ? "piece" : "pieces"}</p>

        {items.length ? (
          <div className="grid" key={sort + range}>
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        ) : (
          <div className="plist__empty">
            <p>Nothing in this price range yet.</p>
            <button className="btn btn--sm" onClick={() => setRange("all")}>Clear filter</button>
          </div>
        )}

        <Reveal className="plist__more">
          <h2 className="display">{isCat ? "More categories" : "More collections"}</h2>
          <div className="plist__links">
            {(isCat ? CATEGORIES.filter((c) => c.id !== meta.id).map((c) => ({ to: `/shop/${c.id}`, name: c.name })) : COLLECTIONS.filter((c) => c.id !== meta.id).map((c) => ({ to: `/collection/${c.id}`, name: c.name }))).map((l) => (
              <Link key={l.to} to={l.to} className="chip">{l.name}</Link>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
