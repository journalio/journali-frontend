module.exports = {
    root: true,
    parser: 'vue-eslint-parser',
    env: {
        browser: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        'prettier/vue',
        'plugin:prettier/recommended',
    ],
    rules: {},
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
    },
}
