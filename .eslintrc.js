module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        // 'plugin:vue/vue3-recommended',
        'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 2],
        'comma-style': ['error', 'last'],
        'comma-dangle': ['error', 'never'],
        quotes: ['error', 'single'],
        'arrow-parens': ['error', 'as-needed'],
        semi: ['error', 'never'],
        'space-before-function-paren': ['error', 'always'],
        'vue/no-v-html': ['off'],
    }
}