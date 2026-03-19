'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import type { UserConfig, Goal } from '@/lib/types';
import { generateId } from '@/lib/utils';

export default function SetTargetPage() {
  const router = useRouter();
  const [recommendedPure, setRecommendedPure] = useState(4);
  const [customPure, setCustomPure] = useState(4);
  const [goalName, setGoalName] = useState('');
  const [goalIcon, setGoalIcon] = useState('📚');

  useEffect(() => {
    const userConfig = storage.getUserConfig();
    if (!userConfig || userConfig.onboardingStage !== 'confirmed') {
      router.push('/welcome');
      return;
    }

    // 计算推荐纯X
    if (userConfig.explorationData.length > 0) {
      const avgHours = userConfig.explorationData.reduce((sum, d) => sum + d.hours, 0) / userConfig.explorationData.length;
      // 向下取整到最近的整数
      const pure = Math.max(1, Math.floor(avgHours));
      setRecommendedPure(pure);
      setCustomPure(pure);
    }

    // 根据用户模式设置默认目标
    const modeGoals: Record<string, { name: string; icon: string }> = {
      'fulltime-study': { name: '学业提升', icon: '📚' },
      'career-growth': { name: '职业成长', icon: '💼' },
      'habit-building': { name: '习惯养成', icon: '🎯' },
    };

    const defaultGoal = modeGoals[userConfig.userMode] || modeGoals['fulltime-study'];
    setGoalName(defaultGoal.name);
    setGoalIcon(defaultGoal.icon);
  }, [router]);

  const handleConfirm = () => {
    const userConfig = storage.getUserConfig();
    if (!userConfig) return;

    // 更新用户配置
    userConfig.customPureTarget = customPure;

    // 创建目标
    const goal: Goal = {
      id: generateId(),
      name: goalName,
      icon: goalIcon,
      targetHours: 10000,
      currentHours: 0,
      dailyPureTarget: customPure,
      createdAt: new Date().toISOString(),
    };

    storage.saveUserConfig(userConfig);
    storage.saveGoal(goal);

    // 跳转到承诺页面
    router.push('/constitution');
  };

  const iconOptions = ['📚', '💼', '🎯', '💪', '🎨', '🎵', '💻', '📝', '🔬', '🏃', '🧘', '✍️'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            设定你的纯X目标
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            基于你 14 天的探索数据，我们为你推荐了最适合的目标
          </p>
        </div>

        {/* 推荐纯X */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              你的纯{recommendedPure}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              根据你的记录，平均每天专注 {recommendedPure} 小时
            </p>
          </div>

          {/* 调整纯X */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              调整你的纯X（{customPure}小时/天）
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={customPure}
              onChange={(e) => setCustomPure(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1小时</span>
              <span>12小时</span>
            </div>
          </div>

          {/* 目标名称 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              目标名称
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              placeholder="例如：学习编程、练钢琴、健身..."
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 选择图标 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              选择图标
            </label>
            <div className="grid grid-cols-6 gap-3">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setGoalIcon(icon)}
                  className={`p-3 rounded-xl text-3xl transition-all ${
                    goalIcon === icon
                      ? 'bg-purple-500 text-white scale-110 shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* 预览 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
            <div className="text-center">
              <div className="text-5xl mb-3">{goalIcon}</div>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                {goalName || '我的目标'}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                每天 {customPure} 小时 · 目标 10000 小时
              </div>
            </div>
          </div>

          {/* 确认按钮 */}
          <button
            onClick={handleConfirm}
            disabled={!goalName.trim()}
            className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all ${
              goalName.trim()
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            确认目标
          </button>
        </div>

        {/* 说明 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
            💡 什么是"纯X"？
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            "纯X"是你每天专注投入的纯粹时间。比如纯4意味着每天专注4小时。
            经过10000小时的积累，你将在任何领域达到专家水平。
            <br /><br />
            这个数字不是越大越好，而是要符合你的实际情况。
            能够持续坚持的，才是最好的目标。
          </p>
        </div>
      </div>
    </div>
  );
}
