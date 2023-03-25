module.exports = {
	extends: [require.resolve('@chronowise/config/eslint/web.js')],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json'
	}
};