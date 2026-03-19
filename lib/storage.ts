import { UserConfig, Goal, TimeRecord } from './types';

const STORAGE_KEYS = {
  USER_CONFIG: 'pure8_user_config',
  GOAL: 'pure8_goal',
  RECORDS: 'pure8_records',
};

// 用户配置
export const storage = {
  // 获取用户配置
  getUserConfig(): UserConfig | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.USER_CONFIG);
    return data ? JSON.parse(data) : null;
  },

  // 保存用户配置
  saveUserConfig(config: UserConfig): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.USER_CONFIG, JSON.stringify(config));
  },

  // 获取目标
  getGoal(): Goal | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(STORAGE_KEYS.GOAL);
    return data ? JSON.parse(data) : null;
  },

  // 保存目标
  saveGoal(goal: Goal): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.GOAL, JSON.stringify(goal));
  },

  // 获取所有记录
  getRecords(): TimeRecord[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
    return data ? JSON.parse(data) : [];
  },

  // 保存记录
  saveRecord(record: TimeRecord): void {
    if (typeof window === 'undefined') return;
    const records = this.getRecords();
    records.push(record);
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  },

  // 更新记录
  updateRecord(id: string, updates: Partial<TimeRecord>): void {
    if (typeof window === 'undefined') return;
    const records = this.getRecords();
    const index = records.findIndex(r => r.id === id);
    if (index !== -1) {
      records[index] = { ...records[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
    }
  },

  // 删除记录
  deleteRecord(id: string): void {
    if (typeof window === 'undefined') return;
    const records = this.getRecords().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  },

  // 获取今日记录
  getTodayRecords(): TimeRecord[] {
    const records = this.getRecords();
    const today = new Date().toISOString().split('T')[0];
    return records.filter(r => r.date === today);
  },

  // 清空所有数据
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER_CONFIG);
    localStorage.removeItem(STORAGE_KEYS.GOAL);
    localStorage.removeItem(STORAGE_KEYS.RECORDS);
  },
};
