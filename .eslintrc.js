module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always'
    }],
    'arrow-parens': ['error', 'as-needed'],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/order-in-components': ['error',
      {
        order: [
          'layout',
          'components',
          'mixins',
          'middleware',
          'asyncData',
          'fetch',
          'serverPrefetch',
          'data',
          'computed',
          'watch',
          'created',
          'mounted',
          'updated',
          'destroyed',
          'methods'
        ]
      }
    ]
  },
  globals: {
    _: true
  }
}
