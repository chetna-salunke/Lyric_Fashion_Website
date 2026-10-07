import { motion } from "motion/react";

/* Fades + slides children in when they scroll into view */
export default function Reveal({ children, delay = 0, y = 28, x = 0, as = "div", className = "", ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
