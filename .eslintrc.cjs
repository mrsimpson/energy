/* eslint-disable max-len */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "max-len": ["warn", { code: 100 }],
    "no-undef": ["off"] // TS to ensure that, see https://github.com/antfu/unplugin-auto-import#eslint
  },
  "ignorePatterns": ["components.d.ts"]
}
