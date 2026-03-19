'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import type { UserConfig, UserMode } from '@/lib/types';

const USER_MODES: { value: UserMode; title: string; description: string; icon: string }[] = [
  {
    value: 'fulltime-study',
    title: '全职学习',
    description: '我是全职学生，专注于学业提升',
    icon: '📚'
  },
  {
    value: 'career-growth',
    title: '职场进修',
    description: '我在工作之余，持续学习成长',
    icon: '💼'
  },
  {
    value: 'habit-building',
    title: '习惯养成',
    description: '我想培养一个长期的好习惯',
    icon: '🎯'
  },
];

export default function WelcomePage() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState<UserMode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    if (!selectedMode) return;

    setIsLoading(true);

    // 保存用户配置
    const userConfig: UserConfig = {
      onboardingStage: 'exploring',
      userMode: selectedMode,
      explorationData: [],
      customPureTarget: 0,
      constitutionStreak: 0,
      startDate: new Date().toISOString(),
    };

    storage.saveUserConfig(userConfig);

    // 跳转到探索期
    setTimeout(() => {
      router.push('/exploration');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            纯8+
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            纯时间哲学 · 长期目标追踪
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            记录纯时间，看见积累，找到属于自己的纯X目标
          </p>
        </div>

        {/* 选择模式 */}
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-200">
            选择你的模式
          </h2>
          {USER_MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => setSelectedMode(mode.value)}
              className={`w-full p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedMode === mode.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl">{mode.icon}</div>
                <div className="flex-1">
                  <div className="text-xl font-semibold mb-1 text-gray-800 dark:text-gray-200">
                    {mode.title}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {mode.description}
                  </div>
                </div>
                {selectedMode === mode.value && (
                  <div className="text-2xl text-primary-500">✓</div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* 开始按钮 */}
        <button
          onClick={handleStart}
          disabled={!selectedMode || isLoading}
          className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
            selectedMode && !isLoading
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              开始探索...
            </span>
          ) : (
            '开始 14 天探索期'
          )}
        </button>

        {/* 说明文字 */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          接下来的 14 天，记录你的专注时间<br />
          系统将基于真实数据为你推荐最适合的"纯X"目标
        </p>
      </div>
    </div>
  );
}
