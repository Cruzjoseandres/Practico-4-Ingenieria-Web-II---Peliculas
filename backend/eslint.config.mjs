import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['eslint.config.mjs'],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
            sourceType: 'module',
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        rules: {
            // Desactivar reglas de estilo (Prettier las controla)
            'indent': 'off',
            'quotes': 'off',
            'semi': 'off',
            'comma-dangle': 'off',
            'object-curly-spacing': 'off',
            'no-trailing-spaces': 'off',
            'eol-last': 'off',
            'linebreak-style': 'off',
            '@typescript-eslint/indent': 'off',

            // Reglas de tipo / lógica (mantener como errores/avisos)
            '@typescript-eslint/no-explicit-any': 'off', // opcional según tu códigobase
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'error',
            '@typescript-eslint/no-unsafe-member-access': 'error',
            '@typescript-eslint/no-unsafe-return': 'error',
            '@typescript-eslint/restrict-plus-operands': 'error',
            '@typescript-eslint/explicit-module-boundary-types': 'warn',

            // Prettier como regla (fallará si no cumple)
            "prettier/prettier": ["error", { endOfLine: "auto" }],
        },
    },
);
