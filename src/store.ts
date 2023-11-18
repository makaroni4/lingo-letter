import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppStore {
  openAIAPIKey: string
  setOpenAIAPIKey: (key: string) => void
  letter: string
  setLetter: (key: string) => void
  incomingEmail: string
  setIncomingEmail: (key: string) => void,
  responseTopics: string[],
  setResponseTopics: (key: string[]) => void,

}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      openAIAPIKey: "",
      setOpenAIAPIKey: (key) => set({ openAIAPIKey: key }),
      letter: "",
      setLetter: (text) => set({ letter: text }),
      incomingEmail: "",
      setIncomingEmail: (text) => set({ incomingEmail: text }),
      responseTopics: [],
      setResponseTopics: (arr) => set({ responseTopics: arr }),
    }),
    {
      name: 'email-writing-exam-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
