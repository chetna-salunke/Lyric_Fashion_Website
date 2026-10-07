import { useState } from "react";

/* <img> that shows a soft placeholder instead of a broken-image icon if a photo can't load.
   Your own photos in public/images/ are already cut to 3:4 (the shape of every frame on the site),
   so the whole person fits. Remote photos keep the head in view by favouring the top of the picture. */
export default function SafeImage({ src, alt, label, className = "", ...rest }) {
  const [state, setState] = useState("loading");
  if (state === "failed") {
    return (
      <div className="img-fallback" role="img" aria-label={alt}>
        {label || alt}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} safe-img safe-img--${state}`}
      onLoad={() => setState("loaded")}
      onError={() => setState("failed")}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
}
