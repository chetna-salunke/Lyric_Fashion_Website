import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { BRANDS, formatPrice, discount } from "../data/products.js";
import { useStore } from "../context/Store.jsx";
import SafeImage from "./SafeImage.jsx";
import { IconHeart, IconPlus } from "./Icons.jsx";
import "./ProductCard.css";

export default function ProductCard({ product, index = 0 }) {
  const { wish, toggleWish, addToCart } = useStore();
  const navigate = useNavigate();
  const liked = wish.includes(product.id);
  const single = product.sizes.length === 1;

  const quickAdd = () => (single ? addToCart(product.id, product.sizes[0]) : navigate(`/product/${product.id}`));

  return (
    <motion.article
      className="pcard"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pcard__media">
        <Link to={`/product/${product.id}`} className="pcard__link" aria-label={`View ${product.name}`}>
          <SafeImage src={product.thumb} alt={product.name} label={product.name} />
        </Link>
        {product.tag && <span className="pcard__tag">{product.tag}</span>}
        <button className={liked ? "pcard__heart pcard__heart--on" : "pcard__heart"} aria-pressed={liked} aria-label={liked ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`} onClick={() => toggleWish(product.id)}>
          <IconHeart filled={liked} size={17} />
        </button>
        <button className="pcard__add" aria-label={single ? `Add ${product.name} to bag` : `Choose size for ${product.name}`} onClick={quickAdd}>
          <IconPlus />
        </button>
      </div>
      <div className="pcard__body">
        <p className="pcard__brand">{BRANDS[product.brand].name}</p>
        <h3 className="pcard__name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <p className="pcard__desc">{product.desc}</p>
        <p className="pcard__price">
          <strong>{formatPrice(product.price)}</strong>
          <s>{formatPrice(product.mrp)}</s>
          <span>{discount(product)}% off</span>
        </p>
      </div>
    </motion.article>
  );
}
