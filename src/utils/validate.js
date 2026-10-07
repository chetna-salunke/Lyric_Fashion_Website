/* Small validation helpers shared by every form. Each returns "" when valid, or an error message. */
export const rules = {
  name: (v) => {
    const s = v.trim();
    if (!s) return "Please enter your name.";
    if (s.length < 2) return "Name must be at least 2 characters.";
    if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(s)) return "Name can only contain letters and spaces.";
    return "";
  },
  email: (v) => {
    const s = v.trim();
    if (!s) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return "Enter a valid email, e.g. you@example.com.";
    return "";
  },
  phone: (v) => {
    const s = v.replace(/[\s-]/g, "");
    if (!s) return "Please enter your mobile number.";
    if (!/^(\+91)?[6-9]\d{9}$/.test(s)) return "Enter a valid 10-digit Indian mobile number.";
    return "";
  },
  pincode: (v) => {
    if (!v.trim()) return "Please enter your PIN code.";
    if (!/^[1-9]\d{5}$/.test(v.trim())) return "PIN code must be 6 digits.";
    return "";
  },
  required: (label, min = 1) => (v) => {
    const s = v.trim();
    if (!s) return `Please enter ${label}.`;
    if (s.length < min) return `${label[0].toUpperCase() + label.slice(1)} must be at least ${min} characters.`;
    return "";
  },
  orderNo: (v) => {
    const s = v.trim();
    if (!s) return "";
    return /^LY-\d{4,6}$/i.test(s) ? "" : "Order numbers look like LY-10492.";
  },
  message: (v) => {
    const s = v.trim();
    if (!s) return "Please tell us how we can help.";
    if (s.length < 10) return "Please write at least 10 characters.";
    if (s.length > 600) return "Please keep your message under 600 characters.";
    return "";
  },
};

/* run a schema {field: rule} against values {field: string} -> errors object */
export function validateAll(schema, values) {
  const errors = {};
  Object.keys(schema).forEach((k) => {
    const msg = schema[k](values[k] ?? "");
    if (msg) errors[k] = msg;
  });
  return errors;
}
