import path from 'path'

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
  server: {
    port: 8080,
    hot: true,
  },
}
