# VuePress DUX 主题开发设计草案（对标 demo.themebetter.com/dux）

本草案在原有 DUX 主题理念的基础上，结合 demo 站点的页面结构、组件形态与交互细节，规划 VuePress 主题的实现路径，便于快速复刻视觉体验并保留高定制能力。

## 目标
- **外观对齐**：参考 demo 站点的布局与模块顺序，复刻首页“轮播/置顶”、多行文章列表、侧栏小部件、全局搜索/菜单交互等。
- **高可定制性**：通过主题配置与插槽，让用户按需启用 Banner、焦点推荐、广告位、友链、标签云等模块。
- **性能与可访问性**：保持轻量加载，首屏首要内容（如轮播与列表）优先渲染；暗色模式与键盘可达性。
- **文档与可测试性**：提供示例站点、组件 API 文档，并对关键交互（轮播、导航、搜索）做基础测试。

## 目录结构
```
theme/
  ├─ package.json            # 主题包定义
  ├─ index.ts                # 主题入口，导出 extends 与 layouts
  ├─ node/                   # Node 端增强：主题配置、插件注册、数据准备
  │   ├─ config.ts           # 默认配置与校验
  │   ├─ enhanceApp.ts       # 客户端增强入口导出
  │   ├─ palettes.ts         # 默认色板与变量
  │   └─ plugins.ts          # 内置/可选插件装配
  ├─ client/                 # 客户端代码
  │   ├─ layouts/            # Layout 组件（HomeLayout、PageLayout、PostsLayout 等）
  │   ├─ components/         # 导航栏、侧边栏、评论、面包屑、分享、返回顶部等
  │   ├─ composables/        # 主题态、暗色模式、阅读进度、页面元数据
  │   ├─ styles/             # 样式入口、变量、重置、utility classes
  │   └─ locales/            # 多语言文案
  └─ demo/.vuepress/         # 示例站点，验证主题效果
```

## 技术选型
- **VuePress 2.x** 与 **Vite** 默认构建。
- **TypeScript** 强化类型，组件使用 `<script setup lang="ts">`。
- **UnoCSS / Windi** 或 CSS 变量结合 SCSS，为主题提供可定制的原子/预处理方案。
- **Markdown 插件**：支持代码块高亮（Shiki）、图片懒加载、Mermaid/PlantUML 可选。

## 页面与核心模块（对标 Demo）
1. **顶栏与全局交互**：
   - 顶部粘性导航，含 Logo、一级/二级菜单、搜索按钮、暗色切换、移动端抽屉菜单。
   - 支持公告条/站点统计入口（可配置）。
2. **首页布局**：
   - **焦点区 Banner/轮播**：可配置轮播图片、标题、跳转链接（可用 Swiper/Embla）。
   - **置顶/精选卡片**：轮播下方呈现 1~3 条精选文章，支持自定义背景图与标签。
   - **文章列表**：左侧多行卡片（缩略图、标题、摘要、分类/标签、发布日期、阅读时长、阅读量/评论数）；支持分页或“加载更多”。
   - **侧栏小部件**（可配置顺序/开关）：站点信息卡（头像、站点名、签名按钮）、最新文章、热门/随机 Tab、分类列表、标签云、归档时间轴、广告位、二维码/公众号、友链卡片。
   - **页脚**：版权信息、备案、社交链接、友情链接区域。
3. **文章详情页**：
   - 顶部元信息（作者、发布日期、阅读时长、分类/标签、阅读量/评论数、分享按钮）。
   - 文章头图、正文排版、代码块高亮；支持短代码（提示块、折叠、图库）。
   - 浮动/侧边 TOC，标题高亮；底部上一页/下一页。
   - 相关文章列表、作者信息卡、评论区（Waline/Giscus）、打赏/点赞（可选）。
4. **分类/标签/归档页**：网格或列表呈现，支持计数徽章与 SEO 元数据；标签云与时间轴样式对齐 Demo。
5. **搜索体验**：内置本地索引或 Algolia，桌面端弹层，移动端嵌入抽屉。
6. **互动与细节**：滚动阅读进度条、返回顶部按钮、图片懒加载、缩略图占位、轻量过渡效果。

## 主题配置（示例）
```ts
export interface DuxThemeConfig {
  logo?: string;
  repo?: string;
  nav?: NavItem[];
  sidebar?: SidebarConfig | 'auto'; // 文档模式
  blog?: {
    base: string;
    perPage?: number;
    feed?: boolean;
    highlight?: string[];        // 首页置顶/精选文章 slug
    carousel?: BannerItem[];     // 轮播位配置
    ads?: AdSlotConfig[];        // 广告位配置（首页侧栏/列表内嵌）
  };
  comment?: { provider: 'waline' | 'giscus' | 'none'; options?: Record<string, any> };
  hero?: { title: string; description?: string; actions?: HeroAction[] }; // 可用于 Banner 覆盖文本
  features?: FeatureCard[]; // 可用于首页精选卡片
  sidebarWidgets?: SidebarWidgetConfig[]; // 侧栏小部件顺序/开关
  footer?: { message?: string; copyright?: string; links?: LinkItem[] };
  toc?: { enable: boolean; float?: boolean };
  analytics?: { provider: 'ga' | 'plausible' | 'umami'; options?: Record<string, any> };
}
```

## 样式体系
- **色板与暗色**：CSS 变量 + SCSS，定义主色/辅色/中性色，暗色模式调整背景与阴影强度。
- **排版优化**：正文宽度、行高、标题间距、代码块高亮皮肤（参考 DUX 深色边框与圆角）。
- **布局与卡片**：卡片阴影、圆角、悬浮缩放；列表缩略图比例固定（如 16:9），保持网格整齐。
- **响应式**：
  - 桌面端：双列布局（主内容 + 侧栏），顶部导航固定。
  - 移动端：导航抽屉、侧栏转底部折叠区，轮播与列表全宽显示。

## 插件与扩展
- 内置：进度条、返回顶部、nprogress、搜索（本地索引/Algolia）、站点地图、PWA、图片懒加载、阅读量适配（前端或第三方统计）。
- 可选：RSS feed、短代码（提示、卡片、折叠、对齐栅格）、Mermaid、评论适配、广告脚本插入。
- 数据准备：在 `node/plugins.ts` 中集中注册，按配置启停；博客数据生成时间轴、热门/随机文章数据源（可基于 frontmatter 或构建时随机）。

## 测试与质量保障
- **Lint**：ESLint + Prettier + Stylelint（SCSS/UnoCSS 结合）。
- **单元测试**：Vitest 覆盖 composables（暗色模式、阅读进度、轮播数据适配、分页逻辑）与工具函数。
- **端到端**：Playwright 对首页（轮播、列表、侧栏）、文章页（TOC、评论、上一页/下一页）、搜索抽屉进行截图/可用性检查。

## 发布与文档
1. 在 `demo/.vuepress` 中提供接近 Demo 站点的配置示例（轮播、精选、侧栏小部件、广告位、友链、暗色模式）。
2. 使用 `pnpm publish`（或 npm/yarn）发布到 npm，遵循语义化版本。
3. 在 README 中提供：安装、配置示例、frontmatter 规范、可选插件、广告/统计接入、主题变量覆盖方式、模块开关示例。
4. 维护变更日志（CHANGELOG）并在示例站点展示主题用法、组件 Props/API 与布局插槽说明。

## 开发里程碑（建议）
1. **脚手架**：初始化主题包、TypeScript、Vite、ESLint；准备示例数据与图片占位。
2. **布局框架**：实现顶栏、页脚、两栏布局与暗色模式切换；移动端抽屉。
3. **首页模块**：轮播/精选卡片、文章列表、侧栏小部件（最新/热门/随机、分类、标签云、广告位、站点卡片）。
4. **文章/归档/分类页**：文章详情（元信息、TOC、相关/推荐、评论适配）、分类标签页、归档时间轴。
5. **增强体验**：搜索弹层、阅读进度条、返回顶部、图片懒加载、分页/加载更多。
6. **文档与测试**：示例站点、README、组件 API；Lint + Vitest + Playwright；预发布演练。
