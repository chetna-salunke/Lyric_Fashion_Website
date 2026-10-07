import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useMotionValue, useScroll, useSpring, useTransform, animate } from "motion/react";
import { CATEGORIES, COLLECTIONS, HERO_LOOKS, PRODUCTS, byCategory } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";
import Reveal from "../components/Reveal.jsx";
import SafeImage from "../components/SafeImage.jsx";
import { IconArrow } from "../components/Icons.jsx";
import "./Home.css";

const WORDS = ["Fashion", "that", "sings", "your", "style."];
const MARQUEE = ["Free shipping over ₹4,999", "Easy 15-day returns", "Handcrafted in India", "Plastic-free packaging", "New drops every Friday"];
const STATS = [
  { to: 40, suffix: "+", label: "Pieces in the edit" },
  { to: 8, suffix: "", label: "Independent labels" },
  { to: 15, suffix: " days", label: "Easy returns" },
  { to: 100, suffix: "%", label: "Plastic-free packaging" },
];
const QUOTES = [
  { q: "The trench fits like it was cut for me, and it arrived in a box I could actually reuse.", n: "Ananya R.", c: "Pune" },
  { q: "Finally a place where the kurtis look like the photos. The chikankari work is beautiful.", n: "Meera S.", c: "Mumbai" },
  { q: "Quality leather bag at a fair price. Three months in and it only looks better.", n: "Ishita K.", c: "Bengaluru" },
];

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function Home() {
  const [look, setLook] = useState(0);
  const [tab, setTab] = useState("all");
  const [quote, setQuote] = useState(0);
  const current = HERO_LOOKS[look];

  /* hero image follows the mouse a little */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 18 });
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  /* banner parallax */
  const bannerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: bannerRef, offset: ["start end", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  useEffect(() => {
    const t = setInterval(() => setQuote((q) => (q + 1) % QUOTES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const trending = PRODUCTS.filter((p) => (tab === "all" ? p.tag : p.tag.toLowerCase() === tab)).slice(0, 8);
  const spotlight = COLLECTIONS[0];

  return (
    <div className="home">
      {/* ---------------- hero ---------------- */}
      <section className="hero page">
        <motion.div className="hero__blob" aria-hidden="true" animate={{ background: current.accent }} transition={{ duration: 0.8 }} />
        <div className="hero__copy">
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>Spring · Summer · New season</motion.p>
          <h1 className="display hero__title" aria-label={WORDS.join(" ")}>
            {WORDS.map((w, i) => (
              <span className="hero__word" key={w + i} aria-hidden="true">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.09, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>{w}&nbsp;</motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
            Dresses, kurtis, coats and bags from independent labels — made well, photographed on real people and delivered in plastic-free packaging.
          </motion.p>
          <motion.div className="hero__cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Link to="/shop" className="btn">Shop the edit <IconArrow /></Link>
            <Link to="/collection" className="btn btn--ghost">Explore categories</Link>
          </motion.div>

          <motion.div className="hero__looks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <span className="hero__looks-label">Pick a look</span>
            <div role="radiogroup" aria-label="Hero look" className="hero__swatches">
              {HERO_LOOKS.map((l, i) => (
                <button key={l.id} role="radio" aria-checked={look === i} aria-label={`${l.name} — ${l.look}`} className={look === i ? "swatch swatch--on" : "swatch"} style={{ "--c": l.accent }} onClick={() => setLook(i)} />
              ))}
            </div>
            <span className="hero__looks-name" aria-live="polite">{current.name} · {current.look}</span>
          </motion.div>
        </div>

        <div className="hero__stage" onMouseMove={onMove} onMouseLeave={onLeave}>
          <motion.div className="hero__arch" style={{ rotateX: rx, rotateY: ry }} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              <motion.div key={current.id} className="hero__img" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                <SafeImage src={current.image} alt={current.alt} label={current.look} loading="eager" fetchpriority="high" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div className="hero__badge" aria-hidden="true" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }}>
            <svg viewBox="0 0 120 120" width="100%" height="100%"><defs><path id="circ" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text fontSize="11" fontWeight="700" fill="currentColor"><textPath href="#circ" textLength="272" lengthAdjust="spacing">NEW SEASON • HANDCRAFTED • LYRIC •</textPath></text></svg>
          </motion.div>

          <motion.div className="hero__float" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}>
            <span>From</span><strong>₹2,290</strong>
            <Link to={current.to}>View {current.look.toLowerCase()} →</Link>
          </motion.div>
        </div>
      </section>

      {/* ---------------- marquee ---------------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((t, i) => (<span key={i}>{t}<i>✦</i></span>))}
        </div>
      </div>

      {/* ---------------- categories ---------------- */}
      <section className="block">
        <div className="container">
          <Reveal><p className="eyebrow">Browse</p><h2 className="display block__title">Shop by category</h2></Reveal>
          <div className="cats">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={(i % 4) * 0.07} className="cat">
                <Link to={`/shop/${c.id}`}>
                  <div className="cat__img"><SafeImage src={c.cover} alt={`${c.name} on a model`} label={c.name} /></div>
                  <div className="cat__txt"><h3>{c.name}</h3><span>{byCategory(c.id).length} styles <IconArrow /></span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- trending ---------------- */}
      <section className="block block--tint">
        <div className="container">
          <div className="block__head">
            <Reveal><p className="eyebrow">Right now</p><h2 className="display block__title">Trending this week</h2></Reveal>
            <div className="tabs" role="group" aria-label="Filter trending">
              {[["all", "All"], ["bestseller", "Bestsellers"], ["new", "New in"]].map(([v, l]) => (
                <button key={v} className="chip" aria-pressed={tab === v} onClick={() => setTab(v)}>{l}</button>
              ))}
            </div>
          </div>
          <div className="grid" key={tab}>
            {trending.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ---------------- spotlight banner ---------------- */}
      <section className="spot" ref={bannerRef}>
        <div className="spot__bg" aria-hidden="true"><img src={spotlight.cover} alt="" loading="lazy" /></div>
        <div className="spot__shade" />
        <div className="container spot__inner">
          <Reveal className="spot__copy">
            <p className="eyebrow">{spotlight.tag}</p>
            <h2 className="display">{spotlight.name}</h2>
            <p>{spotlight.blurb}</p>
            <Link to={`/collection/${spotlight.id}`} className="btn btn--light">Shop the collection <IconArrow /></Link>
          </Reveal>
          <motion.div className="spot__frame" style={{ y: bannerY }}>
            <SafeImage src={spotlight.cover} alt={`${spotlight.name} lookbook`} label={spotlight.name} loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* ---------------- promise ---------------- */}
      <section className="block">
        <div className="container">
          <Reveal className="stats__head"><p className="eyebrow">Our promise</p><h2 className="display block__title">Made to be worn, again and again.</h2></Reveal>
          <ul className="stats">
            {STATS.map((s, i) => (
              <Reveal as="li" key={s.label} delay={i * 0.08}><strong><CountUp to={s.to} suffix={s.suffix} /></strong><span>{s.label}</span></Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- testimonials ---------------- */}
      <section className="block block--tint quotes">
        <div className="container">
          <p className="eyebrow">Kind words</p>
          <div className="quotes__stage" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.blockquote key={quote} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.45 }}>
                <p>“{QUOTES[quote].q}”</p>
                <footer>{QUOTES[quote].n} · {QUOTES[quote].c}</footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
          <div className="quotes__dots" role="group" aria-label="Choose testimonial">
            {QUOTES.map((_, i) => (<button key={i} aria-label={`Testimonial ${i + 1}`} aria-pressed={quote === i} className={quote === i ? "dot dot--on" : "dot"} onClick={() => setQuote(i)} />))}
          </div>
        </div>
      </section>
    </div>
  );
}
