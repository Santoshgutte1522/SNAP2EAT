import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // Import Tailwind v4 plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // Add Tailwind plugin here
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
});
