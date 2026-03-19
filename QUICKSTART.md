# 快速开始指南

## 🎯 5分钟快速体验纯8+

### 步骤 1: 安装依赖

```bash
cd project/pure8-plus
npm install
```

**等待时间**: 约2-3分钟

### 步骤 2: 启动开发服务器

```bash
npm run dev
```

### 步骤 3: 打开浏览器

访问: http://localhost:3000

---

## 🚀 用户流程体验

### 第一次使用

1. **欢迎页**
   - 选择一个模式（例如：职场进修 💼）
   - 点击"开始 14 天探索期"

2. **探索期 - 第1天**
   - 输入今天的学习时间（例如：2小时30分钟）
   - 选择时间段（早晨 🌅）
   - 评价精力状态（还不错 😊）
   - 可选：添加备注
   - 点击"保存记录"

3. **探索期 - 第2天**
   - 继续记录...
   - （如果你想快速跳过，可以在浏览器控制台修改数据）

4. **14天后**
   - 系统会根据你的记录推荐"纯X"
   - 你可以调整这个数字
   - 给你的目标起个名字（例如：学习编程 💻）
   - 选择一个图标
   - 点击"确认目标"

5. **承诺宪法**
   - 阅读你的纯X宪法
   - 勾选"我承诺遵守以上宪法"
   - 点击"开始我的纯X之旅"

6. **主页面**
   - 看到你的目标卡片
   - 记录时间，看着进度条增长
   - 积累你的第一个100小时！

---

## 🎮 模拟完整流程（开发者模式）

如果你想快速测试所有功能：

### 1. 在浏览器控制台执行：

```javascript
// 设置用户配置为已承诺状态
const userConfig = {
  onboardingStage: 'committed',
  userMode: 'career-growth',
  explorationData: Array.from({length: 14}, (_, i) => ({
    day: i + 1,
    hours: 4 + Math.random() * 2,
    date: new Date(Date.now() - (13 - i) * 86400000).toISOString().split('T')[0],
    timeSlots: ['morning'],
    energyLevel: 3 + Math.floor(Math.random() * 2),
  })),
  customPureTarget: 4,
  constitutionStreak: 5,
  startDate: new Date().toISOString(),
};

localStorage.setItem('pure8_user_config', JSON.stringify(userConfig));

// 创建目标
const goal = {
  id: 'test-goal-1',
  name: '学习 Next.js',
  icon: '💻',
  targetHours: 10000,
  currentHours: 125.5,
  dailyPureTarget: 4,
  createdAt: new Date().toISOString(),
};

localStorage.setItem('pure8_goal', JSON.stringify(goal));

// 添加一些今日记录
const today = new Date().toISOString().split('T')[0];
const records = [
  {
    id: 'record-1',
    date: today,
    hours: 2,
    minutes: 30,
    timeSlot: 'morning',
    energyLevel: 4,
    notes: '学习了 React Hooks',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'record-2',
    date: today,
    hours: 1,
    minutes: 45,
    timeSlot: 'afternoon',
    energyLevel: 3,
    notes: '练习 TypeScript',
    createdAt: new Date().toISOString(),
  },
];

localStorage.setItem('pure8_records', JSON.stringify(records));

// 刷新页面
location.reload();
```

### 2. 刷新页面

你会直接进入主页面，看到：
- 目标：学习 Next.js 💻
- 已记录 125.5 小时
- 今日已记录 4小时15分钟
- 连续达成 5 天

### 3. 测试记录功能

- 点击"记录时间"按钮
- 填写表单并保存
- 看到进度更新

---

## 📱 移动端测试

### 使用浏览器开发者工具

1. 打开 Chrome/Edge 开发者工具（F12）
2. 点击设备工具栏图标（或按 Ctrl+Shift+M）
3. 选择移动设备（例如 iPhone 12 Pro）
4. 刷新页面测试响应式布局

### 真机测试

1. 确保手机和电脑在同一 WiFi
2. 查看电脑 IP 地址：
   ```bash
   # macOS/Linux
   ifconfig | grep inet

   # Windows
   ipconfig
   ```
3. 在手机浏览器访问：`http://你的IP:3000`

---

## 🧪 功能测试清单

### 用户引导流程
- [ ] 欢迎页 - 三种模式选择
- [ ] 探索期 - 14天记录
- [ ] 设定目标 - 推荐/调整纯X
- [ ] 承诺宪法 - 确认承诺

### 主页面功能
- [ ] 目标卡片显示
- [ ] 今日状态更新
- [ ] 记录时间弹窗
- [ ] 今日记录列表
- [ ] 金句展示
- [ ] 里程碑显示

### 数据持久化
- [ ] 刷新页面数据不丢失
- [ ] 关闭浏览器重新打开数据保留
- [ ] 多个标签页数据同步

### 响应式设计
- [ ] 桌面端（1920x1080）
- [ ] 平板（768x1024）
- [ ] 手机（375x667）

---

## 🐛 常见问题

### Q: npm install 很慢怎么办？

使用国内镜像：
```bash
npm install --registry=https://registry.npmmirror.com
```

### Q: 端口 3000 被占用？

指定端口：
```bash
npm run dev -- -p 3001
```

### Q: 样式不正常？

清除缓存：
```bash
rm -rf .next
npm run dev
```

### Q: 如何清空所有数据？

在浏览器控制台执行：
```javascript
localStorage.clear();
location.reload();
```

---

## 💻 开发提示

### 热重载
修改代码后自动刷新，无需重启服务器。

### 调试
- 使用 `console.log()` 输出日志
- 使用 React DevTools 查看组件状态
- 使用浏览器开发工具查看 localStorage

### 代码风格
- 使用 TypeScript 类型检查
- 遵循 ESLint 规则
- 保持代码简洁清晰

---

## 📚 下一步

1. **阅读代码**
   - 从 `app/page.tsx` 开始
   - 查看 `lib/` 目录的工具函数
   - 理解数据流

2. **修改样式**
   - 编辑 `tailwind.config.ts`
   - 修改颜色主题
   - 调整布局

3. **添加功能**
   - 参考现有页面
   - 复用组件
   - 遵循代码规范

4. **部署上线**
   - 参考 `DEPLOYMENT.md`
   - 选择部署平台
   - 享受你的作品！

---

**祝你使用愉快！** 🎉

有问题？查看 `PROJECT_SUMMARY.md` 或 `README.md`
