import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { byId, FREE_SHIPPING_ABOVE, SHIPPING_FEE } from "../data/products.js";

const StoreCtx = createContext(null);
export const useStore = () => useContext(StoreCtx);

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load("lyric_cart", [])); // [{id,size,qty}]
  const [wish, setWish] = useState(() => load("lyric_wish", [])); // [id]
  const [drawer, setDrawer] = useState(null); // null | "bag" | "wish"
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try { localStorage.setItem("lyric_cart", JSON.stringify(cart)); } catch { /* storage blocked */ }
  }, [cart]);
  useEffect(() => {
    try { localStorage.setItem("lyric_wish", JSON.stringify(wish)); } catch { /* storage blocked */ }
  }, [wish]);

  useEffect(() => {
    if (!toast) return undefined;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  const notify = useCallback((message, action) => setToast({ message, action, key: Date.now() }), []);

  const addToCart = useCallback((id, size = "One size", qty = 1) => {
    setCart((c) => {
      const i = c.findIndex((x) => x.id === id && x.size === size);
      if (i >= 0) return c.map((x, k) => (k === i ? { ...x, qty: Math.min(x.qty + qty, 10) } : x));
      return [...c, { id, size, qty }];
    });
    const p = byId(id);
    notify(`${p.name} added to your bag`, { label: "View bag", run: () => setDrawer("bag") });
  }, [notify]);

  const setQty = useCallback((id, size, qty) => {
    setCart((c) => c.map((x) => (x.id === id && x.size === size ? { ...x, qty: Math.max(1, Math.min(qty, 10)) } : x)));
  }, []);
  const removeFromCart = useCallback((id, size) => setCart((c) => c.filter((x) => !(x.id === id && x.size === size))), []);
  const clearCart = useCallback(() => setCart([]), []);

  const toggleWish = useCallback((id) => {
    setWish((w) => {
      const has = w.includes(id);
      notify(has ? "Removed from wishlist" : "Saved to your wishlist");
      return has ? w.filter((x) => x !== id) : [...w, id];
    });
  }, [notify]);

  const totals = useMemo(() => {
    const lines = cart.map((x) => ({ ...x, product: byId(x.id) })).filter((x) => x.product);
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * l.product.price, 0);
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
    return { lines, count, subtotal, shipping, total: subtotal + shipping };
  }, [cart]);

  const value = {
    ...totals, wish, toast, drawer, searchOpen,
    addToCart, setQty, removeFromCart, clearCart, toggleWish,
    openBag: () => setDrawer("bag"),
    openWish: () => setDrawer("wish"),
    closeDrawer: () => setDrawer(null),
    setDrawer, setSearchOpen, notify, dismissToast: () => setToast(null),
  };

  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}
