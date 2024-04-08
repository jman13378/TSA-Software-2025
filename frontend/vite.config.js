import Vue from 'vue';
import VitePluginVue from '@vitejs/plugin-vue';

export default {
  resolve: {
    alias: {
      fs: '/src/fs.js',
      vue$: 'vue/dist/vue.runtime.esm.js',
    },
    extensions: ['.js', '.vue', '.json'],
  },
  plugins: [
    VitePluginVue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['center'].includes(tag),
        }
      }
    })
  ],
  optimizeDeps: {
    include: ['vue'],
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: '.',
    sourcemap: true,
  },
};