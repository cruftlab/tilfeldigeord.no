// @ts-check
import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        lang: "no",
        dir: "ltr",
        name: "Tilfeldige ord",
        short_name: "Tilfeldige ord",
        description: "Denne lager tilfeldige ord. Intet mer.",
        icons: [
          {
            src: "/static/images/favicon/favicon.svg",
            sizes: "192x192 512x512",
            type: "image/svg+xml"
          },
          {
            src: "/static/images/favicon/splash-icon.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/static/images/favicon/maskable-icon.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        start_url: "/index.html",
        scope: "/",
        display: "standalone",
        orientation: "natural"
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,jpg,jpeg,webp}'],
        navigateFallback: null,
        navigateFallbackAllowlist: [/^\/$/],
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    }),
  ],
});
