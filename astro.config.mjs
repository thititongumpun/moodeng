// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import preact from "@astrojs/preact";

import vercel from "@astrojs/vercel/serverless";

import AstroPWA from "@vite-pwa/astro";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  site: "https://www.wcydtt.co",
  integrations: [
    sitemap(),
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
        globPatterns: ["**/*.{css,js,html,svg,png,ico,txt,xml}"],
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
  server: { port: 5173 },

  vite: {
    resolve: {
      alias: {
        react: "preact/compat",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime",
      },
    },
  },

  adapter: vercel({
    webAnalytics: { enabled: true },
    isr: true,
  }),
});
