'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import type { UserConfig, Goal } from '@/lib/types';

export default function ConstitutionPage() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [userConfig, setUserConfig] = useState<UserConfig | null>(null);
  const [goal, setGoal] = useState<Goal | null>(null);

  useEffect(() => {
    const config = storage.getUserConfig();
    const goalData = storage.getGoal();

    if (!config || config.onboardingStage !== 'confirmed') {
      router.push('/welcome');
      return;
    }

    setUserConfig(config);
    setGoal(goalData);
  }, [router]);

  const handleCommit = () => {
    if (!agreed || !userConfig || !goal) return;

    // 更新用户状态
    userConfig.onboardingStage = 'committed';
    userConfig.constitutionStreak = 0;
    storage.saveUserConfig(userConfig);

    // 跳转到主页面
    router.push('/dashboard');
  };

  if (!userConfig || !goal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-2xl mx-auto">
        {/* 头部 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 text-center">
          <div className="text-6xl mb-4">📜</div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-200">
            你的纯{goal.dailyPureTarget}宪法
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            承诺是坚持的第一步
          </p>
        </div>

        {/* 宪法内容 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6 border-4 border-amber-200 dark:border-amber-700">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{goal.icon}</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {goal.name}
            </h2>
            <div className="text-gray-600 dark:text-gray-400">
              每天 {goal.dailyPureTarget} 小时 · 目标 10000 小时
            </div>
          </div>

          <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p className="text-lg">
              我，在此郑重承诺：
            </p>

            <div className="bg-amber-50 dark:bg-gray-700 rounded-xl p-6 space-y-3">
              <p>✦ 每天投入至少 <strong className="text-amber-600 dark:text-amber-400">{goal.dailyPureTarget}小时</strong> 纯时间</p>
              <p>✦ 记录真实，不弄虚作假</p>
              <p>✦ 偶尔失败不气馁，第二天重新开始</p>
              <p>✦ 相信积累的力量，见证时间的复利</p>
            </div>

            <p className="text-center italic text-gray-600 dark:text-gray-400 mt-6">
              "不积跬步，无以至千里"
            </p>
          </div>
        </div>

        {/* 承诺选项 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-amber-600 border-2 border-gray-300 rounded focus:ring-amber-500"
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                我承诺遵守以上宪法
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                承诺后，你将开始你的纯{goal.dailyPureTarget}之旅
              </div>
            </div>
          </label>
        </div>

        {/* 开始按钮 */}
        <button
          onClick={handleCommit}
          disabled={!agreed}
          className={`w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all ${
            agreed
              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
          }`}
        >
          开始我的纯{goal.dailyPureTarget}之旅
        </button>

        {/* 提示 */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          💡 提示：连续达成天数将记录在你的成就中
        </p>
      </div>
    </div>
  );
}
