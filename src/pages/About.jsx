import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ABOUT_IMAGES, BRANDS } from "../data/products.js";
import Reveal from "../components/Reveal.jsx";
import SafeImage from "../components/SafeImage.jsx";
import { IconArrow } from "../components/Icons.jsx";
import "./About.css";

const VALUES = [
  { n: "01", t: "Crafted, not rushed", d: "Every label we stock is small-batch, with named makers and fair wages. Fewer pieces, better made." },
  { n: "02", t: "Kinder to the planet", d: "Natural and recycled fibres wherever possible, and every parcel ships in plastic-free packaging." },
  { n: "03", t: "Seen on real people", d: "Our photos show pieces worn by real people, so what you see is what arrives at your door." },
];
const TIMELINE = [
  { y: "2019", t: "A sketchbook and a sewing table", d: "Lyric begins as a tiny studio in Pune, designing kurtis for friends." },
  { y: "2021", t: "Opening the doors to other makers", d: "We invite independent labels to share the shelf — bags, jewellery and tailoring join the edit." },
  { y: "2023", t: "Plastic-free from box to bow", d: "All packaging moves to recycled paper, cotton ties and seed-paper tags." },
  { y: "2025", t: "Lyric, online", d: "A new home for our edit — more pieces, more voices, same care." },
];

export default function About() {
  return (
    <div className="about">
      <section className="page about__hero">
        <div className="about__copy">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>About Lyric</motion.p>
          <motion.h1 className="display" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            A wardrobe that <em>sings</em> your story.
          </motion.h1>
          <motion.p className="lede" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            Lyric is a home for fashion that feels personal. We bring together independent labels who care about fabric, fit and finish — so you can dress with intention and wear things for years, not weeks.
          </motion.p>
          <motion.div className="about__cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <Link to="/shop" className="btn">Shop the edit <IconArrow /></Link>
            <Link to="/support" className="btn btn--ghost">Talk to us</Link>
          </motion.div>
        </div>
        <motion.div className="about__arch" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
          <SafeImage src={ABOUT_IMAGES.portrait} alt="Portrait of a woman in an elegant outfit" label="Lyric" loading="eager" />
        </motion.div>
      </section>

      <section className="about__values">
        <div className="container">
          <Reveal><p className="eyebrow">What we believe</p><h2 className="display">Three simple promises</h2></Reveal>
          <div className="vals">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.1} className="val"><span>{v.n}</span><h3>{v.t}</h3><p>{v.d}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about__studio">
        <div className="about__studio-img"><SafeImage src={ABOUT_IMAGES.studio} alt="A designer working on a garment on a mannequin" label="The studio" /></div>
        <Reveal className="about__studio-copy">
          <p className="eyebrow">The studio</p>
          <h2 className="display">Where every piece begins</h2>
          <p>Before a label joins Lyric, our team visits the studio, handles the fabric and fits every sample. If it doesn't feel right on the body, it doesn't make the edit.</p>
        </Reveal>
      </section>

      <section className="about__time">
        <div className="container">
          <Reveal><p className="eyebrow">Our journey</p><h2 className="display">From one table to many makers</h2></Reveal>
          <ol className="tl">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.y} x={i % 2 ? 30 : -30} y={0} className="tl__item"><span className="tl__year">{t.y}</span><div><h3>{t.t}</h3><p>{t.d}</p></div></Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="about__brands">
        <div className="container">
          <Reveal><p className="eyebrow">The labels</p><h2 className="display">Meet the makers</h2></Reveal>
          <div className="brands">
            {Object.entries(BRANDS).map(([k, b], i) => (
              <Reveal key={k} delay={(i % 4) * 0.07} className="brand"><h3>{b.name}</h3><p>{b.story}</p></Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
