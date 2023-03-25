import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin'
import svg from 'vite-plugin-svgr';
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
	plugins: [
		react(),
		ssr({ prerender: true }),
		svg(),
		visualizer()
	],
	css: {
		modules: {
			localsConvention: 'camelCaseOnly'
		}
	},
	resolve: {
		alias: [
			{
				find: '@chronowise/',
				replacement: path.join(__dirname, '../../packages/')
			}
		]
	},
	server: {
		port: 8003
	},
	publicDir: 'public'
});