// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  adapter: netlify({
    // Deno 2.9+ rejects the --allow-scripts flag used by the local edge functions emulator.
    // This project has no edge functions, so the emulator is disabled in dev.
    devFeatures: { edgeFunctions: false },
  }),
  integrations: [react()],
})