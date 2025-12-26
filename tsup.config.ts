import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src/SweetError.ts'],
  dts: {
    only: true,
  },
  format: ["iife"],
  outDir: 'dist',
  clean: true,
});
