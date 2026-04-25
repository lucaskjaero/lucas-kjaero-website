export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'import-notation': 'string',
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'layer', 'reference', 'theme', 'utility'],
      },
    ],
  },
}
