import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { BRANDS, byId, formatPrice, FREE_SHIPPING_ABOVE } from "../data/products.js";
import { useStore } from "../context/Store.jsx";
import { rules, validateAll } from "../utils/validate.js";
import Field from "./Field.jsx";
import SafeImage from "./SafeImage.jsx";
import { IconClose, IconPlus, IconMinus, IconCheck } from "./Icons.jsx";
import "./CartDrawer.css";

const SCHEMA = {
  name: rules.name,
  email: rules.email,
  phone: rules.phone,
  address: rules.required("your delivery address", 8),
  city: rules.required("your city", 2),
  pincode: rules.pincode,
};
const EMPTY = { name: "", email: "", phone: "", address: "", city: "", pincode: "" };

export default function CartDrawer() {
  const { drawer, setDrawer, closeDrawer, lines, count, subtotal, shipping, total, wish, setQty, removeFromCart, clearCart, toggleWish, addToCart } = useStore();
  const [step, setStep] = useState("bag"); // bag | checkout | done
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [pay, setPay] = useState("upi");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!drawer) return undefined;
    const onKey = (e) => e.key === "Escape" && closeDrawer();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawer, closeDrawer]);

  useEffect(() => { if (!drawer && step !== "done") setStep("bag"); }, [drawer, step]);

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
    setOrder({ no: `LY-${Math.floor(10000 + Math.random() * 89999)}`, total, name: values.name.split(" ")[0], email: values.email });
    clearCart();
    setValues(EMPTY);
    setStep("done");
  };

  const wishItems = wish.map(byId).filter(Boolean);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_ABOVE) * 100);
  const tab = drawer === "wish" ? "wish" : "bag";

  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.div className="drawer__scrim" onClick={closeDrawer} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.aside className="drawer" role="dialog" aria-modal="true" aria-label="Bag and wishlist" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <div className="drawer__head">
              <div className="drawer__tabs" role="tablist">
                <button role="tab" aria-selected={tab === "bag"} onClick={() => { setDrawer("bag"); if (step === "done") setStep("bag"); }}>Bag ({count})</button>
                <button role="tab" aria-selected={tab === "wish"} onClick={() => setDrawer("wish")}>Wishlist ({wish.length})</button>
              </div>
              <button className="drawer__close" aria-label="Close" onClick={closeDrawer}><IconClose /></button>
            </div>

            <div className="drawer__body">
              {tab === "wish" ? (
                wishItems.length === 0 ? (
                  <div className="drawer__empty"><p>Your wishlist is empty.</p><span>Tap the heart on any piece to save it for later.</span></div>
                ) : (
                  <ul className="drawer__list">
                    {wishItems.map((p) => (
                      <li key={p.id} className="line">
                        <Link to={`/product/${p.id}`} onClick={closeDrawer} className="line__img"><SafeImage src={p.thumb} alt={p.name} label={p.name} /></Link>
                        <div className="line__info">
                          <p className="line__brand">{BRANDS[p.brand].name}</p>
                          <Link to={`/product/${p.id}`} onClick={closeDrawer} className="line__name">{p.name}</Link>
                          <p className="line__price">{formatPrice(p.price)}</p>
                          <div className="line__row">
                            <button className="btn btn--sm" onClick={() => (p.sizes.length === 1 ? addToCart(p.id, p.sizes[0]) : (closeDrawer(), window.location.hash = `#/product/${p.id}`))}>{p.sizes.length === 1 ? "Add to bag" : "Choose size"}</button>
                            <button className="line__remove" onClick={() => toggleWish(p.id)}>Remove</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )
              ) : step === "done" && order ? (
                <motion.div className="drawer__done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <span className="drawer__tick"><IconCheck /></span>
                  <h3>Thank you, {order.name}!</h3>
                  <p>Your order <strong>{order.no}</strong> for {formatPrice(order.total)} is confirmed. A receipt is on its way to <strong>{order.email}</strong>.</p>
                  <button className="btn" onClick={closeDrawer}>Continue shopping</button>
                </motion.div>
              ) : lines.length === 0 ? (
                <div className="drawer__empty"><p>Your bag is empty.</p><span>Find something you love in the shop.</span><Link to="/shop" onClick={closeDrawer} className="btn btn--sm">Go to shop</Link></div>
              ) : step === "bag" ? (
                <>
                  <div className="ship">
                    <p>{subtotal >= FREE_SHIPPING_ABOVE ? "You've unlocked free shipping 🎉" : `Add ${formatPrice(FREE_SHIPPING_ABOVE - subtotal)} more for free shipping`}</p>
                    <div className="ship__bar" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}><motion.span animate={{ width: `${progress}%` }} /></div>
                  </div>
                  <ul className="drawer__list">
                    {lines.map((l) => (
                      <li key={l.id + l.size} className="line">
                        <Link to={`/product/${l.id}`} onClick={closeDrawer} className="line__img"><SafeImage src={l.product.thumb} alt={l.product.name} label={l.product.name} /></Link>
                        <div className="line__info">
                          <p className="line__brand">{BRANDS[l.product.brand].name}</p>
                          <Link to={`/product/${l.id}`} onClick={closeDrawer} className="line__name">{l.product.name}</Link>
                          <p className="line__meta">Size: {l.size}</p>
                          <p className="line__price">{formatPrice(l.product.price * l.qty)}</p>
                          <div className="line__row">
                            <div className="qty" aria-label="Quantity">
                              <button aria-label="Decrease quantity" onClick={() => setQty(l.id, l.size, l.qty - 1)} disabled={l.qty <= 1}><IconMinus /></button>
                              <span aria-live="polite">{l.qty}</span>
                              <button aria-label="Increase quantity" onClick={() => setQty(l.id, l.size, l.qty + 1)} disabled={l.qty >= 10}><IconPlus /></button>
                            </div>
                            <button className="line__remove" onClick={() => removeFromCart(l.id, l.size)}>Remove</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <form className="checkout" onSubmit={submit} noValidate id="checkout-form">
                  <h3>Delivery details</h3>
                  <Field id="name" label="Full name" value={values.name} onChange={onChange} onBlur={onBlur} error={errors.name} autoComplete="name" placeholder="Your name" />
                  <Field id="email" type="email" label="Email" value={values.email} onChange={onChange} onBlur={onBlur} error={errors.email} autoComplete="email" placeholder="you@example.com" />
                  <Field id="phone" type="tel" inputMode="numeric" label="Mobile number" value={values.phone} onChange={onChange} onBlur={onBlur} error={errors.phone} autoComplete="tel" placeholder="98765 43210" />
                  <Field id="address" label="Address" value={values.address} onChange={onChange} onBlur={onBlur} error={errors.address} autoComplete="street-address" placeholder="House no., street, area" />
                  <div className="checkout__row">
                    <Field id="city" label="City" value={values.city} onChange={onChange} onBlur={onBlur} error={errors.city} autoComplete="address-level2" placeholder="City" />
                    <Field id="pincode" inputMode="numeric" maxLength={6} label="PIN code" value={values.pincode} onChange={onChange} onBlur={onBlur} error={errors.pincode} autoComplete="postal-code" placeholder="411018" />
                  </div>
                  <fieldset className="pay">
                    <legend>Payment</legend>
                    {[["upi", "UPI"], ["card", "Card"], ["cod", "Cash on delivery"]].map(([v, l]) => (
                      <label key={v} className={pay === v ? "pay__opt pay__opt--on" : "pay__opt"}>
                        <input type="radio" name="pay" value={v} checked={pay === v} onChange={() => setPay(v)} /> {l}
                      </label>
                    ))}
                  </fieldset>
                </form>
              )}
            </div>

            {tab === "bag" && lines.length > 0 && step !== "done" && (
              <div className="drawer__foot">
                <dl className="sum">
                  <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                  <div><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
                  <div className="sum__total"><dt>Total</dt><dd>{formatPrice(total)}</dd></div>
                </dl>
                {step === "bag" ? (
                  <button className="btn btn--block" onClick={() => setStep("checkout")}>Checkout</button>
                ) : (
                  <div className="drawer__actions">
                    <button className="btn btn--ghost" onClick={() => setStep("bag")}>Back</button>
                    <button className="btn" type="submit" form="checkout-form">Place order</button>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
