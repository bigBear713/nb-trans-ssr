<div align="center">

# nb-trans-ssr

测试`@bigbear713/nb-trans`在ssr中的使用

</div>

## Readme
- [中文](https://github.com/bigBear713/nb-trans-ssr/blob/main/README.CN.md "文档 - 中文")
- [English](https://github.com/bigBear713/nb-trans-ssr/blob/main/README.md "Document - English")

---

## 启动demo项目
- 安装依赖：
```bash
npm i
```

- 启动demo项目
```bash
npm start
```

- 编译demo
```bash
npm run build
```

- 以prod模式运行
```bash
npm run serve:ssr
```

## 注意事项
- 在编译demo的时候，如果你是动态加载 translate lang json 文件，文件的路径应该是绝对路径，而不是相对路径，比如 `http://localhost:4200/assets/localization/en/translations.json` 。这时候，在编译之前，这个url就是可以访问的