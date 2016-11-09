module.exports = {
    extends: 'airbnb',
    globals: {
        beforeEach: true,
        describe: true, // Mocha - test suite declaration
        document: true,
        it: true, // Mocha - test declaration
        window: true, // from browser
        xdescribe: true, // Mocha - disabled test suite
        xif: true, // Mocha - disabled test
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: [
        'react',
        'sorting',
    ],
    rules: {
        'arrow-body-style': ['off'],
        'arrow-parens': ['error', 'always'],
        'import/extensions': ['off'],
        'import/no-unresolved': ['off'],
        'indent': ['error', 4, { SwitchCase: 1 }],
        'react/jsx-boolean-value': ['error', 'always'],
        'react/jsx-closing-bracket-location': ['off'],
        'react/jsx-curly-spacing': [
            'error',
            'always',
            {
                allowMultiline: true,
                spacing: {
                    objectLiterals: 'never',
                },
            },
        ],
        'react/jsx-filename-extension': ['off'],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-no-bind': ['off'],
        'react/jsx-sort-props': ['error'],
        'react/sort-comp': ['error', {
            groups: {
                rendering: [
                    '/^render.+$/',
                    'render',
                ],
            },
            order: [
                'static-methods',
                'lifecycle',
                'everything-else',
                'rendering',
            ],
        }],
        'sorting/sort-object-props': [
            'error',
            {
                ignoreCase: true,
                ignoreMethods: false,
            },
        ],
    },
};
