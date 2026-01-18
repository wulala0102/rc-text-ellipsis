import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

const rootPath = path.resolve(__dirname, 'demo');
const outDirPath = path.resolve(__dirname, 'dist');

console.log('__dirname:', __dirname);
console.log('root path:', rootPath);
console.log('outDir path:', outDirPath);


export default defineConfig({
  plugins: [
    react(),
    {
      name: 'debug-resolver',
      resolveId(source, importer) {
        if (importer && source.startsWith('../')) {
          console.log('Resolving:', source);
          console.log('From:', importer);
          const resolved = path.resolve(path.dirname(importer), source);
          const content = fs.readFileSync(resolved, 'utf-8');
          console.log('Resolved to:', resolved);
        }
      },
    },
  ],
  root: rootPath,
  build: {
    outDir: outDirPath,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
