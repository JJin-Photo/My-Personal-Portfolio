# 作品封面

这里的文件只用于首页和作品列表卡片，作品详情图集继续使用 `assets/images/thumbnail`、`medium` 和 `large` 中的图片。

目录按作品分类划分：

- `photography/`：摄影
- `stills/`：剧照
- `polaroid/`：宝丽来
- `film/`：胶片
- `color-grading/`：调色作品集

每个封面文件使用作品 `id` 作为固定文件名。更换封面时直接覆盖同名文件并保留原扩展名，无需修改 HTML 或 JavaScript。例如，“仙女棒”的封面固定为 `photography/sparkler.jpg`。

新增作品时，在 `works-data.js` 中填写唯一的 `id`、`category`、`cover` 和 `images`。只有调色作品可额外设置 `type: 'video'` 与有效的 `video` 链接。
