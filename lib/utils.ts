// 生成唯一ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 格式化日期
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// 格式化时间显示
export function formatTime(hours: number, minutes: number): string {
  if (hours === 0 && minutes === 0) return '0分钟';
  if (hours === 0) return `${minutes}分钟`;
  if (minutes === 0) return `${hours}小时`;
  return `${hours}小时${minutes}分钟`;
}

// 计算总分钟数
export function totalMinutes(hours: number, minutes: number): number {
  return hours * 60 + minutes;
}

// 计算进度百分比
export function calculateProgress(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.min(Math.round((current / total) * 100), 100);
}

// 计算格子数（每格1小时）
export function calculateGrids(totalHours: number): number {
  return Math.floor(totalHours);
}

// 获取当前格子页（每页100格）
export function getCurrentGridPage(totalHours: number): number {
  return Math.floor(totalHours / 100) + 1;
}

// 获取格子页范围
export function getGridPageRange(pageNumber: number): { start: number; end: number } {
  const start = (pageNumber - 1) * 100;
  const end = pageNumber * 100;
  return { start, end };
}

// 判断是否是今天
export function isToday(dateString: string): boolean {
  const today = formatDate(new Date());
  return dateString === today;
}

// 获取日期显示文本
export function getDateDisplay(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (dateString === formatDate(today)) return '今天';
  if (dateString === formatDate(yesterday)) return '昨天';
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 时间段选项
export const TIME_SLOT_OPTIONS = [
  { value: 'morning', label: '早晨', icon: '🌅' },
  { value: 'afternoon', label: '下午', icon: '☀️' },
  { value: 'evening', label: '晚上', icon: '🌙' },
  { value: 'night', label: '深夜', icon: '🌃' },
  { value: 'weekend', label: '周末', icon: '🎉' },
] as const;

// 能量等级选项
export const ENERGY_LEVEL_OPTIONS = [
  { value: 1, label: '疲惫', icon: '😫', color: 'bg-red-500' },
  { value: 2, label: '一般', icon: '😕', color: 'bg-orange-500' },
  { value: 3, label: '还行', icon: '😐', color: 'bg-yellow-500' },
  { value: 4, label: '不错', icon: '😊', color: 'bg-lime-500' },
  { value: 5, label: '超棒', icon: '🤩', color: 'bg-green-500' },
] as const;

// 金句库
export const QUOTES: Quote[] = [
  { content: '种一棵树最好的时间是十年前，其次是现在。', author: 'Dambisa Moyo', category: '行动' },
  { content: '不积跬步，无以至千里；不积小流，无以成江海。', author: '荀子', category: '坚持' },
  { content: '成功的秘诀在于坚持自己的目标和信念。', author: '本杰明·迪斯雷利', category: '信念' },
  { content: '时间就是生命，浪费时间就是浪费生命。', author: '富兰克林', category: '时间' },
  { content: '今天的努力，明天的实力。', author: '佚名', category: '努力' },
  { content: '每天进步一点点，坚持带来大改变。', author: '佚名', category: '成长' },
  { content: '你的时间有限，不要为别人而活。', author: '史蒂夫·乔布斯', category: '人生' },
  { content: '成功不是终点，失败也不是末日。', author: '温斯顿·丘吉尔', category: '心态' },
];

// 导入类型
import type { Quote } from './types';
