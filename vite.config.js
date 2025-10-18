import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    flowbiteReact(),
    VitePWA({
      registerType: 'autoUpdate', // automatically updates the service worker
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'LinkLooop',
        short_name: 'LinkLooop',
        description: 'Indian Web Store for all your needs',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'link-looop-connectDiscoverFlow.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'link-looop-connectDiscoverFlow.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'link-looop-connectDiscoverFlow.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable', // allows adaptive icons
          },
        ],
      },
    }),
  ],
});
