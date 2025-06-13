# 构建简单的 npm 库

[![version](<https://img.shields.io/npm/v/create-a-npm.svg?logo=npm&logoColor=rgb(0,0,0)&label=版本号&labelColor=rgb(73,73,228)&color=rgb(0,0,0)>)](https://www.npmjs.com/package/create-a-npm) [![issues 提交](<https://img.shields.io/badge/issues-提交-rgb(255,0,63)?logo=github>)](https://github.com/earthnutDev/create-a-npm/issues)

## 安装

该库不安装亦可直接使用 `npm create a-npm` 全局使用，如果你非要安装的话，就：

```sh
npm install  -g create-a-npm
```

## 使用

```sh
# 最简单的使用方式
npm create a-npm
```

在使用中，会在用户的目录下创建 `.earthnut.dev.data/create-a-npm/config` 文件，以储存您的数据在本地（这些数据不会走网络，安全可用）方便下次使用时直接使用。_若觉得无用，可执行删除_，**_若觉得不知而误删除，下次后还需再次输入您的使用数据。_**所以，建议保留数据：

- linux: /home/`username`/earthnut.dev.data/create-a-npm/config
- macOS: /Users/`username`/earthnut.dev.data/create-a-npm/config
- Windows: C:\Users\`username`\earthnut.dev.data\create-a-npm\config

(尚未在 windows 上进行全量测试)

## 📄 文档地址

参看 [https://earthnut.dev/create-a-npm/](https://earthnut.dev/create-a-npm/)
