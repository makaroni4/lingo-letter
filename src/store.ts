import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import EmojiCountryCodes from "./data/interface"
import i18next from "./i18n"

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
  showExampleExamBadge: boolean,
  setShowExampleExamBadge: (key: boolean) => void,
  errorMessage: string,
  setErrorMessage: (key: string) => void,
  showErrorMessage: boolean,
  setShowErrorMessage: (key: boolean) => void,
  generatingExam: boolean,
  setGeneratingExam: (key: boolean) => void,
  processingSubmission: boolean,
  setProcessingSubmission: (key: boolean) => void,
}

const defaultLetter = i18next.t("example_letter", { lng: "de" })
const defaultIncomingEmail = i18next.t("example_email", { lng: "de" })
const defaultOriginalSentences: string[] = i18next.t("example_original_sentences", { lng: "de", returnObjects: true })
const defaultVerifiedSentences: string[] = i18next.t("example_verified_sentences", { lng: "de", returnObjects: true })

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
      letter: defaultLetter,
      setLetter: (text) => set({ letter: text }),
      incomingEmail: defaultIncomingEmail,
      setIncomingEmail: (text) => set({ incomingEmail: text }),
      responseTopics: ["Urlaubspläne", "Reiseziel", "Urlaub von Sophie"],
      setResponseTopics: (arr) => set({ responseTopics: arr }),
      originalSentences: defaultOriginalSentences,
      setOriginalSentences: (key) => set({ originalSentences: key }),
      verifiedSentences: defaultVerifiedSentences,
      setVerifiedSentences: (key) => set({ verifiedSentences: key }),
      showWelcomeBanner: true,
      setShowWelcomeBanner: (val) => set({ showWelcomeBanner: val }),
      showWelcomePopup: false,
      setShowWelcomePopup: (val) => set({ showWelcomePopup: val }),
      welcomeBannerCopy: "",
      setWelcomeBannerCopy: (key) => set({ welcomeBannerCopy: key }),
      showExampleExamBadge: true,
      setShowExampleExamBadge: (key) => set({ showExampleExamBadge: key }),
      errorMessage: "",
      setErrorMessage: (key) => set({ errorMessage: key }),
      showErrorMessage: false,
      setShowErrorMessage: (key) => set({ showErrorMessage: key }),
      generatingExam: false,
      setGeneratingExam: (key) => set({ generatingExam: key }),
      processingSubmission: false,
      setProcessingSubmission: (key) => set({ processingSubmission: key }),
    }),
    {
      name: "email-writing-exam-storage",
      storage: createJSONStorage(() => localStorage)
    }
  )
)
