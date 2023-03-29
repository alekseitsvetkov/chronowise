module.exports = {
	compilerOptions: {
		plugins: [
      {
        "name": "next"
      }
    ]
	},
	include: [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".contentlayer/generated"
  ],
	extends: [require.resolve('./base.js')],
	env: {
		browser: true,
		node: true
	}
};