module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:tailwindcss/recommended',
		'prettier',
		'turbo'
	],
	plugins: [
		{
			"name": "next"
		}
	],
	rules: {
		'react/display-name': 'off',
		'react/prop-types': 'off',
		'react/no-unescaped-entities': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'warn',
		'react-hooks/exhaustive-deps': 'warn',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-empty-interface': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'no-control-regex': 'off',
		'no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
		'tailwindcss/no-custom-classname': 'off',
		'tailwindcss/no-contradicting-classname': 'warn'
	},
	ignorePatterns: ['dist', '**/*.js', '**/*.json', 'node_modules'],
	settings: {
		react: {
			version: 'detect'
		},
		tailwindcss: {
			config: 'packages/ui/style/tailwind.js',
			callees: ['classnames', 'clsx', 'ctl', 'cva', 'tw', `twStyle`],
			tags: ['tw', 'twStyle']
		}
	}
};