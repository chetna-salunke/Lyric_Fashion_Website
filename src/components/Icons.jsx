const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconMenu = () => (<svg width="22" height="16" viewBox="0 0 22 16" {...base}><path d="M1 2H21M1 8H21M1 14H21" /></svg>);
export const IconClose = ({ size = 18 }) => (<svg width={size} height={size} viewBox="0 0 18 18" {...base}><path d="M2 2L16 16M16 2L2 16" /></svg>);
export const IconSearch = () => (<svg width="19" height="19" viewBox="0 0 18 18" {...base}><circle cx="8" cy="8" r="6.25" /><path d="M12.6 12.6L16.5 16.5" /></svg>);
export const IconBag = () => (<svg width="19" height="20" viewBox="0 0 17 18" {...base}><path d="M2.5 6H14.5L13.7 16.2C13.65 16.9 13.05 17.5 12.3 17.5H4.7C3.95 17.5 3.35 16.9 3.3 16.2L2.5 6Z" /><path d="M5.5 6V4.5C5.5 2.85 6.85 1.5 8.5 1.5C10.15 1.5 11.5 2.85 11.5 4.5V6" /></svg>);
export const IconHeart = ({ filled = false, size = 19 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} fill={filled ? "currentColor" : "none"}>
    <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.7 4.8 6.2 4.5c2-.2 3.7.8 4.8 2.4h2c1.1-1.6 2.8-2.6 4.8-2.4 3.5.3 5.3 3.9 3.8 7.3C19.5 16.4 12 21 12 21Z" />
  </svg>
);
export const IconArrow = ({ dir = "right" }) => (
  <svg width="18" height="12" viewBox="0 0 18 12" {...base} style={{ transform: dir === "left" ? "scaleX(-1)" : "none" }}><path d="M1 6H17M12 1L17 6L12 11" /></svg>
);
export const IconPlus = () => (<svg width="14" height="14" viewBox="0 0 14 14" {...base}><path d="M7 1V13M1 7H13" /></svg>);
export const IconMinus = () => (<svg width="14" height="14" viewBox="0 0 14 14" {...base}><path d="M1 7H13" /></svg>);
export const IconCheck = () => (<svg width="18" height="18" viewBox="0 0 18 18" {...base}><path d="M3 9.5L7 13.5L15 4.5" /></svg>);

export const IconFacebook = () => (<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M15 8.5H17V5.2C16.4 5.13 15.34 5 14.1 5C11.5 5 9.75 6.66 9.75 9.6V12H7V15.6H9.75V24H13.3V15.6H15.98L16.4 12H13.3V9.94C13.3 9 13.55 8.5 15 8.5Z" /></svg>);
export const IconTwitter = () => (<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M22 5.9c-.7.32-1.46.53-2.25.63a3.93 3.93 0 0 0 1.72-2.17c-.76.46-1.6.79-2.5.97A3.9 3.9 0 0 0 12.15 9c0 .31.04.6.1.89A11.07 11.07 0 0 1 4.1 5.6a3.9 3.9 0 0 0 1.2 5.2 3.85 3.85 0 0 1-1.76-.49v.05a3.9 3.9 0 0 0 3.12 3.83c-.42.11-.87.17-1.33.17-.32 0-.64-.03-.95-.09a3.9 3.9 0 0 0 3.64 2.71A7.84 7.84 0 0 1 2 18.4a11.05 11.05 0 0 0 5.98 1.75c7.18 0 11.1-5.95 11.1-11.1l-.01-.5c.76-.55 1.42-1.24 1.93-2.03Z" /></svg>);
export const IconLinkedIn = () => (<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9.5h4V21H3V9.5ZM9.5 9.5H13v1.57h.05c.5-.9 1.7-1.85 3.5-1.85 3.75 0 4.45 2.34 4.45 5.4V21h-4v-5.7c0-1.36-.03-3.1-1.9-3.1-1.9 0-2.2 1.48-2.2 3v5.8h-4V9.5Z" /></svg>);
export const IconInstagram = () => (<svg width="16" height="16" viewBox="0 0 24 24" {...base}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" /></svg>);
