# 纯8+ (PureTime Plus)

基于"纯时间哲学"的长期目标追踪网页应用。

## 项目简介

**核心价值**：记录纯时间，看见积累，找到属于自己的纯X目标。

## 技术栈

- **Next.js 14** - React 全栈框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **localStorage** - 本地数据存储

## 功能特性

### MVP 版本包含：

1. **用户引导流程**
   - 欢迎页：选择用户模式
   - 探索期：14天记录，计算平均纯时间
   - 设定目标：基于数据推荐纯X
   - 承诺宪法：确认每日目标承诺

2. **主页面 (Dashboard)**
   - 目标卡片：显示当前目标、进度
   - 今日状态：已记录时长、剩余、进度条
   - 时间记录：手动输入 + 计时器
   - 格子系统：10×10 网格，1格=1小时
   - 里程碑：100/500/1000/5000/10000h 进度
   - 每日金句：励志名言展示

3. **数据持久化**
   - 使用 localStorage 存储所有数据
   - 可导出/导入 JSON 备份

## 开始使用

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)。

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
pure8-plus/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   ├── welcome/           # 欢迎页
│   ├── exploration/       # 探索期
│   ├── set-target/        # 设定目标
│   ├── constitution/      # 承诺宪法
│   └── dashboard/         # 主页面
├── components/            # 可复用组件
├── lib/                   # 工具库
│   ├── types.ts          # TypeScript 类型定义
│   ├── storage.ts        # localStorage 封装
│   └── utils.ts          # 工具函数
├── public/               # 静态资源
└── PRD.md               # 产品需求文档
```

## 核心概念

### 什么是"纯X"？

"纯X"是你每天专注投入的纯粹时间。比如：
- 纯4 = 每天专注4小时
- 纯6 = 每天专注6小时
- 纯8 = 每天专注8小时

### 10000小时定律

根据 Malcolm Gladwell 的《异类》，在任何领域投入10000小时，你都能成为专家。

## 开发路线图

### Phase 1: 基础框架 ✅
- [x] 初始化 Next.js 项目
- [x] 配置 Tailwind CSS
- [x] 设置项目结构
- [x] 定义 TypeScript 类型
- [x] 实现 localStorage 封装

### Phase 2: 核心功能 ✅
- [x] 用户引导流程（4个页面）
- [x] 时间记录功能
- [x] Dashboard 主页面
- [ ] 格子系统展示

### Phase 3: 优化完善
- [ ] UI/UX 优化
- [ ] 数据导出/导入
- [ ] 响应式适配
- [ ] 测试和修复 bug

## 部署

推荐使用 [Vercel](https://vercel.com) 部署：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

---

**开始你的纯X之旅，见证时间的复利！** 🚀
