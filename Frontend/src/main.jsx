import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const saved = localStorage.getItem("themeColor");
if (saved) {
  // applique le preset directement (copie l'objet PRESETS ici ou importe)
}

const resolved =
  saved === 'system'
    ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : saved;
document.documentElement.classList.add(resolved);

