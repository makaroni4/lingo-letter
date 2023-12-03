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
  showExampleExamBadge: boolean,
  setShowExampleExamBadge: (key: boolean) => void,
  errorMessage: string,
  setErrorMessage: (key: string) => void,
  showErrorMessage: boolean,
  setShowErrorMessage: (key: boolean) => void,
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
      letter: "Lieber Marta, vielen Dank für deinen E-Mail! Es geht mich wirklich gut. Ich habe mich total darüber gefreut, von dir zu hören. Dein Angebot für eines gemeinsamen Urlaub in Spanien clingt wirklich fantastisch! Ich mag der Idee eine Woche am Strand zu verbringen. Die Hotels, die du gefunden hast, hören sich auch toll an. Ich habe, in Moment keinen konkreten Planen für meines Urlaub gemacht, also bin ich definitiv interessert! Ich denke Spanien ist eine großartige Idee aber ich bin auch offen für andere Vorschläge. Fielleicht könnten wir gemeinsam überlegen, wohin es gehen könnte. Lass mich wissen, was du denken! Liebe Grüße, Sophie",
      setLetter: (text) => set({ letter: text }),
      incomingEmail: "Liebe Sophie,\n\nich hoffe es geht dir gut! Lange haben wir uns nicht mehr geschrieben, deshalb wollte ich dir mal wieder eine E-Mail schicken. Ich bin gerade dabei, meinen nächsten Urlaub zu planen und wollte dich fragen, ob du Lust hast mitzukommen?! 😄🏖️\n\nIch habe mir überlegt, dass wir nach Spanien fliegen könnten. Wie wäre es mit einer Woche am Strand? Ich habe schon ein paar tolle Hotels gefunden, die nicht zu teuer sind. Was denkst du dazu? Hast du vielleicht andere Vorschläge für unser Reiseziel?\n\nUnd wie sieht es eigentlich bei dir mit deinem Urlaub aus? Hast du schon Pläne gemacht?\n\nLiebe Grüße,\nMarta",
      setIncomingEmail: (text) => set({ incomingEmail: text }),
      responseTopics: ["Urlaubspläne", "Reiseziel", "Urlaub von Sophie"],
      setResponseTopics: (arr) => set({ responseTopics: arr }),
      originalSentences: [
        "Lieber Marta, vielen Dank für deinen E-Mail!",
        "Es geht mich wirklich gut.",
        "Ich habe mich total darüber gefreut, von dir zu hören.",
        "Dein Angebot für eines gemeinsamen Urlaub in Spanien clingt wirklich fantastisch!",
        "Ich mag der Idee eine Woche am Strand zu verbringen.",
        "Die Hotels, die du gefunden hast, hören sich auch toll an.",
        "Ich habe, in Moment keinen konkreten Planen für meines Urlaub gemacht, also bin ich definitiv interessert!",
        "Ich denke Spanien ist eine großartige Idee aber ich bin auch offen für andere Vorschläge.",
        "Fielleicht könnten wir gemeinsam überlegen, wohin es gehen könnte.",
        "Lass mich wissen, was du denken!",
        "Liebe Grüße, Sophie\n\n\n\n"
      ],
      setOriginalSentences: (key) => set({ originalSentences: key }),
      verifiedSentences: [
        "Lieber Marta, vielen Dank für deine E-Mail!",
        "Es geht mir wirklich gut.",
        "Ich habe mich total darüber gefreut, von dir zu hören.",
        "Dein Angebot für einen gemeinsamen Urlaub in Spanien klingt wirklich fantastisch!",
        "Ich mag die Idee, eine Woche am Strand zu verbringen.",
        "Die Hotels, die du gefunden hast, hören sich auch toll an.",
        "Ich habe im Moment keine konkreten Pläne für meinen Urlaub gemacht, also bin ich definitiv interessiert!",
        "Ich denke, Spanien ist eine großartige Idee, aber ich bin auch offen für andere Vorschläge.",
        "Vielleicht könnten wir gemeinsam überlegen, wohin es gehen könnte.",
        "Lass mich wissen, was du denkst!",
        "Liebe Grüße, Sophie"
      ],
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
    }),
    {
      name: 'email-writing-exam-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
