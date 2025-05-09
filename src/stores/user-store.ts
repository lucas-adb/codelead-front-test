import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserStore = {
  username: string | null;
  setUsername: (username: string) => void;
}

const userStore = create(
  persist<UserStore>(
    (set) => ({
      username: null,
      setUsername: (username) => set({ username }),
    }),
    {
      name: 'username-codeleap',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default userStore;