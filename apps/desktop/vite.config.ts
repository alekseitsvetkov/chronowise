import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  css: {
		modules: {
			localsConvention: 'camelCaseOnly'
		}
	},
  root: 'src',
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  server: {
    port: 8001,
  },
  build: {
		outDir: '../dist',
		assetsDir: '.'
	}
});
