<div align="center">

# nb-trans-ssr

Try to use `@bigbear713/nb-trans` in ssr project.

</div>

## Readme
- [中文](https://github.com/bigBear713/nb-trans-ssr/blob/main/README.CN.md "文档 - 中文")
- [English](https://github.com/bigBear713/nb-trans-ssr/blob/main/README.md "Document - English")

---

## Start demo project  
- Install dependencies
```bash
npm i
```

- Start demo project
```bash
npm start
```

- Build demo  
```bash
npm run build
```

- Run in prod mode
```bash
npm run serve:ssr
```

## Attention
- When building the demo, if you're dynamically loading json files, the file's url should be absoulted, not relatived, like `http://localhost:4200/assets/localization/en/translations.json` . At that time, the url is can be accessed before building.