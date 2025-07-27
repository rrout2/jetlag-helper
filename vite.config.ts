import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, type VitePWAOptions } from "vite-plugin-pwa";

const pwaManifest: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.svg"],
    manifest: {
        name: "Jetlag Helper",
        short_name: "jetlag-helper",
        description:
            "Tool to help you play hide and seek from Jet Lag the game.",
        icons: [
            {
                src: "/android-chrome-192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "favicon",
            },
            {
                src: "/android-chrome-512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "favicon",
            },
            {
                src: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
                purpose: "apple touch icon",
            },
            {
                purpose: "maskable",
                sizes: "512x512",
                src: "maskable_icon_x512.png",
                type: "image/png",
            },
        ],
        theme_color: "#171717",
        background_color: "#f0e7db",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
    },
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), , VitePWA(pwaManifest)],
    base: "/jetlag-helper/",
});
