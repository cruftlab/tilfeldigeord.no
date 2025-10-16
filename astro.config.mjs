import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://tilfeldigeord.no',
  output: 'static',
  outDir: './dist',
  publicDir: './src/public',
  srcDir: './src',
  build: {
    assets: 'static'
  }
});