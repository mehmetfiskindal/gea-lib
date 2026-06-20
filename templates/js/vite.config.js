import { defineConfig } from 'vite';
import { geaPlugin } from '@geajs/vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [geaPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: '<% libraryName %>',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: ['@geajs/core'],
      output: {
        globals: {
          '@geajs/core': 'Gea'
        }
      }
    }
  }
});
