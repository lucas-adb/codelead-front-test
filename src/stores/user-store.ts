import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@supabase/supabase-js';

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
}

const userStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-codeleap',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default userStore;