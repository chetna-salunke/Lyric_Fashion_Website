import { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/products.js";
import { rules } from "../utils/validate.js";
import { IconFacebook, IconTwitter, IconLinkedIn, IconInstagram } from "./Icons.jsx";
import "./Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const msg = rules.email(email);
    setError(msg);
    if (!msg) { setDone(true); setEmail(""); }
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__news">
          <p className="footer__eyebrow">Join the list</p>
          <h2>Letters from Lyric</h2>
          <p className="footer__sub">New drops, styling notes and early access — once a fortnight, never spam.</p>
          {done ? (
            <p className="footer__ok" role="status">Welcome aboard! Check your inbox for a hello.</p>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="footer__form">
                <label htmlFor="news-email" className="visually-hidden">Email address</label>
                <input id="news-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }} placeholder="Your email address" aria-invalid={!!error} aria-describedby={error ? "news-err" : undefined} autoComplete="email" />
                <button type="submit">Subscribe</button>
              </div>
              {error && <p id="news-err" className="footer__err" role="alert">{error}</p>}
            </form>
          )}
        </div>

        <nav className="footer__col" aria-label="Shop">
          <h3>Shop</h3>
          {CATEGORIES.slice(0, 5).map((c) => <Link key={c.id} to={`/shop/${c.id}`}>{c.name}</Link>)}
        </nav>
        <nav className="footer__col" aria-label="Company">
          <h3>Lyric</h3>
          <Link to="/about">Our story</Link>
          <Link to="/collection">Collections</Link>
          <Link to="/support">Support</Link>
          <Link to="/support#faq">FAQ</Link>
        </nav>
        <div className="footer__col">
          <h3>Follow</h3>
          <div className="footer__social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><IconTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
          </div>
        </div>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Lyric Fashion. Photos via Unsplash. Brand names are fictional.</p>
    </footer>
  );
}
