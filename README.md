# front-end

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# 开发规范
1.文件全使用小写，并使用dash-case（单词之间使用'-'链接）命名方式
2.components下每个组件应该有一个main.vue文件
3.js代码使用camelCase（驼峰命名法）
4.组件声明使用dash-case如：<app-nav></app-nav>
5.css类使用dash-case
6.html元素的属性使用dash-case
7.模块文件组织：模块名称/页面配置 如：系统配置/数据字典：(store、components、routes)的文件组织应该是 src/components/xtpz/sjzd/
8.路由的命：模块名称-页面名称：系统配置/数据字典：xtpz-sjzd 不能写成 xtpz/sjzd。如果是嵌套路由就写成 xtpz/sjzd


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

