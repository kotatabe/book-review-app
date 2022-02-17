module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'airbnb/hooks',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
	plugins: [
		'@typescript-eslint',
		'import',
		'jsx-a11y',
		'react',
		'react-hooks',
	],
	root: true,
	rules: {
		// occur error in `import React from 'react'` with react-scripts 4.0.1
		'no-use-before-define': 'off',
		'lines-between-class-members': [
			'error',
			'always',
			{
				exceptAfterSingleLine: true,
			},
		],
		'no-void': [
			'error',
			{
				allowAsStatement: true,
			},
		],
		'padding-line-between-statements': [
			'error',
			{
				blankLine: 'always',
				prev: '*',
				next: 'return',
			},
		],
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				js: 'never',
				jsx: 'never',
				ts: 'never',
				tsx: 'never',
			},
		],
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.jsx', '.tsx', '.js'],
			},
		],
		'react/jsx-props-no-spreading': [
			'error',
			{
				html: 'enforce',
				custom: 'enforce',
				explicitSpread: 'ignore',
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': ['off'],
		'react/jsx-no-constructed-context-values': 'off',
		'@typescript-eslint/restrict-template-expressions': ['off'],
		'react/jsx-no-bind': 'off',
		'react/jsx-props-no-spreading': 'off',
	},
	overrides: [
		{
			'files': ['*.tsx'],
			'rules': {
				'react/prop-types': 'off',
			},
		},
	],
	settings: {
		'import/resolver': {
			node: {
				paths: ['src'],
			},
		},
	},
};