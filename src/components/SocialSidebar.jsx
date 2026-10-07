import { useLocation, useNavigate } from "react-router-dom";
import { IconFacebook, IconTwitter, IconLinkedIn, IconInstagram, IconArrow } from "./Icons.jsx";
import "./SocialSidebar.css";

const SOCIALS = [
  { href: "https://facebook.com", label: "Facebook", Icon: IconFacebook },
  { href: "https://twitter.com", label: "Twitter", Icon: IconTwitter },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: IconLinkedIn },
  { href: "https://instagram.com", label: "Instagram", Icon: IconInstagram },
];

export default function SocialSidebar({ order }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const section = "/" + (pathname.split("/")[1] || "");
  const found = order.indexOf(section === "/product" ? "/shop" : section);
  const index = Math.max(found, 0);
  const go = (d) => navigate(order[(index + d + order.length) % order.length]);

  return (
    <aside className="rail" aria-label="Social links and page navigation">
      <ul className="rail__list">
        {SOCIALS.map(({ href, label, Icon }) => (
          <li key={label}>
            <a href={href} target="_blank" rel="noreferrer" aria-label={label} className="rail__link"><Icon /></a>
          </li>
        ))}
      </ul>
      <div className="rail__pager">
        <button onClick={() => go(-1)} aria-label="Previous page" className="rail__arrow"><IconArrow /></button>
        <span className="rail__count">{String(index + 1).padStart(2, "0")}<i>/</i>{String(order.length).padStart(2, "0")}</span>
        <button onClick={() => go(1)} aria-label="Next page" className="rail__arrow rail__arrow--next"><IconArrow /></button>
      </div>
    </aside>
  );
}
