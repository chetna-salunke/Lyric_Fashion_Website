import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { MotionConfig } from "motion/react";
import App from "./App.jsx";
import { StoreProvider } from "./context/Store.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <MotionConfig reducedMotion="user">
        <StoreProvider>
          <App />
        </StoreProvider>
      </MotionConfig>
    </HashRouter>
  </React.StrictMode>
);
