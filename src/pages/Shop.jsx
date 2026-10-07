import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { CATEGORIES, PRODUCTS, byCategory, formatPrice } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SafeImage from "../components/SafeImage.jsx";
import { IconArrow } from "../components/Icons.jsx";
import "./Shop.css";

export default function Shop() {
  const track = useRef(null);
  const scroll = (dir) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.7, 260), behavior: "smooth" });
  };

  return (
    <div className="page shop">
      <div className="container">
        <header className="shop__head">
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>The shop</motion.p>
            <motion.h1 className="display shop__title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              Product <em>highlight</em>
            </motion.h1>
            <p className="lede">Choose a category to see every piece — with brand, price and a short description — worn by real people.</p>
          </div>
          <div className="shop__arrows">
            <button aria-label="Scroll left" onClick={() => scroll(-1)}><IconArrow dir="left" /></button>
            <button aria-label="Scroll right" onClick={() => scroll(1)}><IconArrow /></button>
          </div>
        </header>

        <div className="strip" ref={track} role="list" aria-label="Product categories">
          {CATEGORIES.map((c, i) => {
            const items = byCategory(c.id);
            const from = Math.min(...items.map((x) => x.price));
            return (
              <motion.div role="listitem" className="strip__item" key={c.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.6 }}>
                <Link to={`/shop/${c.id}`} className="arch">
                  <span className="arch__img"><SafeImage src={c.cover} alt={`Model wearing ${c.name.toLowerCase()}`} label={c.name} /></span>
                  <span className="arch__txt">
                    <strong>{c.name}</strong>
                    <small>{items.length} styles · from {formatPrice(from)}</small>
                    <em>View all <IconArrow /></em>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <section className="shop__sec">
          <Reveal><h2 className="display">New arrivals</h2></Reveal>
          <div className="grid">
            {PRODUCTS.filter((p) => p.tag === "New").slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>

        <section className="shop__sec">
          <Reveal><h2 className="display">Bestsellers</h2></Reveal>
          <div className="grid">
            {PRODUCTS.filter((p) => p.tag === "Bestseller").slice(0, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
