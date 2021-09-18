module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended'
    ],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'array-bracket-spacing': 'error',
        'array-callback-return': 'error',
        'arrow-spacing': 'error',
        'brace-style': 'error',
        'comma-dangle': 'error',
        'comma-spacing': [
            'error',
            {
                'after': true
            }
        ],
        'curly': 'error',
        'default-case-last': 'error',
        'default-param-last': 'error',
        'dot-notation': 'error',
        'eol-last': 'error',
        'eqeqeq': 'error',
        'func-style': [
            'error',
            'declaration'
        ],
        'grouped-accessor-pairs': 'error',
        'guard-for-in': 'error',
        'indent': [
            'error',
            4
        ],
        'key-spacing': [
            'error',
            {
                'afterColon': true
            }
        ],
        'keyword-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'max-classes-per-file': [
            'error',
            1
        ],
        'new-cap': [
            'error',
            {
                'capIsNew': false,
                'properties': false
            }
        ],
        'no-alert': 'error',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'error',
        'no-console': 'off',
        'no-constructor-return': 'error',
        'no-duplicate-imports': 'error',
        'no-eq-null': 'error',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-inner-declarations': 'off',
        'no-invalid-this': 'error',
        'no-irregular-whitespace': 'error',
        'no-lone-blocks': 'error',
        'no-loop-func': 'error',
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 1
            }
        ],
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-proto': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-trailing-spaces': 'error',
        'no-undef': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-unused-expressions': 'error',
        'no-unused-vars': [
            'error',
            {
                'args': 'none',
                'vars': 'all'
            }
        ],
        'no-use-before-define': [
            'error',
            'nofunc'
        ],
        'no-useless-call': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-var': 'error',
        'no-whitespace-before-property': 'error',
        'object-curly-newline': [
            'error',
            {
                'consistent': true,
                'multiline': true
            }
        ],
        'object-property-newline': 'error',
        'one-var': [
            'error',
            'never'
        ],
        'operator-linebreak': [
            'error',
            'before',
            {
                'overrides': {
                    '=': 'after'
                }
            }
        ],
        'padding-line-between-statements': [
            'error',
            {
                'blankLine': 'always',
                'next': '*',
                'prev': 'multiline-block-like'
            },
            {
                'blankLine': 'always',
                'next': 'return',
                'prev': '*'
            }
        ],
        'radix': 'error',
        'require-await': 'error',
        'rest-spread-spacing': [
            'error'
        ],
        'semi': [
            'error',
            'always'
        ],
        'semi-spacing': [
            'error',
            {
                'after': true,
                'before': false
            }
        ],
        'space-before-blocks': 'error',
        'space-before-function-paren': [
            'error',
            {
                'anonymous': 'always',
                'asyncArrow': 'always',
                'named': 'never'
            }
        ],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': [
            'error',
            {
                'nonwords': false,
                'words': true
            }
        ],
        'switch-colon-spacing': 'error',
        'wrap-iife': 'error',
        'you-dont-need-lodash-underscore/flatten': 'off',
        'you-dont-need-lodash-underscore/omit': 'off',
        'you-dont-need-lodash-underscore/throttle': 'off'
    }
};
