import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Static, installable, offline-capable PWA so the menu still loads on weak café Wi-Fi.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon.svg', 'logo.svg', 'placeholder.svg', 'photos/chimney-cake.svg'],
      manifest: {
        name: 'Clara de Lluna — Menu',
        short_name: 'Clara de Lluna',
        description: 'Clara de Lluna, Boumhal — digital menu.',
        theme_color: '#1F2A44',
        background_color: '#F7F3EC',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        // SVG icons keep the repo binary-free and scale crisply. Want raster
        // PNGs (e.g. nicer iOS home-screen icon)? Run `npm run icons`.
        icons: [
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
          { src: 'icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Cache the app shell + Unsplash images for offline/weak-connection use.
        globPatterns: ['**/*.{js,css,html,svg,png,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'menu-images',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: { target: 'es2020' },
});
