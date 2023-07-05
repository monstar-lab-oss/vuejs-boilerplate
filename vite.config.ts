import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src'),
      '@mocks': path.resolve(__dirname, '_mocks'),
    },
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
