import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:8000",
    //     secure: false,
    //   },
    proxy: {
      "/api": {
        target: "https://mern-blog-main-ds4m.onrender.com", // Replace this with your hosted domain
        changeOrigin: true, // This ensures that the host header is modified to match the target URL
        secure: true, // Change this to true if your hosted domain is served over HTTPS and has a valid certificate
      },
    },
  },

  plugins: [react()],
});
