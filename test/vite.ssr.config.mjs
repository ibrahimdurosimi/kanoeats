/**
 * Builds the render harness for the smoke test.
 *
 * The app has no browser-based test runner, so the smoke test renders every
 * page through react-dom/server and asserts on the markup. That catches the
 * failure that matters most here: a component that throws on render and shows
 * the user a blank screen, which `tsc` and `vite build` both pass happily.
 */
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  logLevel: 'warn',
  build: {
    ssr: 'test/render.harness.tsx',
    outDir: 'test/.build',
    emptyOutDir: true,
    rollupOptions: { output: { format: 'es' } },
  },
  ssr: { noExternal: true },
});
