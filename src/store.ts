import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppStore {
  openAIAPIKey: string
  setOpenAIAPIKey: (key: string) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      openAIAPIKey: "",
      setOpenAIAPIKey: (key) => set({ openAIAPIKey: key }),
    }),
    {
      name: 'email-writing-exam-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
