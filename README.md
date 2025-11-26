# VuePress DUX 主题脚手架

根据《VuePress DUX 主题开发设计草案》，这里提供了基础的主题目录结构、示例配置与布局骨架，便于按 demo.themebetter.com/dux 的交互继续迭代。

## 仓库结构
- `theme/`：主题源码，含入口 `index.ts`、节点端配置与客户端组件/布局。
- `demo/.vuepress/`：示例站点配置，引用本地主题，提供轮播、精选、侧栏小部件示例。
- `demo/posts/`：示例文章。

## 快速开始
1. 安装依赖（建议使用 pnpm）：
   ```bash
   pnpm install
   ```
   如果默认 npm 源被限制，可临时指定镜像：
   ```bash
   pnpm install --registry https://registry.npmmirror.com
   ```
2. 启动示例站点：
   ```bash
   pnpm --filter @dux/theme dev
   ```
3. 构建示例站点：
   ```bash
   pnpm --filter @dux/theme build
   ```
   构建结果输出在 `demo/.vuepress/dist/`，如果未运行构建将看不到生成的静态文件。

## 下一步
- 为首页列表/侧栏组件接入真实数据源（frontmatter 或插件）。
- 丰富搜索、评论、分页、暗色模式等交互，并补充测试用例。

## 将代码推送到你的仓库
1. 为当前仓库配置远程地址（替换为你的 Git 仓库 URL）：
   ```bash
   git remote add origin <your-repo-url>
   ```
   如已存在其他远程，可用 `git remote set-url origin <your-repo-url>` 更新。
2. 确认当前分支（此仓库默认使用 `work` 分支）：
   ```bash
   git branch
   ```
3. 推送代码到远程分支（首次推送带上 `-u` 建立跟踪）：
   ```bash
   git push -u origin work
   ```
   如果使用其他分支名，替换命令中的 `work` 即可。
4. 推送前请确保已提交本地改动：
   ```bash
   git status
   git add .
   git commit -m "your message"
   ```
   推送需本地 Git 已配置身份凭证（SSH key 或 HTTPS token）。
