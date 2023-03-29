module.exports = {
	extends: [require.resolve('@chronowise/config/eslint/web.js'), 'next/core-web-vitals'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json', './server/tsconfig.json']
	}
};