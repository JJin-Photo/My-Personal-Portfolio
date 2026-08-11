# 调色作品 Before / After 素材

此目录预留给“调色作品集”的真实对比图片：

```text
before.jpg
after.jpg
```

两张图片应为同一画面、相同像素尺寸和相同比例。不要使用视频文件，也不要在网页 CSS 中模拟调色结果。

素材准备完成后，在 `works-data.js` 的 `color-grading` 项目中将：

```js
comparison: null
```

替换为：

```js
comparison: {
    before: 'assets/images/color-grading/color-grading/before.jpg',
    after: 'assets/images/color-grading/color-grading/after.jpg'
}
```

页面会自动只在该调色项目中显示可拖动的 Before / After 对比组件。
