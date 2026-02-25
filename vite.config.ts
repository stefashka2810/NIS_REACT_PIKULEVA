import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://dummyjson.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        // Важно! Пробрасываем cookies через прокси
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // Пробрасываем cookies из браузера на сервер
            if (req.headers.cookie) {
              proxyReq.setHeader("cookie", req.headers.cookie);
            }
          });
        },
      },
    },
  },
});
