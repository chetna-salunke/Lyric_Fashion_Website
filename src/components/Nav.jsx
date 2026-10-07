import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES } from "../data/products.js";
import { useStore } from "../context/Store.jsx";
import { IconMenu, IconClose, IconSearch, IconBag, IconHeart, IconFacebook, IconTwitter, IconLinkedIn, IconInstagram } from "./Icons.jsx";
import "./Nav.css";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/shop", label: "Shop" },
  { to: "/collection", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, wish, openBag, openWish, setSearchOpen } = useStore();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={scrolled ? "nav nav--scrolled" : "nav"}>
      <button className="nav__icon-btn nav__hamburger" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
        <IconMenu />
      </button>

      <Link to="/" className="nav__logo" aria-label="Lyric — home">Ly</Link>

      <nav className="nav__links" aria-label="Primary">
        {LINKS.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? "nav__pill nav__pill--active" : "nav__pill")}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav__actions">
        <button className="nav__icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}><IconSearch /></button>
        <button className="nav__icon-btn nav__wish" aria-label={`Wishlist, ${wish.length} items`} onClick={openWish}>
          <IconHeart />
          {wish.length > 0 && <span className="nav__badge" aria-hidden="true">{wish.length}</span>}
        </button>
        <button className="nav__icon-btn" aria-label={`Bag, ${count} items`} onClick={openBag}>
          <IconBag />
          {count > 0 && <motion.span key={count} className="nav__badge" aria-hidden="true" initial={{ scale: 0.4 }} animate={{ scale: 1 }}>{count}</motion.span>}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="side__scrim" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside
              className="side"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="side__top">
                <span className="side__brand">Lyric</span>
                <button className="nav__icon-btn" aria-label="Close menu" onClick={() => setOpen(false)}><IconClose /></button>
              </div>

              <nav className="side__links" aria-label="Mobile">
                {LINKS.map((l, i) => (
                  <motion.div key={l.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.05 }}>
                    <NavLink to={l.to} end={l.end} className={({ isActive }) => (isActive ? "side__link side__link--active" : "side__link")}>{l.label}</NavLink>
                  </motion.div>
                ))}
              </nav>

              <p className="side__heading">Shop by category</p>
              <ul className="side__cats">
                {CATEGORIES.map((c) => (
                  <li key={c.id}><Link to={`/shop/${c.id}`}>{c.name}</Link></li>
                ))}
              </ul>

              <div className="side__social" aria-label="Social media">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook /></a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><IconTwitter /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram /></a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
