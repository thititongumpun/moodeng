// @ts-check 
import { defineConfig } from "astro/config";

// Integrations
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import vercel from "@astrojs/vercel/serverless";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  // Output hybrid mode for SSR and static generation
  output: "hybrid",

  // Integrations for Tailwind, Preact, Vercel, and PWA
  integrations: [
    tailwind(),
    preact(),
    AstroPWA({
      mode: "production",
      base: "/",
      scope: "/",
      includeAssets: ["favicon.svg"],
      registerType: "autoUpdate",
      manifest: {
        name: "Wcydtt",
        short_name: "Wcydtt PWA",
        theme_color: "#8936FF",
        background_color: "#2EC6FE",
        description: "This is some miscellaneous app.",
        orientation: "any",
        display: "standalone",
        lang: "en-US",
        start_url: "/",
        icons: [
          {
            src: "pwa-512x512_rounded.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt}"],
      },
      devOptions: {
        enabled: false,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],

  // Server configuration
  server: {
    port: 5173, // Local development port
  },

  // Vite Configuration
  vite: {
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },

    build: {
      // Rollup options to manually chunk node_modules
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Only split large node_modules into separate chunks
            if (id.includes("node_modules")) {
              const chunkName = id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
              return chunkName;
            }
          },
        },
      },
      // Set chunk size warning limit to 500kB
      chunkSizeWarningLimit: 500,
    },
  },

  // Vercel Serverless Adapter
  adapter: vercel(),
});
