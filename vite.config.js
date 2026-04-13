import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Tomato SuperApp',
        short_name: 'Tomato',
        description: 'Premium Food Delivery App',
        theme_color: '#EF4444',
        background_color: '#ffffff',
        display: "standalone",
        icons: [
          {
            src: 'https://cdn-icons-png.flaticon.com/512/3768/3768224.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'https://cdn-icons-png.flaticon.com/512/3768/3768224.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
