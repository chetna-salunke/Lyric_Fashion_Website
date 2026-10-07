import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { BRANDS, byId, categoryOf, collectionOf, discount, formatPrice, related, FREE_SHIPPING_ABOVE } from "../data/products.js";
import { useStore } from "../context/Store.jsx";
import { rules } from "../utils/validate.js";
import ProductCard from "../components/ProductCard.jsx";
import SafeImage from "../components/SafeImage.jsx";
import Reveal from "../components/Reveal.jsx";
import { IconHeart, IconMinus, IconPlus, IconCheck } from "../components/Icons.jsx";
import NotFound from "./NotFound.jsx";
import "./Product.css";

function Accordion({ title, children, open = false }) {
  const [on, setOn] = useState(open);
  return (
    <div className="acc">
      <button className="acc__btn" aria-expanded={on} onClick={() => setOn(!on)}>{title}<span aria-hidden="true">{on ? "–" : "+"}</span></button>
      <AnimatePresence initial={false}>
        {on && (
          <motion.div className="acc__panel" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Product() {
  const { id } = useParams();
  const product = byId(id);
  const { addToCart, wish, toggleWish, openBag } = useStore();
  const [size, setSize] = useState("");
  const [sizeErr, setSizeErr] = useState("");
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState({ ok: false, text: "" });
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 });

  useEffect(() => { setSize(""); setSizeErr(""); setQty(1); setPin(""); setPinMsg({ ok: false, text: "" }); }, [id]);

  if (!product) return <NotFound />;

  const brand = BRANDS[product.brand];
  const cat = categoryOf(product.category);
  const liked = wish.includes(product.id);
  const single = product.sizes.length === 1;
  const chosen = single ? product.sizes[0] : size;

  const add = (goToBag) => {
    if (!chosen) {
      setSizeErr("Please select a size before adding to your bag.");
      document.getElementById("size-group")?.focus();
      return;
    }
    addToCart(product.id, chosen, qty);
    if (goToBag) openBag();
  };

  const checkPin = (e) => {
    e.preventDefault();
    const msg = rules.pincode(pin);
    if (msg) return setPinMsg({ ok: false, text: msg });
    const days = 2 + (Number(pin[5]) % 4);
    setPinMsg({ ok: true, text: `Delivery to ${pin} in ${days}–${days + 2} days. Cash on delivery available.` });
    return undefined;
  };

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="page prod">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/shop">Shop</Link><span aria-hidden="true">/</span>
          <Link to={`/shop/${cat.id}`}>{cat.name}</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="prod__grid">
          <motion.div className="prod__media" initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
            onMouseMove={onMove} onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}>
            <SafeImage src={product.image} alt={`${product.name} worn by a model`} label={product.name} loading="eager"
              style={{ transform: zoom.on ? "scale(1.7)" : "scale(1)", transformOrigin: `${zoom.x}% ${zoom.y}%` }} />
            {product.tag && <span className="pcard__tag">{product.tag}</span>}
          </motion.div>

          <motion.div className="prod__info" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="eyebrow">{brand.name}</p>
            <h1 className="display prod__name">{product.name}</h1>
            <p className="prod__price">
              <strong>{formatPrice(product.price)}</strong>
              <s>{formatPrice(product.mrp)}</s>
              <span>{discount(product)}% off</span>
            </p>
            <p className="prod__tax">Inclusive of all taxes. {product.price >= FREE_SHIPPING_ABOVE ? "Free shipping." : `Free shipping above ${formatPrice(FREE_SHIPPING_ABOVE)}.`}</p>
            <p className="prod__desc">{product.desc}</p>

            <div className="prod__sizes">
              <div className="prod__sizehead"><span id="size-label">{single ? "Size" : "Select size"}</span></div>
              {single ? (
                <p className="prod__one">One size</p>
              ) : (
                <div id="size-group" tabIndex={-1} role="radiogroup" aria-labelledby="size-label" aria-describedby={sizeErr ? "size-err" : undefined}>
                  {product.sizes.map((s) => (
                    <button key={s} role="radio" aria-checked={size === s} className={size === s ? "size size--on" : "size"} onClick={() => { setSize(s); setSizeErr(""); }}>{s}</button>
                  ))}
                </div>
              )}
              {sizeErr && <p className="prod__err" id="size-err" role="alert">{sizeErr}</p>}
            </div>

            <div className="prod__buy">
              <div className="qty qty--lg" aria-label="Quantity">
                <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}><IconMinus /></button>
                <span aria-live="polite">{qty}</span>
                <button aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(10, q + 1))} disabled={qty >= 10}><IconPlus /></button>
              </div>
              <button className="btn prod__add" onClick={() => add(false)}>Add to bag</button>
              <button className={liked ? "prod__heart prod__heart--on" : "prod__heart"} aria-pressed={liked} aria-label={liked ? "Remove from wishlist" : "Save to wishlist"} onClick={() => toggleWish(product.id)}><IconHeart filled={liked} /></button>
            </div>
            <button className="btn btn--ghost btn--block" onClick={() => add(true)}>Buy now</button>

            <form className="prod__pin" onSubmit={checkPin} noValidate>
              <label htmlFor="pin">Check delivery</label>
              <div>
                <input id="pin" inputMode="numeric" maxLength={6} value={pin} onChange={(e) => { setPin(e.target.value.replace(/\D/g, "")); setPinMsg({ ok: false, text: "" }); }} placeholder="Enter PIN code" aria-invalid={!!pinMsg.text && !pinMsg.ok} aria-describedby="pin-msg" />
                <button className="btn btn--sm" type="submit">Check</button>
              </div>
              <p id="pin-msg" role="status" className={pinMsg.ok ? "prod__ok" : "prod__err"}>{pinMsg.ok && <IconCheck />} {pinMsg.text}</p>
            </form>

            <div className="prod__accs">
              <Accordion title="Product details" open>
                <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
              </Accordion>
              <Accordion title={`About ${brand.name}`}><p>{brand.story}</p></Accordion>
              <Accordion title="Shipping & returns"><p>Ships in 24–48 hours. Free 15-day returns on unworn items with tags. Refunds go back to your original payment method within 5–7 days.</p></Accordion>
            </div>

            {product.collections.length > 0 && (
              <p className="prod__cols">Featured in: {product.collections.map((c, i) => (<span key={c}>{i > 0 && ", "}<Link to={`/collection/${c}`}>{collectionOf(c).name}</Link></span>))}</p>
            )}
          </motion.div>
        </div>

        <Reveal className="prod__rel">
          <p className="eyebrow">You may also like</p>
          <h2 className="display">Related styles</h2>
          <div className="grid">
            {related(product, 4).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
