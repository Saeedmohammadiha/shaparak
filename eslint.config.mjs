import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	pluginJs.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat['jsx-runtime'],
	eslintPluginPrettierRecommended,
	{
		plugins: {
			'react-hooks': reactHooks
		},

		rules: {
			...reactHooks.configs.recommended.rules
		}
	},
	{
		// in main config for TSX/JSX source files
		plugins: {
			'react-refresh': reactRefresh
		},
		rules: {
			'react-refresh/only-export-components': 'warn'
		}
	},

	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		rules: {
			'react-refresh/only-export-components': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksVoidReturn: {
						attributes: false
					}
				}
			],
			'@typescript-eslint/only-throw-error': 'off',
			'@typescript-eslint/prefer-promise-reject-errors': 'off',
			'react/prop-types': [
				'error',
				{
					ignore: ['children', 'className', 'theme', 'variant'],
					skipUndeclared: true
				}
			],
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'warn'
		}
	},
	{
		ignores: ['test/mediatr', 'test/fluentvalidation']
	}
);
