/* ------------------------------------------------------------------
   Lyric — catalogue data.
   Photos: your own images in public/images/ where available (see local()), otherwise free Unsplash images (Unsplash License).
   Brands are fictional house labels invented for this project (no trademarks).
   Change prices / names / photos here and every page updates.
------------------------------------------------------------------- */

export const CURRENCY = "₹";
export const FREE_SHIPPING_ABOVE = 4999;
export const SHIPPING_FEE = 249;

export const formatPrice = (n) => `${CURRENCY}${Number(n).toLocaleString("en-IN")}`;

export const img = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* your own photos live in public/images/ — reference them with local("name.jpg") */
export const local = (file) => `${import.meta.env.BASE_URL}images/${file}`;

export const BRANDS = {
  orsa: { name: "Maison Orsa", story: "Paris-inspired tailoring, finished by hand in Jaipur." },
  aarya: { name: "Aarya Atelier", story: "Heritage block-prints and handloom cottons from small weaver clusters." },
  noor: { name: "Noor & Co.", story: "Fine jewellery in recycled gold vermeil and freshwater pearl." },
  veda: { name: "Veda Studio", story: "Slow, made-to-last womenswear in natural fibres." },
  saffron: { name: "Saffron Lane", story: "Festive silhouettes with a modern, easy fit." },
  linea: { name: "Linea Verde", story: "Vegetable-tanned leather accessories, plastic-free packaging." },
  kiran: { name: "Kiran Couture", story: "Evening dressing — draped, embroidered, unforgettable." },
  strut: { name: "Strut Foundry", story: "Comfort-first footwear made on ergonomic lasts." },
};

export const CATEGORIES = [
  { id: "blazers", name: "Blazers & Jackets", blurb: "Sharp tailoring for work, weekends and everything between.", cover: local("cat-blazers.jpg") , lookbook: [local("lb-blazers-1.jpg"), local("lb-blazers-2.jpg"), local("lb-blazers-3.jpg"), local("lb-blazers-4.jpg"), local("lb-blazers-5.jpg"), local("lb-blazers-6.jpg")] },
  { id: "dresses", name: "Dresses", blurb: "Gowns and day dresses cut to move with you.", cover: local("cat-dresses.jpg") , lookbook: [] },
  { id: "kurtis", name: "Kurtis", blurb: "Everyday and festive kurtis in breathable handloom fabrics.", cover: local("cat-kurtis.jpg") , lookbook: [local("lb-kurtis-1.jpg"), local("lb-kurtis-2.jpg")] },
  { id: "footwear", name: "Footwear", blurb: "Heels, sandals and sneakers you can actually walk in.", cover: local("cat-footwear.jpg") , lookbook: [local("lb-footwear-1.jpg"), local("lb-footwear-2.jpg"), local("lb-footwear-3.jpg")] },
  { id: "coats", name: "Coats", blurb: "Trenches and winter coats that last more than a season.", cover: local("cat-coats.jpg") , lookbook: [local("lb-coats-1.jpg"), local("lb-coats-2.jpg")] },
  { id: "bags", name: "Bags", blurb: "Totes, shoulder bags and clutches in vegetable-tanned leather.", cover: local("cat-bags.jpg") , lookbook: [local("lb-bags-1.jpg")] },
  { id: "jewellery", name: "Jewellery", blurb: "Gold-tone statement pieces and everyday studs.", cover: local("cat-jewellery.jpg") , lookbook: [local("lb-jewellery-1.jpg"), local("lb-jewellery-2.jpg")] },
];

export const COLLECTIONS = [
  { id: "festive-edit", name: "The Festive Edit", tag: "Diwali · Weddings", blurb: "Rich colour, fine embroidery and jewellery that catches the light.", cover: local("col-festive.jpg") },
  { id: "office-edit", name: "The Office Edit", tag: "Work week", blurb: "Structured blazers, polished bags and shoes that go the distance.", cover: local("col-office.jpg") },
  { id: "winter-layers", name: "Winter Layers", tag: "Cold season", blurb: "Trenches, long coats and statement outerwear.", cover: local("col-winter.jpg") },
  { id: "evening-gala", name: "Evening Gala", tag: "After dark", blurb: "Gowns, heels and gold for the longest nights.", cover: local("col-evening.jpg") },
  { id: "everyday-carry", name: "Everyday Carry", tag: "Daily essentials", blurb: "Bags and small pieces you'll reach for every morning.", cover: local("col-everyday.jpg") },
  { id: "heritage-weave", name: "Heritage Weave", tag: "Handloom", blurb: "Hand-block prints and handloom textiles, made by artisan clusters.", cover: local("col-heritage.jpg") },
];

const SIZES_CLOTH = ["XS", "S", "M", "L", "XL"];
const SIZES_SHOE = ["36", "37", "38", "39", "40", "41"];
const ONE = ["One size"];

/* p(id, category, brand, name, price, mrp, photoId, desc, details[], sizes, collections[], tag) */
const p = (id, category, brand, name, price, mrp, photo, desc, details, sizes, collections, tag = "") => ({
  id, category, brand, name, price, mrp, tag, desc, details, sizes, collections,
  image: photo.startsWith("@") ? local(photo.slice(1)) : img(photo, 900),
  thumb: photo.startsWith("@") ? local(photo.slice(1)) : img(photo, 560),
});

export const PRODUCTS = [
  /* ---------- BAGS ---------- */
  p("bag-azure-tote", "bags", "linea", "Azure Leather Handbag", 12900, 15900, "@bag-azure-tote.jpg",
    "A structured blue handbag in smooth vegetable-tanned leather.", ["Full-grain leather", "Magnetic closure", "Fits a 13-inch tablet", "Cotton-lined interior"], ONE, ["everyday-carry", "office-edit"], "Bestseller"),
  p("bag-denim-tote", "bags", "linea", "Grand Everyday Tote", 14500, 17900, "@bag-denim-tote.jpg",
    "An oversized leather tote that carries a whole day — laptop included.", ["Soft pebbled leather", "Zip-top pocket", "Reinforced handles", "Detachable pouch"], ONE, ["everyday-carry"], "New"),
  p("bag-cognac-shoulder", "bags", "orsa", "Cognac Shoulder Bag", 18900, 22900, "@bag-cognac-shoulder.jpg",
    "A slouchy shoulder bag in warm cognac leather that softens with age.", ["Italian-style leather", "Adjustable strap", "Suede lining", "Brass hardware"], ONE, ["everyday-carry", "office-edit"]),
  p("bag-noir-handbag", "bags", "orsa", "Noir Top-Handle Bag", 21500, 25900, "@bag-noir-handbag.jpg",
    "A black top-handle bag with clean lines for desk-to-dinner days.", ["Smooth calf leather", "Two interior pockets", "Dust bag included", "Handmade in Jaipur"], ONE, ["office-edit", "evening-gala"], "Bestseller"),
  p("bag-mini-purse", "bags", "kiran", "Petit Evening Purse", 8900, 10900, "1647412983527-5aa4b12febe8",
    "A pocket-sized purse for phone, cards and lipstick — nothing more.", ["Satin-finish leather", "Chain strap", "Snap closure", "Gold-tone hardware"], ONE, ["evening-gala"]),
  p("bag-camel-crossbody", "bags", "linea", "Camel Crossbody", 9800, 11900, "@bag-camel-crossbody.jpg",
    "A compact crossbody in camel leather, light enough for travel days.", ["Vegetable-tanned leather", "Adjustable strap", "Zip main pocket", "Plastic-free packaging"], ONE, ["everyday-carry"], "New"),

  /* ---------- DRESSES ---------- */
  p("dress-garden-print", "dresses", "veda", "Garden Print Midi Dress", 7900, 9900, "@dress-garden-print.jpg",
    "A flowing printed midi in breathable viscose with a flattering wrap waist.", ["Viscose crepe", "Wrap waist", "Side pockets", "Machine wash cold"], SIZES_CLOTH, ["everyday-carry"], "New"),
  p("dress-crimson-gown", "dresses", "kiran", "Crimson Evening Gown", 24900, 29900, "@dress-crimson-gown.jpg",
    "A floor-length red gown with a sculpted bodice and fluid skirt.", ["Satin-back crepe", "Concealed zip", "Boned bodice", "Dry clean only"], SIZES_CLOTH, ["evening-gala"], "Bestseller"),
  p("dress-noir-gown", "dresses", "kiran", "Noir Draped Gown", 22900, 27900, "@dress-noir-gown.jpg",
    "A black draped gown that does all the talking at an evening event.", ["Matte jersey", "Gathered side seam", "Full lining", "Dry clean only"], SIZES_CLOTH, ["evening-gala"]),
  p("dress-emerald-maxi", "dresses", "veda", "Emerald Silk-Blend Maxi", 11900, 14500, "1765229292033-ea9f376cc164",
    "A long green dress in a soft silk blend with a figure-skimming drape.", ["Silk-viscose blend", "Adjustable straps", "Slip lining", "Hand wash"], SIZES_CLOTH, ["evening-gala", "festive-edit"]),
  p("dress-bar-cocktail", "dresses", "saffron", "Soirée Cocktail Dress", 9500, 11900, "1765229278564-6775d6aec567",
    "A tailored cocktail dress for dinners, dates and wedding receptions.", ["Stretch crepe", "Back zip", "Knee length", "Machine wash gentle"], SIZES_CLOTH, ["evening-gala", "festive-edit"]),
  p("dress-sparkle-sheer", "dresses", "kiran", "Starlight Sheer Dress", 18500, 21900, "1772615071603-ad5de36e425d",
    "A sparkling sheer dress with sequin detail, made for a party entrance.", ["Sequin-embellished mesh", "Built-in slip", "Hidden zip", "Dry clean only"], SIZES_CLOTH, ["evening-gala"], "New"),

  /* ---------- KURTIS ---------- */
  p("kurti-block-print", "kurtis", "aarya", "Hand Block-Print Kurti", 3290, 3990, "1708534419572-6e6614a53ca1",
    "A breathable cotton kurti with hand block-printed motifs.", ["Handloom cotton", "Straight fit", "Side slits", "Natural dyes"], SIZES_CLOTH, ["heritage-weave", "festive-edit"], "Bestseller"),
  p("kurti-chikankari", "kurtis", "aarya", "Chikankari Anarkali Kurti", 5490, 6990, "1745313452052-0e4e341f326c",
    "An Anarkali kurti with fine hand chikankari embroidery at the yoke.", ["Cotton mulmul", "Hand embroidery", "Flared hem", "Dry clean recommended"], SIZES_CLOTH, ["festive-edit", "heritage-weave"], "New"),
  p("kurti-festive-set", "kurtis", "saffron", "Festive Kurti Set", 6990, 8490, "1759840278862-ef629e9b0f64",
    "A kurti set for pujas and family functions, with a dupatta to match.", ["Chanderi blend", "Kurti + pants + dupatta", "Gota trim", "Dry clean only"], SIZES_CLOTH, ["festive-edit"]),
  p("kurti-everyday-straight", "kurtis", "aarya", "Everyday Straight Kurti", 2490, 2990, "1742800788220-1e42256d6022",
    "A soft everyday kurti you can wear to work, brunch or the market.", ["Pure cotton", "Mandarin collar", "Three-quarter sleeves", "Machine wash"], SIZES_CLOTH, ["heritage-weave"]),
  p("kurti-printed-fusion", "kurtis", "veda", "Printed Fusion Tunic", 3890, 4690, "1740992556328-7ea6b8f046d7",
    "A printed ethnic tunic that pairs well with jeans or palazzos.", ["Cotton-linen blend", "Relaxed fit", "Button placket", "Machine wash cold"], SIZES_CLOTH, ["heritage-weave", "everyday-carry"]),
  p("kurti-heritage-suit", "kurtis", "saffron", "Heritage Suit Set", 8490, 10490, "1743229995505-d6374996df1c",
    "A traditional suit set with rich detailing, ready for wedding season.", ["Silk-cotton blend", "Embroidered neckline", "Includes dupatta", "Dry clean only"], SIZES_CLOTH, ["festive-edit", "heritage-weave"], "Bestseller"),

  /* ---------- COATS ---------- */
  p("coat-russet-trench", "coats", "orsa", "Russet Trench Coat", 16900, 19900, "1716004359806-0ab3cd9d9639",
    "A classic belted trench in brown cotton gabardine with a storm flap.", ["Water-resistant gabardine", "Double-breasted", "Belted waist", "Fully lined"], SIZES_CLOTH, ["winter-layers"], "Bestseller"),
  p("coat-sand-trench", "coats", "orsa", "Sand Beige Trench", 15900, 18900, "1782565196771-0cb993248c1f",
    "A lightweight beige trench that layers over everything.", ["Cotton twill", "Detachable belt", "Hidden pockets", "Dry clean only"], SIZES_CLOTH, ["winter-layers", "office-edit"], "New"),
  p("coat-walker-trench", "coats", "veda", "City Walker Trench", 13900, 16500, "@coat-walker-trench.jpg",
    "A relaxed trench with a longer line, made for walking to work.", ["Recycled polyester shell", "Storm flap", "Two-way zip", "Machine wash gentle"], SIZES_CLOTH, ["winter-layers"]),
  p("coat-black-wool", "coats", "orsa", "Midnight Wool Coat", 22900, 27500, "1776442240018-6a364d727694",
    "A warm black wool coat with a clean, minimal line for cold-season days.", ["Wool-blend", "Single breasted", "Interior pocket", "Dry clean only"], SIZES_CLOTH, ["winter-layers"]),
  p("coat-scarlet-coat", "coats", "kiran", "Scarlet Statement Coat", 19900, 23900, "1610379178881-03e317649ccc",
    "A bold red coat in soft wool that turns a grey day around.", ["Wool-blend", "Oversized collar", "Deep pockets", "Dry clean only"], SIZES_CLOTH, ["winter-layers", "evening-gala"]),
  p("coat-faux-fur", "coats", "kiran", "Faux-Fur Winter Coat", 17500, 20900, "@coat-faux-fur.jpg",
    "A plush cruelty-free faux-fur coat with a warm, enveloping fit.", ["Recycled faux-fur", "Hook-and-eye closure", "Satin lining", "Spot clean"], SIZES_CLOTH, ["winter-layers"], "New"),

  /* ---------- BLAZERS & JACKETS ---------- */
  p("blazer-teal-suit", "blazers", "orsa", "Teal Pinstripe Suit", 17900, 21500, "1771072426488-87e6bbcc0cf7",
    "A pinstripe blazer and trouser set in teal — a power suit with personality.", ["Wool-blend suiting", "Blazer + trousers", "Half-canvassed", "Dry clean only"], SIZES_CLOTH, ["office-edit"], "Bestseller"),
  p("blazer-teal-blazer", "blazers", "orsa", "Teal Pinstripe Blazer", 10900, 13500, "1771072426109-9a77160bc670",
    "The pinstripe blazer on its own — wear it with denim or tailoring.", ["Wool-blend suiting", "Single breasted", "Notch lapel", "Dry clean only"], SIZES_CLOTH, ["office-edit"]),
  p("blazer-classic-black", "blazers", "veda", "Classic Tailored Blazer", 8900, 10900, "@blazer-classic-black.jpg",
    "A sharp blazer with structured shoulders that works with anything.", ["Stretch suiting", "Two button", "Fully lined", "Machine wash gentle"], SIZES_CLOTH, ["office-edit"]),
  p("blazer-red-statement", "blazers", "kiran", "Rouge Statement Blazer", 11500, 13900, "1580478491436-fd6a937acc9e",
    "A bright red blazer that makes any outfit look finished.", ["Crepe suiting", "Padded shoulder", "Single button", "Dry clean only"], SIZES_CLOTH, ["office-edit", "evening-gala"], "New"),
  p("blazer-sand-set", "blazers", "veda", "Sand Linen-Blend Set", 9900, 11900, "@blazer-sand-set.jpg",
    "A relaxed blazer-and-trouser set in a breathable linen blend.", ["Linen-viscose blend", "Blazer + trousers", "Unlined", "Machine wash cold"], SIZES_CLOTH, ["office-edit", "everyday-carry"]),
  p("jacket-contrast", "blazers", "strut", "Contrast Utility Jacket", 7490, 8990, "@jacket-contrast.jpg",
    "A black-and-yellow utility jacket with a cropped, easy fit.", ["Cotton canvas", "Four pockets", "Snap closure", "Machine wash"], SIZES_CLOTH, ["everyday-carry"]),

  /* ---------- FOOTWEAR ---------- */
  p("shoe-cognac-sandal", "footwear", "strut", "Cognac Block-Heel Sandal", 6900, 8490, "1553545985-1e0d8781d5db",
    "A leather block-heel sandal with a cushioned insole and ankle strap.", ["Leather upper", "6 cm block heel", "Memory-foam insole", "Anti-slip sole"], SIZES_SHOE, ["office-edit", "everyday-carry"], "Bestseller"),
  p("shoe-city-sneaker", "footwear", "strut", "Red-Line City Sneaker", 5990, 7490, "1654130491481-dc83a0a05e4e",
    "A white sneaker with red accents — the one that goes with everything.", ["Leather and mesh", "Cushioned midsole", "Rubber outsole", "Lace-up"], SIZES_SHOE, ["everyday-carry"], "New"),
  p("shoe-rose-pump", "footwear", "kiran", "Rose Satin Pump", 8490, 9990, "1692266023541-c86976a81e91",
    "A pink satin pump with a low, comfortable heel for long evenings.", ["Satin upper", "5 cm heel", "Padded footbed", "Dust bag included"], SIZES_SHOE, ["evening-gala", "festive-edit"]),
  p("shoe-leather-flat", "footwear", "linea", "Leather Everyday Flat", 4990, 5990, "1744812441866-80ff6acfebdf",
    "A slip-on leather flat that stays comfortable from morning to night.", ["Vegetable-tanned leather", "Flexible sole", "Cushioned insole", "Handcrafted"], SIZES_SHOE, ["everyday-carry", "office-edit"]),

  /* ---------- JEWELLERY ---------- */
  p("jewel-layered-necklace", "jewellery", "noor", "Layered Gold Necklace", 4290, 5290, "1694062045776-f48d9b6de57e",
    "A layered gold-vermeil necklace with matching drop earrings.", ["Recycled gold vermeil", "Nickel-free", "Adjustable chain", "Gift box included"], ONE, ["festive-edit", "evening-gala"], "Bestseller"),
  p("jewel-everyday-chain", "jewellery", "noor", "Everyday Gold Chain Set", 2890, 3490, "1785273924999-6c6f08442d1f",
    "Dainty chains to stack or wear alone — made for daily wear.", ["Gold-plated brass", "Hypoallergenic", "Water-resistant finish", "Set of three"], ONE, ["everyday-carry"], "New"),
  p("jewel-pendant", "jewellery", "noor", "Bloom Pendant Necklace", 3490, 4290, "1690167471265-c0b7a0d5cca6",
    "A delicate pendant necklace that sits right at the collarbone.", ["Recycled gold vermeil", "Hand-polished", "Lobster clasp", "Gift box included"], ONE, ["everyday-carry", "evening-gala"]),
  p("jewel-temple-set", "jewellery", "noor", "Temple Gold Statement Set", 9490, 11500, "1787831397676-442447671555",
    "An ornate gold-tone statement necklace set for weddings and festivals.", ["Gold-plated alloy", "Necklace + earrings", "Hook closure", "Gift box included"], ONE, ["festive-edit", "heritage-weave"]),
  p("jewel-short-hair-studs", "jewellery", "noor", "Sculpted Gold Drops", 2290, 2790, "1785088602176-468cf253fa5b",
    "Lightweight gold drop earrings with a sculptural curve.", ["Gold-plated brass", "Hypoallergenic posts", "Lightweight", "Gift box included"], ONE, ["evening-gala", "everyday-carry"]),
  p("jewel-hoops", "jewellery", "noor", "Statement Dangle Earrings", 2690, 3290, "1772228615155-3c34ffb2e26c",
    "Dangle earrings that frame the face — a little bold, a lot elegant.", ["Gold-plated brass", "Hypoallergenic posts", "Lightweight", "Gift box included"], ONE, ["festive-edit", "evening-gala"], "New"),
];

/* ----- helpers ----- */
export const byId = (id) => PRODUCTS.find((x) => x.id === id);
export const byCategory = (cat) => PRODUCTS.filter((x) => x.category === cat);
export const byCollection = (col) => PRODUCTS.filter((x) => x.collections.includes(col));
export const categoryOf = (id) => CATEGORIES.find((c) => c.id === id);
export const collectionOf = (id) => COLLECTIONS.find((c) => c.id === id);
export const discount = (x) => Math.round(((x.mrp - x.price) / x.mrp) * 100);
export const related = (x, n = 4) => {
  const same = PRODUCTS.filter((y) => y.id !== x.id && y.category === x.category);
  const sharedCol = PRODUCTS.filter((y) => y.id !== x.id && y.category !== x.category && y.collections.some((c) => x.collections.includes(c)));
  return [...same, ...sharedCol].slice(0, n);
};
export const searchProducts = (q) => {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return PRODUCTS.filter((x) =>
    [x.name, BRANDS[x.brand].name, categoryOf(x.category).name, x.desc].join(" ").toLowerCase().includes(t)
  );
};

export const HERO_LOOKS = [
  { id: "rose", name: "Dusty Rose", look: "The Suit", accent: "#c48e95", image: local("hero-suit.jpg"), alt: "Model in a wide-leg taupe suit carrying a navy bag, mid-stride", to: "/shop/blazers" },
  { id: "ivory", name: "Ivory", look: "The Coat", accent: "#e9e1cf", image: local("hero-coat.jpg"), alt: "Model in a long textured brown coat with a black tie", to: "/shop/coats" },
  { id: "blush", name: "Blush", look: "The Gown", accent: "#dcbcb8", image: local("hero-gown.jpg"), alt: "Model in a painted full-skirt gown beside a white piano", to: "/shop/dresses" },
];

export const ABOUT_IMAGES = {
  portrait: img("1765490106170-4322b6cc96fe", 900),
  studio: img("1753164597442-ae97e3cb3dca", 1200),
};
