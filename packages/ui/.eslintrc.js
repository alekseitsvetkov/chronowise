module.exports = {
	extends: [require.resolve('@chronosphere/config/eslint/web.js')],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json'
	}
};