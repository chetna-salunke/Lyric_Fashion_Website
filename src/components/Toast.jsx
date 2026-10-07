import { AnimatePresence, motion } from "motion/react";
import { useStore } from "../context/Store.jsx";
import { IconCheck } from "./Icons.jsx";
import "./Toast.css";

export default function Toast() {
  const { toast, dismissToast } = useStore();
  return (
    <div className="toast-region" aria-live="polite" role="status">
      <AnimatePresence>
        {toast && (
          <motion.div key={toast.key} className="toast" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.3 }}>
            <span className="toast__icon"><IconCheck /></span>
            <span className="toast__msg">{toast.message}</span>
            {toast.action && (
              <button className="toast__action" onClick={() => { toast.action.run(); dismissToast(); }}>{toast.action.label}</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
