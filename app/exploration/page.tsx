'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { formatTime, TIME_SLOT_OPTIONS, ENERGY_LEVEL_OPTIONS, generateId, formatDate, getDateDisplay } from '@/lib/utils';
import type { UserConfig, TimeSlot } from '@/lib/types';

export default function ExplorationPage() {
  const router = useRouter();
  const [day, setDay] = useState(1);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [timeSlot, setTimeSlot] = useState<TimeSlot>('morning');
  const [energyLevel, setEnergyLevel] = useState(3);
  const [notes, setNotes] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [explorationData, setExplorationData] = useState<any[]>([]);

  useEffect(() => {
    const userConfig = storage.getUserConfig();
    if (!userConfig || userConfig.onboardingStage !== 'exploring') {
      router.push('/welcome');
      return;
    }

    // 加载已有数据
    if (userConfig.explorationData.length > 0) {
      setExplorationData(userConfig.explorationData);
      setDay(userConfig.explorationData.length + 1);
    }
  }, [router]);

  const handleSave = () => {
    if (hours === 0 && minutes === 0) {
      alert('请记录至少 1 分钟的学习时间');
      return;
    }

    const userConfig = storage.getUserConfig();
    if (!userConfig) return;

    const newRecord = {
      day,
      hours: hours + minutes / 60,
      date: formatDate(new Date()),
      timeSlots: [timeSlot],
      energyLevel,
      notes: notes.trim() || undefined,
    };

    const updatedData = [...userConfig.explorationData, newRecord];
    userConfig.explorationData = updatedData;

    // 检查是否完成 14 天
    if (updatedData.length >= 14) {
      userConfig.onboardingStage = 'confirmed';
      storage.saveUserConfig(userConfig);
      router.push('/set-target');
    } else {
      storage.saveUserConfig(userConfig);
      setIsSaved(true);
      setExplorationData(updatedData);

      // 重置表单
      setTimeout(() => {
        setHours(0);
        setMinutes(0);
        setTimeSlot('morning');
        setEnergyLevel(3);
        setNotes('');
        setIsSaved(false);
        setDay(day + 1);
      }, 1500);
    }
  };

  const currentDay = explorationData.length + 1;
  const avgHours = explorationData.length > 0
    ? (explorationData.reduce((sum, d) => sum + d.hours, 0) / explorationData.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              探索期 · 第 {currentDay} 天
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              平均 {avgHours} 小时/天
            </div>
          </div>

          {/* 进度条 */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentDay / 14) * 100}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            {currentDay}/14 天
          </div>
        </div>

        {/* 记录表单 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
            今天记录了多久？
          </h2>

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
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none dark:bg-gray-700 dark:text-white"
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
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* 时间段 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              时间段
            </label>
            <div className="grid grid-cols-5 gap-2">
              {TIME_SLOT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeSlot(option.value as any)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    timeSlot === option.value
                      ? 'bg-purple-500 text-white scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-xs">{option.label}</div>
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
              {ENERGY_LEVEL_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setEnergyLevel(option.value)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    energyLevel === option.value
                      ? 'bg-purple-500 text-white scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-xs">{option.label}</div>
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
              placeholder="今天有什么收获或感受？"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none dark:bg-gray-700 dark:text-white resize-none"
            />
          </div>

          {/* 保存按钮 */}
          <button
            onClick={handleSave}
            disabled={isSaved || (hours === 0 && minutes === 0)}
            className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all ${
              isSaved
                ? 'bg-green-500 text-white'
                : hours === 0 && minutes === 0
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            {isSaved ? '✓ 已保存' : '保存记录'}
          </button>
        </div>

        {/* 历史记录 */}
        {explorationData.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              历史记录
            </h3>
            <div className="space-y-3">
              {explorationData.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {record.day}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-200">
                        {formatTime(Math.floor(record.hours), Math.round((record.hours % 1) * 60))}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {getDateDisplay(record.date)}
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl">
                    {ENERGY_LEVEL_OPTIONS[record.energyLevel - 1]?.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
