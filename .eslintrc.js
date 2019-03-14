// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    'generator-star-spacing': 0,
    'no-debugger': 0,
    "semi": [2, "always"],//语句强制分号结尾
    "space-before-function-paren": [0, "always"],
    "no-return-assign": 0,//return 语句中不能有赋值表达式
    "one-var": 0,
    "no-cond-assign": 0
  }
}
