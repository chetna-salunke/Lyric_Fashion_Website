import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="page nf">
      <p className="eyebrow">Error 404</p>
      <h1 className="display">This look has left the runway.</h1>
      <p className="lede">The page you were after doesn't exist — but plenty of beautiful things do.</p>
      <Link to="/shop" className="btn">Back to the shop</Link>
    </div>
  );
}
