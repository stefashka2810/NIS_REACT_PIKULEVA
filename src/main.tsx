import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./shared/i18n/config"; // Инициализация i18n
import App from "./App.tsx";
import AppProvider from "./app/provider/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
);
