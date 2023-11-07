import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppStore {
  openAIAPIKey: string | null
  setOpenAIAPIKey: (key: string) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      openAIAPIKey: null,
      setOpenAIAPIKey: (key) => set({ openAIAPIKey: key }),
    }),
    {
      name: 'email-writing-exam-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
