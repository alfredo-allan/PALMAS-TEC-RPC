import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    plugins: [react()],
    // obrigatório para servir corretamente na Vercel
    base: "/",
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
    build: {
        outDir: "dist", // combina com seu vercel.json
        sourcemap: false,
    },
});
