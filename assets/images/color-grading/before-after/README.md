# 调色 Before / After 素材

每个调色项目使用一个独立的英文目录。当前“调色作品集”可使用：

```text
before-after/
└── color-grading/
    ├── before.jpg
    └── after.jpg
```

要求：

- 两张图片必须来自同一个画面，并保持相同构图。
- 建议使用相同宽度、高度和宽高比例。
- `before.jpg` 为调色前，`after.jpg` 为调色后。
- 不要随意修改文件名。
- 两张图片都准备完成后，再在 `works-data.js` 的对应作品中配置路径。

配置示例：

```js
beforeAfter: {
    before: 'assets/images/color-grading/before-after/color-grading/before.jpg',
    after: 'assets/images/color-grading/before-after/color-grading/after.jpg'
}
```

网站不会自动扫描目录。只有作品数据中同时配置了 `before` 和 `after`，并且两张图片都能够成功加载时，才会显示调色前后对比组件。

未来需要多组对比时，可以继续使用：

```text
project-name/
├── pair-01/
│   ├── before.jpg
│   └── after.jpg
└── pair-02/
    ├── before.jpg
    └── after.jpg
```

当前版本每个项目只显示一组对比图。
