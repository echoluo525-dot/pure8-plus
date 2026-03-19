# 纯8+ (PureTime Plus) 网页版 PRD v1.0 MVP

## 产品概述

**纯8+** 是一个基于"纯时间哲学"的长期目标追踪网页应用。

**核心价值**：记录纯时间，看见积累，找到属于自己的纯X目标。

---

## 功能范围 (MVP)

### 1. 用户引导流程

| 页面 | 功能 |
|------|------|
| **欢迎页** | 选择用户模式（全职学习/职场进修/习惯养成） |
| **探索期** | 14天记录，计算平均纯时间 |
| **设定目标** | 基于数据推荐纯X，用户可调整 |
| **承诺宪法** | 确认每日目标承诺 |

### 2. 主页面 (Dashboard)

| 功能 | 说明 |
|------|------|
| **目标卡片** | 显示当前目标、图标、进度条、百分比 |
| **今日状态** | 今日已记录时长、目标、剩余、进度条 |
| **记录按钮** | 打开记录弹窗 |
| **格子展示** | 10×10 网格，1格=1小时 |
| **里程碑** | 100/500/1000/5000/10000h 进度 |
| **宪法天数** | 连续达成天数 |
| **每日金句** | 励志名言展示 |

### 3. 时间记录

| 功能 | 说明 |
|------|------|
| **手动输入** | 小时 + 分钟，精确到分钟 |
| **计时器** | 开始/暂停/完成 |
| **时间段** | 早晨/下午/晚上/深夜/周末 |
| **精力状态** | 1-5 星评价 |
| **备注** | 可选文字备注 |

### 4. 格子系统

| 功能 | 说明 |
|------|------|
| **格子展示** | 10×10 网格 = 100 小时 |
| **点击填充** | 已填充格子有颜色 |
| **分页** | 每100小时一页 |

---

## 数据结构

```typescript
// lib/types.ts

// 用户引导阶段
type OnboardingStage = 'new' | 'exploring' | 'confirmed' | 'committed';

// 用户模式
type UserMode = 'fulltime-study' | 'career-growth' | 'habit-building';

// 时间段
type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night' | 'weekend';

// 用户配置
interface UserConfig {
  onboardingStage: OnboardingStage;
  userMode: UserMode;
  explorationData: ExplorationDay[];
  customPureTarget: number;  // 用户的纯X
  constitutionStreak: number;
  startDate: string;
}

// 探索期数据
interface ExplorationDay {
  day: number;
  hours: number;
  date: string;
  timeSlots: TimeSlot[];
  energyLevel: number;  // 1-5
  notes?: string;
}

// 目标
interface Goal {
  id: string;
  name: string;
  icon: string;
  targetHours: number;
  currentHours: number;
  dailyPureTarget: number;
  createdAt: string;
}

// 时间记录
interface TimeRecord {
  id: string;
  date: string;
  hours: number;
  minutes: number;
  timeSlot: TimeSlot;
  energyLevel: number;
  notes?: string;
  createdAt: string;
}

// 金句
interface Quote {
  content: string;
  author: string;
  category: string;
}

// 格子数据
interface GridData {
  totalHours: number;
  grids: GridPage[];
}

interface GridPage {
  pageNumber: number;
  startHour: number;
  endHour: number;
  filledCells: number;  // 0-100
}
```

---

## 技术实现

| 技术 | 用途 |
|------|------|
| **Next.js 14** | React 全栈框架（App Router） |
| **TypeScript** | 类型安全 |
| **Tailwind CSS** | 样式框架 |
| **localStorage** | 本地数据存储 |
| **React Hooks** | 状态管理 |
| **Zustand** | 轻量级状态管理（可选） |

---

## 页面流程

```
新用户
  │
  ├─→ /welcome (选择模式)
  │
  ├─→ /exploration (14天记录)
  │     │
  │     └─→ /set-target (设定纯X)
  │
  └─→ /constitution (承诺)
        │
        └─→ /dashboard (主页面)
              │
              ├─→ 记录弹窗 (Modal)
              └─→ /grid (格子详情页)
```

## 项目结构

```
pure8-plus/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页/欢迎页
│   ├── welcome/
│   │   └── page.tsx        # 欢迎页
│   ├── exploration/
│   │   └── page.tsx        # 探索期
│   ├── set-target/
│   │   └── page.tsx        # 设定目标
│   ├── constitution/
│   │   └── page.tsx        # 承诺宪法
│   ├── dashboard/
│   │   └── page.tsx        # 主页面
│   └── grid/
│       └── page.tsx        # 格子详情
├── components/
│   ├── GoalCard.tsx        # 目标卡片
│   ├── TodayStatus.tsx     # 今日状态
│   ├── RecordModal.tsx     # 记录弹窗
│   ├── GridSystem.tsx      # 格子系统
│   └── Milestone.tsx       # 里程碑
├── lib/
│   ├── storage.ts          # localStorage 封装
│   ├── types.ts            # TypeScript 类型定义
│   └── utils.ts            # 工具函数
└── public/
    └── icons/              # 图标资源
```

---

## 用户旅程

1. 打开网页 → 选择"职场进修"模式
2. 进入探索期 → 每天记录学习时长
3. 14天后 → 系统推荐"纯4"作为目标
4. 承诺宪法 → 进入主页面
5. 每天记录 → 看格子被填满 → 坚持下去

---

## 成功指标

| 指标 | 目标 |
|------|------|
| 14天探索期完成率 | > 70% |
| 记录次日留存 | > 60% |
| 平均每日记录 | > 1 次 |

---

## 不做 (Out of Scope)

- ~~用户登录/注册~~
- ~~云端同步~~
- ~~移动端原生 App~~
- ~~社交分享~~
- ~~数据统计图表~~
- ~~多目标管理~~ (V1.0 只做单目标)
- ~~服务端渲染优化~~ (MVP 阶段使用静态导出)
- ~~数据库~~ (使用 localStorage)

---

## 技术决策说明

### 为什么选择 Next.js + Tailwind CSS？

**Next.js 优势：**
- ✅ App Router 提供更好的文件路由
- ✅ Server Components 减少客户端负担
- ✅ 内置优化（图片、字体等）
- ✅ 可以轻松部署到 Vercel
- ✅ TypeScript 支持完善
- ✅ 生态丰富，社区活跃

**Tailwind CSS 优势：**
- ✅ 快速构建 UI，无需写自定义 CSS
- ✅ 响应式设计简单
- ✅ 暗色模式支持
- ✅ 与 Next.js 集成完美

**数据存储选择：**
- 使用 localStorage 而非 IndexedDB，因为：
  - MVP 阶段数据量小
  - API 更简单，开发更快
  - 同步存储，无需异步处理
  - 可以轻松导出/导入 JSON 备份

**状态管理：**
- 使用 React Hooks（useState, useEffect）管理本地状态
- 如需全局状态，可引入 Zustand（轻量级）
- 避免过度设计，保持简单

---

## 部署方案

- **开发环境**：`npm run dev`
- **生产构建**：`npm run build`
- **部署平台**：Vercel（一键部署）
- **静态导出**：可配置为纯静态站点（`output: 'export'`）

---

## 开发优先级

### Phase 1: 基础框架（第1-2天）
1. ✅ 初始化 Next.js 项目
2. ✅ 配置 Tailwind CSS
3. ✅ 设置项目结构
4. ✅ 定义 TypeScript 类型
5. ✅ 实现 localStorage 封装

### Phase 2: 核心功能（第3-7天）
1. ✅ 用户引导流程（4个页面）
2. ✅ 时间记录功能
3. ✅ Dashboard 主页面
4. ✅ 格子系统展示

### Phase 3: 优化完善（第8-10天）
1. ✅ UI/UX 优化
2. ✅ 数据持久化
3. ✅ 响应式适配
4. ✅ 测试和修复 bug

---

## 版本历史

- **v1.0 MVP** (2026-03-19)
  - 初始版本
  - 技术栈从 Svelte 改为 Next.js + Tailwind CSS
  - 添加详细的技术决策说明
