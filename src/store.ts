import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppStore {
  openAIAPIKey: string
  setOpenAIAPIKey: (key: string) => void
  letter: string
  setLetter: (key: string) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      openAIAPIKey: "",
      setOpenAIAPIKey: (key) => set({ openAIAPIKey: key }),
      letter: "",
      setLetter: (text) => set({ letter: text }),
    }),
    {
      name: 'email-writing-exam-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
