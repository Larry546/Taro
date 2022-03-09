# Taro

Final Design of Taro+ React frontend

### taro-ui AtSwipeAction 解决方法

`taro-ui 3.0.0-alpha.3`

在 `node_modules` 文件下找到 `taro-ui` 的 `package.json`，在里面增加一个入口

```
"main:h5": "dist/index.esm.js"
```

此问题在`taro-ui 3.0.0-alpha.4`已修复，但该版本 AtSwipeAction 组件在 h5 中不兼容
