module.exports = {
    root: true,

    env: {
        node: true,
    },

    parserOptions: {
        ecmaVersion: 2020,
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'prettier/prettier': 'error',
        '@typescript-eslint/camelcase': 'off',
    },

    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)',
            ],
            env: {
                jest: true,
            },
        },
    ],

    extends: [
        'plugin:vue/recommended',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/prettier/@typescript-eslint',
    ],
}
