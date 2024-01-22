import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const cssFileName: string = 'index.min.css'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],

  publicDir: './public',
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (file) => {
          return `assets/css/${cssFileName}`
        },
        entryFileNames: (file) => {
          return `assets/js/[name].min.js`
        }
      }
    }
  }

})
