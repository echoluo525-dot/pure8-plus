'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { formatTime, calculateProgress, generateId, formatDate, getDateDisplay, QUOTES } from '@/lib/utils';
import type { Goal, TimeRecord } from '@/lib/types';

export default function DashboardPage() {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [todayRecords, setTodayRecords] = useState<TimeRecord[]>([]);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [todayTotal, setTodayTotal] = useState(0);
  const [constitutionStreak, setConstitutionStreak] = useState(0);
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    const userConfig = storage.getUserConfig();
    const goalData = storage.getGoal();

    if (!userConfig || userConfig.onboardingStage !== 'committed') {
      router.push('/welcome');
      return;
    }

    if (goalData) {
      setGoal(goalData);
    }

    // 加载今日记录
    const records = storage.getTodayRecords();
    setTodayRecords(records);

    const total = records.reduce((sum, r) => sum + r.hours + r.minutes / 60, 0);
    setTodayTotal(total);

    // 获取连续天数
    setConstitutionStreak(userConfig.constitutionStreak);

    // 随机选择金句
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(randomQuote);
  }, [router]);

  const handleAddRecord = (record: Omit<TimeRecord, 'id' | 'date' | 'createdAt'>) => {
    const newRecord: TimeRecord = {
      ...record,
      id: generateId(),
      date: formatDate(new Date()),
      createdAt: new Date().toISOString(),
    };

    storage.saveRecord(newRecord);

    // 更新今日记录
    const updatedRecords = [...todayRecords, newRecord];
    setTodayRecords(updatedRecords);

    const total = updatedRecords.reduce((sum, r) => sum + r.hours + r.minutes / 60, 0);
    setTodayTotal(total);

    // 更新目标进度
    if (goal) {
      goal.currentHours += record.hours + record.minutes / 60;
      storage.saveGoal(goal);
      setGoal({ ...goal });
    }

    setShowRecordModal(false);
  };

  if (!goal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  const progress = calculateProgress(goal.currentHours, goal.targetHours);
  const todayProgress = calculateProgress(todayTotal, goal.dailyPureTarget);
  const remaining = Math.max(0, goal.dailyPureTarget - todayTotal);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* 目标卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{goal.icon}</div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                {goal.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                纯{goal.dailyPureTarget} · {constitutionStreak}天连续达成
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {progress}%
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {goal.currentHours.toFixed(1)} / {goal.targetHours}小时
              </div>
            </div>
          </div>

          {/* 总进度条 */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 今日状态 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              今日状态
            </h2>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {getDateDisplay(formatDate(new Date()))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatTime(Math.floor(todayTotal), Math.round((todayTotal % 1) * 60))}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">已记录</div>
            </div>
            <div className="text-center p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {formatTime(Math.floor(remaining), Math.round((remaining % 1) * 60))}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">剩余目标</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {todayProgress}%
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">今日进度</div>
            </div>
          </div>

          {/* 今日进度条 */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${todayProgress}%` }}
            />
          </div>

          {/* 记录按钮 */}
          <button
            onClick={() => setShowRecordModal(true)}
            className="w-full py-4 px-6 rounded-xl text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105 transition-all"
          >
            + 记录时间
          </button>
        </div>

        {/* 今日记录列表 */}
        {todayRecords.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              今日记录
            </h3>
            <div className="space-y-3">
              {todayRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {['🌅', '☀️', '🌙', '🌃', '🎉'][['morning', 'afternoon', 'evening', 'night', 'weekend'].indexOf(record.timeSlot)]}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {formatTime(record.hours, record.minutes)}
                      </div>
                      {record.notes && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {record.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {['😫', '😕', '😐', '😊', '🤩'][record.energyLevel - 1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 金句 */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center">
            <div className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
              "{quote.content}"
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              — {quote.author}
            </div>
          </div>
        </div>

        {/* 里程碑 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            里程碑
          </h3>
          <div className="grid grid-cols-5 gap-3">
            {[100, 500, 1000, 5000, 10000].map((milestone) => {
              const achieved = goal.currentHours >= milestone;
              return (
                <div
                  key={milestone}
                  className={`text-center p-4 rounded-xl transition-all ${
                    achieved
                      ? 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 scale-105'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                >
                  <div className={`text-2xl mb-1 ${achieved ? 'opacity-100' : 'opacity-30'}`}>
                    🏆
                  </div>
                  <div className={`text-sm font-semibold ${achieved ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400'}`}>
                    {milestone}h
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 记录弹窗 */}
      {showRecordModal && (
        <RecordModal
          onClose={() => setShowRecordModal(false)}
          onSave={handleAddRecord}
        />
      )}
    </div>
  );
}

// 记录弹窗组件
function RecordModal({ onClose, onSave }: { onClose: () => void; onSave: (record: Omit<TimeRecord, 'id' | 'date' | 'createdAt'>) => void }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon' | 'evening' | 'night' | 'weekend'>('morning');
  const [energyLevel, setEnergyLevel] = useState(3);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (hours === 0 && minutes === 0) {
      alert('请记录至少 1 分钟');
      return;
    }

    onSave({
      hours,
      minutes,
      timeSlot,
      energyLevel,
      notes: notes.trim() || undefined,
    });
  };

  const TIME_SLOTS = [
    { value: 'morning', label: '早晨', icon: '🌅' },
    { value: 'afternoon', label: '下午', icon: '☀️' },
    { value: 'evening', label: '晚上', icon: '🌙' },
    { value: 'night', label: '深夜', icon: '🌃' },
    { value: 'weekend', label: '周末', icon: '🎉' },
  ];

  const ENERGY_LEVELS = [
    { value: 1, label: '疲惫', icon: '😫' },
    { value: 2, label: '一般', icon: '😕' },
    { value: 3, label: '还行', icon: '😐' },
    { value: 4, label: '不错', icon: '😊' },
    { value: 5, label: '超棒', icon: '🤩' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            记录时间
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* 时间输入 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              小时
            </label>
            <input
              type="number"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              分钟
            </label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* 时间段 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
            时间段
          </label>
          <div className="grid grid-cols-5 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.value}
                onClick={() => setTimeSlot(slot.value as any)}
                className={`p-3 rounded-xl text-center transition-all ${
                  timeSlot === slot.value
                    ? 'bg-primary-500 text-white scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{slot.icon}</div>
                <div className="text-xs">{slot.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 精力状态 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
            精力状态
          </label>
          <div className="grid grid-cols-5 gap-2">
            {ENERGY_LEVELS.map((level) => (
              <button
                key={level.value}
                onClick={() => setEnergyLevel(level.value)}
                className={`p-3 rounded-xl text-center transition-all ${
                  energyLevel === level.value
                    ? 'bg-primary-500 text-white scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <div className="text-2xl mb-1">{level.icon}</div>
                <div className="text-xs">{level.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 备注 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            备注（可选）
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="今天有什么收获？"
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary-500 focus:outline-none dark:bg-gray-700 dark:text-white resize-none"
          />
        </div>

        {/* 按钮 */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            disabled={hours === 0 && minutes === 0}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
              hours === 0 && minutes === 0
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg'
            }`}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
}
