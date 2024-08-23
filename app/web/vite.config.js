import { defineConfig } from "vite";

export default defineConfig({
    build: { outDir: "../../dist", emptyOutDir: true },
    server: { port: 1234, host: "0.0.0.0" },
});
