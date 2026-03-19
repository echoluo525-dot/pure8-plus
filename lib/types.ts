// 用户引导阶段
export type OnboardingStage = 'new' | 'exploring' | 'confirmed' | 'committed';

// 用户模式
export type UserMode = 'fulltime-study' | 'career-growth' | 'habit-building';

// 时间段
export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night' | 'weekend';

// 用户配置
export interface UserConfig {
  onboardingStage: OnboardingStage;
  userMode: UserMode;
  explorationData: ExplorationDay[];
  customPureTarget: number;  // 用户的纯X
  constitutionStreak: number;
  startDate: string;
}

// 探索期数据
export interface ExplorationDay {
  day: number;
  hours: number;
  date: string;
  timeSlots: TimeSlot[];
  energyLevel: number;  // 1-5
  notes?: string;
}

// 目标
export interface Goal {
  id: string;
  name: string;
  icon: string;
  targetHours: number;
  currentHours: number;
  dailyPureTarget: number;
  createdAt: string;
}

// 时间记录
export interface TimeRecord {
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
export interface Quote {
  content: string;
  author: string;
  category: string;
}

// 格子数据
export interface GridData {
  totalHours: number;
  grids: GridPage[];
}

export interface GridPage {
  pageNumber: number;
  startHour: number;
  endHour: number;
  filledCells: number;  // 0-100
}
