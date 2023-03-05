import {relativeAliasResolver} from './../../packages/config/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { name, version } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 8001
	},
	plugins: [
		tsconfigPaths(),
		react(),
	],
	css: {
		modules: {
			localsConvention: 'camelCaseOnly'
		}
	},
	resolve: {
		alias: [relativeAliasResolver]
	},
	root: 'src',
	define: {
		pkgJson: { name, version }
	},
	build: {
		outDir: '../dist',
		assetsDir: '.'
	}
});