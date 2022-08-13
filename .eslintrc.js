module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    semi: 0,
    'no-console': 0,
    'func-names': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-duplicates': 0,
    'import/order': 0,
    'import/no-self-import': 0,
    'import/no-cycle': 0,
    'import/no-relative-packages': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/extensions': 0,
    'import/no-useless-path-segments': 0,
    'import/no-unresolved': 0,
    'import/named': 0,
    'arrow-body-style': 0,
    'linebreak-style': ['off', 'windows'],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'react/function-component-definition': 0,
  },
};
