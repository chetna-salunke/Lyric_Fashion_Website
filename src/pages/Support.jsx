import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { rules, validateAll } from "../utils/validate.js";
import Field from "../components/Field.jsx";
import Reveal from "../components/Reveal.jsx";
import { IconCheck } from "../components/Icons.jsx";
import "./Support.css";

const SCHEMA = { name: rules.name, email: rules.email, orderNo: rules.orderNo, topic: (v) => (v ? "" : "Please choose a topic."), message: rules.message };
const EMPTY = { name: "", email: "", orderNo: "", topic: "", message: "" };
const FAQ = [
  ["How long does delivery take?", "Most orders arrive in 3–5 working days. Metro cities are often 2–3 days. You'll get a tracking link by email once your parcel ships."],
  ["What is your return policy?", "Unworn items with tags can be returned within 15 days for free. Refunds reach your original payment method in 5–7 working days."],
  ["How do I find my size?", "Each product page lists its sizes. If you're between sizes we suggest sizing up for kurtis and coats, and down for tailoring — or message us and we'll help."],
  ["Is Cash on Delivery available?", "Yes — COD is available on most PIN codes. You can check yours with the delivery checker on any product page."],
  ["Are the brands real?", "The brands on this demo site are fictional house labels created for the project, so you can swap in your own."],
];

export default function Support() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(0);
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === "#faq") document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: SCHEMA[name](value) }));
  };
  const onBlur = (e) => {
    const { name, value } = e.target;
    setErrors((er) => ({ ...er, [name]: SCHEMA[name](value) }));
  };
  const submit = (e) => {
    e.preventDefault();
    const er = validateAll(SCHEMA, values);
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(Object.keys(er)[0])?.focus();
      return;
    }
    setSent(true);
  };
  const reset = () => { setValues(EMPTY); setErrors({}); setSent(false); };

  return (
    <div className="page sup">
      <div className="container">
        <header className="sup__head">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Support</motion.p>
          <motion.h1 className="display" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>We're here to <em>help</em>.</motion.h1>
          <p className="lede">Questions about an order, a fit or a return? Write to us and a real person replies within one working day.</p>
        </header>

        <div className="sup__grid">
          <Reveal className="sup__form-card">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="ok" className="sup__sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <span className="sup__tick"><IconCheck /></span>
                  <h2>Message sent</h2>
                  <p>Thank you, {values.name.split(" ")[0]}. We'll reply to <strong>{values.email}</strong> within one working day.</p>
                  <button className="btn btn--ghost" onClick={reset}>Send another</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} aria-label="Contact form">
                  <h2>Send us a message</h2>
                  <div className="sup__row">
                    <Field id="name" label="Your name" value={values.name} onChange={onChange} onBlur={onBlur} error={errors.name} autoComplete="name" placeholder="Aarohi Sharma" />
                    <Field id="email" type="email" label="Email" value={values.email} onChange={onChange} onBlur={onBlur} error={errors.email} autoComplete="email" placeholder="you@example.com" />
                  </div>
                  <div className="sup__row">
                    <Field id="topic" as="select" label="Topic" value={values.topic} onChange={onChange} onBlur={onBlur} error={errors.topic}>
                      <option value="">Choose a topic…</option>
                      <option>Order &amp; delivery</option>
                      <option>Returns &amp; refunds</option>
                      <option>Size &amp; fit help</option>
                      <option>Something else</option>
                    </Field>
                    <Field id="orderNo" label="Order number" optional value={values.orderNo} onChange={onChange} onBlur={onBlur} error={errors.orderNo} hint="e.g. LY-10492" placeholder="LY-10492" />
                  </div>
                  <Field id="message" as="textarea" label="How can we help?" value={values.message} onChange={onChange} onBlur={onBlur} error={errors.message} maxLength={600} placeholder="Tell us a little more…" hint={`${values.message.length}/600 characters`} />
                  <button className="btn" type="submit">Send message</button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.1} className="sup__side">
            <div className="sup__card"><h3>Email</h3><a href="mailto:hello@lyricfashion.example">hello@lyricfashion.example</a></div>
            <div className="sup__card"><h3>Phone</h3><a href="tel:+912000000000">+91 20 0000 0000</a><p>Mon–Sat, 10am – 7pm IST</p></div>
            <div className="sup__card"><h3>Studio</h3><p>Pimpri-Chinchwad, Maharashtra, India</p></div>
          </Reveal>
        </div>

        <section className="faq" id="faq">
          <Reveal><p className="eyebrow">Quick answers</p><h2 className="display">Frequently asked</h2></Reveal>
          <div className="faq__list">
            {FAQ.map(([q, a], i) => (
              <div className="faq__item" key={q}>
                <h3><button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>{q}<span aria-hidden="true">{open === i ? "–" : "+"}</span></button></h3>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div id={`faq-${i}`} role="region" className="faq__a" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}><p>{a}</p></motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
