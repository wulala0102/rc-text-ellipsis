import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

const rootPath = path.resolve(__dirname, 'demo');
const outDirPath = path.resolve(__dirname, 'dist');

console.log('__dirname:', __dirname);
console.log('root path:', rootPath);
console.log('outDir path:', outDirPath);

export default defineConfig({
  plugins: [react()],
  root: rootPath,
  build: {
    outDir: outDirPath,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
