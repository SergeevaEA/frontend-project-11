import path, { resolve } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  root: '.',
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // отключает Deprecation Warning из node_modules
      },
    },
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
  server: {
    port: 8080,
    hot: true,
    hmr: {
      overlay: false, // отключает всплывающее окно с ошибками
    },
  },
}
