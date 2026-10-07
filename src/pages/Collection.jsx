import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CATEGORIES, COLLECTIONS, PRODUCTS, byCollection } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SafeImage from "../components/SafeImage.jsx";
import { IconArrow } from "../components/Icons.jsx";
import "./Collection.css";

export default function Collection() {
  const [cat, setCat] = useState("all");
  const shown = cat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);

  return (
    <div className="page coll">
      <div className="container">
        <header className="coll__head">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Categories &amp; collections</motion.p>
          <motion.h1 className="display coll__title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            New <em>collection</em>
          </motion.h1>
          <p className="lede">Six curated edits for every occasion — open one to see the full look with prices — or browse every piece by category below.</p>
        </header>

        <div className="cols">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 0.08} className={i === 0 ? "col col--wide" : "col"}>
              <Link to={`/collection/${c.id}`}>
                <div className="col__img"><SafeImage src={c.cover} alt={`${c.name} lookbook`} label={c.name} /></div>
                <div className="col__txt">
                  <span className="col__tag">{c.tag}</span>
                  <h2>{c.name}</h2>
                  <p>{c.blurb}</p>
                  <span className="col__cta">{byCollection(c.id).length} pieces <IconArrow /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <section className="coll__all" aria-labelledby="all-h">
          <Reveal>
            <h2 className="display" id="all-h">Browse every piece</h2>
            <div className="coll__pills" role="group" aria-label="Filter by category">
              <button className="chip" aria-pressed={cat === "all"} onClick={() => setCat("all")}>All ({PRODUCTS.length})</button>
              {CATEGORIES.map((c) => (
                <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.name}</button>
              ))}
            </div>
          </Reveal>
          <div className="grid" key={cat}>
            {shown.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
