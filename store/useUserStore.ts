import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
  session: Session | null
  setSession: (session: Session | null) => void

  isLoggedIn: boolean
  setIsLoggedIn: (isLoggedIn: boolean) => void | null
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      session: null,
      isLoggedIn: false,
      setUser: (user: User | null) => set({ user }),
      setSession: (session: Session | null) => set({ session }),
      setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
