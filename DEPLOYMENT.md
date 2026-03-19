# 部署指南

## 🚀 部署到 Vercel

### 方法一：从 GitHub 部署（推荐）

1. **将代码推送到 GitHub**

```bash
cd project/pure8-plus

# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 纯8+ MVP 完成"

# 推送到 GitHub
# 先在 GitHub 创建新仓库，然后：
git remote add origin https://github.com/echoluo525-dot/pure8-plus.git
git branch -M main
git push -u origin main
```

2. **在 Vercel 部署**

- 访问 [vercel.com](https://vercel.com)
- 点击 "Import Project"
- 选择你的 GitHub 仓库
- 点击 "Deploy"
- 等待部署完成（约1-2分钟）

3. **完成！**

Vercel 会自动提供 HTTPS 域名，例如：
`https://pure8-plus.vercel.app`

---

### 方法二：使用 Vercel CLI

1. **安装 Vercel CLI**

```bash
npm install -g vercel
```

2. **登录**

```bash
vercel login
```

3. **部署**

```bash
cd project/pure8-plus
vercel
```

4. **按照提示操作**

- 链接到已有项目或创建新项目
- 确认配置
- 等待部署

---

## 📦 部署到其他平台

### Netlify

1. 在 Netlify 创建新站点
2. 导入 GitHub 仓库
3. 构建命令: `npm run build`
4. 发布目录: `.next`
5. 点击部署

**注意**: Next.js 在 Netlify 上需要额外配置，推荐使用 Vercel。

### 自托管

```bash
# 构建
npm run build

# 启动生产服务器
npm start

# 访问 http://localhost:3000
```

使用 PM2 保持运行：

```bash
npm install -g pm2
pm2 start npm --name "pure8-plus" -- start
pm2 save
pm2 startup
```

---

## 🔧 环境变量

本项目不需要环境变量，所有数据存储在客户端 localStorage。

---

## 📊 性能优化

### 已实现

- ✅ Next.js 自动代码分割
- ✅ 图片优化（待添加图片时）
- ✅ CSS 优化（Tailwind 自动清除未使用的样式）
- ✅ 静态生成（可配置为 `output: 'export'`）

### 静态导出配置

如需导出为纯静态站点：

1. 修改 `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // 添加这行
};

module.exports = nextConfig;
```

2. 重新构建：

```bash
npm run build
```

3. 静态文件在 `out/` 目录

---

## 🔐 安全考虑

- ✅ 所有数据存储在客户端
- ✅ 无服务器端数据传输
- ✅ 无第三方追踪
- ✅ 无用户认证（MVP阶段）

---

## 📱 PWA 支持（未来）

可以添加 PWA 支持：

1. 安装 next-pwa:

```bash
npm install next-pwa
```

2. 配置 next.config.js

3. 添加 manifest.json

4. 添加 Service Worker

---

## 🌐 域名配置

### 在 Vercel

1. 进入项目设置
2. 点击 "Domains"
3. 添加自定义域名
4. 配置 DNS 记录

---

## 💡 最佳实践

1. **定期备份数据**

导出功能（待添加）或使用浏览器开发工具：

```javascript
// 在浏览器控制台执行
const data = {
  userConfig: localStorage.getItem('pure8_user_config'),
  goal: localStorage.getItem('pure8_goal'),
  records: localStorage.getItem('pure8_records'),
};
console.log(JSON.stringify(data, null, 2));
```

2. **监控性能**

使用 Vercel Analytics：

```bash
npm install @vercel/analytics
```

3. **SEO 优化**

已在 `app/layout.tsx` 添加 metadata。

---

## 🔄 持续集成

### GitHub Actions 示例

创建 `.github/workflows/ci.yml`:

```yaml
name: CI

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
```

---

## 📈 监控和分析

### Vercel Analytics

```bash
npm install @vercel/analytics
```

在 `app/layout.tsx` 中添加：

```jsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🎉 部署后检查清单

- [ ] 所有页面正常加载
- [ ] 数据持久化工作正常
- [ ] 响应式设计在移动端正常
- [ ] 暗色模式正常（如果启用）
- [ ] 性能良好（Lighthouse 得分 > 90）
- [ ] 无控制台错误

---

**祝你部署顺利！** 🚀
