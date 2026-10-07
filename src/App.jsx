import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import Nav from "./components/Nav.jsx";
import SocialSidebar from "./components/SocialSidebar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import SearchOverlay from "./components/SearchOverlay.jsx";
import Toast from "./components/Toast.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductList from "./pages/ProductList.jsx";
import Product from "./pages/Product.jsx";
import Collection from "./pages/Collection.jsx";
import About from "./pages/About.jsx";
import Support from "./pages/Support.jsx";
import NotFound from "./pages/NotFound.jsx";

const PAGE_ORDER = ["/", "/shop", "/collection", "/about", "/support"];

function themeFor(pathname) {
  if (pathname.startsWith("/shop") || pathname.startsWith("/product")) return "shop";
  if (pathname.startsWith("/collection")) return "collection";
  if (pathname.startsWith("/about")) return "about";
  return "home";
}

export default function App() {
  const location = useLocation();
  const theme = themeFor(location.pathname);

  /* scroll to top on page change, or to an #anchor if the link has one */
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  return (
    <div className="app" data-theme={theme}>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <SocialSidebar order={PAGE_ORDER} />
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<ProductList kind="category" />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/collection/:slug" element={<ProductList kind="collection" />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <Toast />
    </div>
  );
}
