import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import EmojiCountryCodes from './data/interface';

export interface TopicVerifications {
  [key: string]: {
    grade: number
    comment: string
  }
}

interface AppStore {
  openAIAPIKey: string | undefined
  setOpenAIAPIKey: (key: string | undefined) => void
  userLanguage: keyof EmojiCountryCodes
  setUserLanguage: (key: keyof EmojiCountryCodes) => void
  emailLanguage: keyof EmojiCountryCodes
  setEmailLanguage: (key: keyof EmojiCountryCodes) => void
  settingsVisible: boolean
  setSettingsVisible: (key: boolean) => void
  letter: string
  setLetter: (key: string) => void
  incomingEmail: string
  setIncomingEmail: (key: string) => void
  responseTopics: string[]
  setResponseTopics: (key: string[]) => void
  originalSentences: string[]
  setOriginalSentences: (key: string[]) => void
  verifiedSentences: string[]
  setVerifiedSentences: (key: string[]) => void
  showWelcomeBanner: boolean,
  setShowWelcomeBanner: (key: boolean) => void,
  showWelcomePopup: boolean,
  setShowWelcomePopup: (key: boolean) => void,
  welcomeBannerCopy: string,
  setWelcomeBannerCopy: (key: string) => void,
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      openAIAPIKey: "",
      setOpenAIAPIKey: (key) => set({ openAIAPIKey: key }),
      userLanguage: "en",
      setUserLanguage: (key) => set({ userLanguage: key }),
      emailLanguage: "de",
      setEmailLanguage: (key) => set({ emailLanguage: key }),
      settingsVisible: false,
      setSettingsVisible: (key) => set({ settingsVisible: key }),
      letter: "",
      setLetter: (text) => set({ letter: text }),
      incomingEmail: "",
      setIncomingEmail: (text) => set({ incomingEmail: text }),
      responseTopics: [],
      setResponseTopics: (arr) => set({ responseTopics: arr }),
      originalSentences: [],
      setOriginalSentences: (key) => set({ originalSentences: key }),
      verifiedSentences: [],
      setVerifiedSentences: (key) => set({ verifiedSentences: key }),
      showWelcomeBanner: true,
      setShowWelcomeBanner: (val) => set({ showWelcomeBanner: val }),
      showWelcomePopup: false,
      setShowWelcomePopup: (val) => set({ showWelcomePopup: val }),
      welcomeBannerCopy: "",
      setWelcomeBannerCopy: (key) => set({ welcomeBannerCopy: key }),
    }),
    {
      name: 'email-writing-exam-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
