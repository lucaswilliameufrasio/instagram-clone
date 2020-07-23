module.exports = {
    env: {
        commonjs: true,
        es6: false,
        node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'prettier/prettier': 'error',
    },
};
