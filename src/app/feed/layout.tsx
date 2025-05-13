'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import userStore from '@/stores/user-store';

function FeedLayout({ children }: { children: React.ReactNode }) {
  const { user } = userStore();

  useEffect(() => {
    if (!user) {
      redirect('/');
    }
  }, [user]);

  return (
    <div className="max-w-3xl w-full mx-auto min-h-screen flex flex-col">
      <header className="bg-codeleap-blue h-20 px-6 flex items-center justify-between">
        <h1 className="text-background font-bold text-2xl">
          CodeLeap Network
        </h1>
      </header>
      <main className="flex-1 min-h-0 flex flex-col">
        <div className="bg-background p-6 flex-1">{children}</div>
      </main>
    </div>
  );
}

export default FeedLayout;
