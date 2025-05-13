'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import userStore from '@/stores/user-store';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { setUser } = userStore();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session?.user) {
          setUser(session.user);
          router.push('/feed');
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error:', error);
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router, setUser]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Redirecting...</p>
    </div>
  );
}
