'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import type { UserConfig } from '@/lib/types';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 检查用户引导阶段
    const userConfig = storage.getUserConfig();

    if (!userConfig) {
      // 新用户，跳转到欢迎页
      router.push('/welcome');
    } else {
      // 根据阶段跳转
      switch (userConfig.onboardingStage) {
        case 'new':
          router.push('/welcome');
          break;
        case 'exploring':
          router.push('/exploration');
          break;
        case 'confirmed':
          router.push('/set-target');
          break;
        case 'committed':
          router.push('/dashboard');
          break;
      }
    }
  }, [router]);

  // 加载中显示
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">加载中...</p>
      </div>
    </div>
  );
}
