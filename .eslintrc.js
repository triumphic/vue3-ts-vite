module.exports = {
  extends: [
    'stylelint-config-standard',
    // 如果是vue项目，需要添加
    'stylelint-config-recommended-vue'
  ],
  // plugins: ['stylelint-scss', 'stylelint-order'],
  // rule覆盖（根据自己喜好来配置）
  rules: {
    'string-quotes': 'single',
    'function-no-unknown': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'selector-class-pattern': null
  },
  overrides: [
    // 若项目中存在scss文件，添加以下配置
    {
      files: '**/*.scss',
      customSyntax: 'postcss-scss'
    }
  ]
}
