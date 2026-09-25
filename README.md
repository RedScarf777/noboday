# 哞哞个人作品集

动画编剧与内容策划个人网站，以手绘旷野为视觉主题，展示代表作品、项目经历与成长路径。

## 本地运行

请先安装 Node.js，然后在项目目录执行：

```bash
npm install
npm run dev
```

浏览器访问终端中显示的本地地址即可预览。

## 生产构建

```bash
npm run build
```

构建结果会生成在 `dist` 目录。

## 部署

项目已包含 `vercel.json`，连接 GitHub 仓库到 Vercel 后即可自动识别并部署：

- 构建命令：`npm run build`
- 输出目录：`dist`

本项目不需要配置 API Key 或其他环境变量。

## 技术栈

- React 19
- TypeScript
- Vite
- Motion
- Tailwind CSS
