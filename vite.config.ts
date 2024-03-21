import path from "path"
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/linalg_react_three_fiber/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

})