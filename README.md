<div align="center">
  <a href="https://github.com/Anchoror/Anchor-Admin">
    <img alt="Anchor Admin Logo" width="200"  src="./public/logo2.svg">
  </a>
</div>
<h3 align="center">Anchor Admin</h3>
<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/kylelobo/The-Documentation-Compendium.svg)](https://github.com/Anchoror/Anchor-Admin/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/Anchoror/Anchor-Admin/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

### 简介

[Anchor Admin](https://github.com/Anchoror/Anchor-Admin) 是一个 **开源免费** 的后台管理模板，基于 `Vue3、Vite4、Pinia、TypeScript 和 Ant Design Vue UI` 等前端最新技术栈。相较于其他比较流行的后台管理模板，此项目更加简洁、轻量，风格清新，上手成本非常低，非常适合中小型项目或者个人项目。

`目前这个项目还没有彻底完成，如果不偷懒的话，应该还要一段时间。。。`

> 在做了很多后台系统项目后，我希望可以开发出一份属于自己的开源框架，具备一定的个人风格的中后台系统模板，也是方便自己日后的前端开发。这个项目应该会有Vue和React两个版本（但我开发不是很快，慢慢来了😜），也算是自己开发经验的总结与沉淀。

### 功能

- 🍒 集成 [Ant Design Vue UI](https://www.antdv.com)
- 🌽 集成 Typescript，强化变量类型，规范开发要求
- 🍑 集成登陆、注销及权限验证
- 🍐 集成多环境配置，dev、测试、生产环境
- 🍎 集成 `eslint + prettier`，代码约束和格式化统一
- 🍉 集成 `mock` 接口服务，dev 环境和发布环境都支持，可动态配置是否启用 mock 服务，不启用时不会加载 mock 包，减少打包体积
- 🍍 集成 `pinia`，vuex 的替代方案，轻量、简单、易用
- 📦 集成 `unplugin` 插件，自动导入，解放双手，开发效率直接起飞
- 🤹 集成 `ant-design-icons` 图标，支持自定义 svg 图标, 优雅使用icon
<!-- - 🍇 集成 `unocss`，antfu 开源的原子 css 解决方案，非常轻量 -->

<!-- ### 预览 -->

<!-- [https://template.isme.top](https://template.isme.top)

[https://base.isme.top](https://base.isme.top) -->

### 快速开始

```shell
# 推荐配置git autocrlf 为 false（本项目规范使用lf换行符，此配置是为防止git自动将源文件转换为crlf）
# 不清楚为什么要这样做的请参考这篇文章：https://www.freesion.com/article/4532642129
git config --global core.autocrlf false

# 克隆项目
git clone https://github.com/Anchoror/Anchor-Admin.git

# 进入项目目录
cd Anchor-Admin

# 安装依赖(建议使用pnpm: https://pnpm.io/zh/installation)
npm i -g pnpm # 装了可忽略
pnpm i # 或者 npm i

# 启动
pnpm dev
```

### 构建发布

```shell
# 构建生产环境
pnpm build
```

### 其他指令

```shell
# eslint代码格式检查
pnpm eslint

# 代码检查并修复
pnpm eslint:fix

# stylelint样式代码格式检查
pnpm stylelint

# stylelint样式代码检查并修复
pnpm stylelint:fix

# pnpm eslint & pnpm stylelint
pnpm lint

# pnpm eslint:fix & pnpm stylelint:fix
pnpm lint:fix

# 预览发布包效果（需先执行构建指令）
pnpm preview

```

<!--
### 目录说明

```
Vue Naive Admin
|-- .github                             // github相关，如推送github仓库后自动部署gh pages
|-- .husky                              // git commit钩子
|-- .vscode                             // vscode编辑器相关
|   |-- extensions.json                 // 插件推荐
|   |-- settings.json                   // 项目级别的vscode配置，优先级大于全局vscode配置
|-- build                               // 构建相关配置
|   |-- constant.js                     // 构建相关的常量
|   |-- utils.js                        // 构建相关的工具方法
|   |-- config
|   |   |-- define.js                   // 注入全局常量，启动或打包后将添加到window中
|   |   |-- proxy.js                    // 代理配置
|   |-- plugin
|   |   |-- html.js                     // vite-plugin-html插件，用于注入变量或者html标签
|   |   |-- mock.js                     // vite-plugin-mock插件，处理mock
|   |   |-- unplugin.js                 // unplugin相关插件，包含DefineOptions和自动导入
|   |-- script                          // 打包完成后执行的一些node脚本（不重要）
|       |-- build-cname.js              // 自动生成cname
|-- mock                                // mock
|   |-- utils.js                        // mock请求需要用到的工具方法
|   |-- api                             // mock接口
|-- public                              // 公共资源，文件夹下的文件会在打包后会直接加到dist根目录下
|-- settings                            // 项目配置
|   |-- proxy-config.js                 // 代理配置文件
|   |-- theme.json                      // 主题配置项，主题色等
|-- src
|   |-- api                             // 公共api
|   |-- assets                          // 静态资源
|   |   |-- images                      // 图片
|   |   |-- svg                         // svg图标
|   |-- components                      // 全局组件
|   |   |-- common                      // 公共组件
|   |   |-- icon                        // icon相关组件
|   |   |-- page                        // 页面组件
|   |   |-- query-bar                   // 查询选项
|   |   |-- table                       // 封装的表格组件
|   |-- composables                     // 封装的组合式函数
|   |-- layout                          // 布局相关组件
|   |   |-- components
|   |       |-- AppMain.vue             // 主体内容
|   |       |-- header                  // 头部
|   |       |-- sidebar                 // 侧边菜单栏
|   |       |-- tags                    // 多页签栏
|   |-- router                          // 路由
|   |   |-- guard                       // 路由守卫
|   |   |-- routes                      // 路由列表
|   |-- store                           // 状态管理（pinia）
|   |   |-- modules                     // 模块
|   |       |-- app                     // 管理页面重新加载、折叠菜单栏和keepAlive等
|   |       |-- permission              // 权限相关，管理权限菜单
|   |       |-- tags                    // 管理多页签
|   |       |-- user                    // 用户模块，管理用户信息、登录登出
|   |-- styles                          // 样式
|   |-- utils                           // 封装的工具方法
|   |   |-- auth                        // 权限相关，如token、跳转登录页等
|   |   |-- common                      // 通用
|   |   |-- http                        // 封装axios
|   |   |-- storage                     // 封装localStorage和sessionStorage
|   |-- views                           // 页面
|   |   |-- demo                        // 示例
|   |   |-- error-page                  // 错误页
|   |   |-- login                       // 登录页
|   |   |-- workbench                   // 首页
|   |-- App.vue
|   |-- main.js
|-- .cz-config.js                       // git提交配置
|-- .editorconfig                       // 编辑器配置
|-- .env                                // 环境文件，所有环境都会载入
|-- .env.development                    // 开发环境文件
|-- .env.production                     // 生产环境文件
|-- .env.test                           // 测试环境文件
|-- .eslintignore                       // eslint忽略
|-- .eslintrc.js                        // eslint配置
|-- .gitignore                          // git忽略
|-- .prettierignore                     // prettier格式化忽略
|-- commitlint.config.js                // commitlint规范配置
|-- index.html
|-- jsconfig.json                       // js配置
|-- LICENSE                             // 协议
|-- package.json                        // 依赖描述文件
|-- pnpm-lock.yaml                      // 依赖锁定文件
|-- prettier.config.js                  // prettier格式化配置
|-- README.md                           // 项目描述文档（英文）
|-- README.zh-CN.md                     // 项目描述文档（中文）
|-- unocss.config.js                    // unocss配置
|-- vite.config.js                      // vite配置
``` -->
