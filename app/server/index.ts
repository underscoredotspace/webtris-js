import ViteExpress from "vite-express";
import { app, server } from "./server";

ViteExpress.config({
    inlineViteConfig: {
        root: "app/web",
        build: { outDir: "../../dist" },
    },
});

ViteExpress.bind(app, server);
