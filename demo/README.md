---
layout: HomeLayout
title: DUX 主题示例首页
description: 对标 DUX Demo 的首页布局，含轮播、精选卡片、文章列表与侧栏小部件。
---

欢迎来到 VuePress 版 DUX 主题示例。首页会自动收集 `/posts/` 目录下的文章，构建文章列表、最新/热门、分类与标签云等部件。

- 轮播与精选数据可以通过主题配置 `blog.carousel`、`features` 传入，也可在页面 frontmatter 中覆盖。
- 侧栏顺序由 `sidebarWidgets` 控制，支持“关于我”“最新”“热门/随机”“分类”“标签”“广告位”“友链”等类型。
- 文章列表会读取文章 frontmatter 的 `date`、`cover`、`excerpt`、`categories`、`tags` 字段。
