import { useAppStore } from "./store"
import { useEffect } from "react"
import { splitIntoSentences } from "./utils/split-into-sentences"
import Settings from "./components/Settings"
import Navbar from "./components/Navbar"
import { verifyEmailSubmission } from "./utils/verify-email-submission"
import { useTranslation } from "react-i18next"
import WelcomeBanner from "./components/WelcomeBanner"
import Footer from "./components/Footer"
import Button from "./components/Button"
import WelcomePopup from "./components/WelcomePopup"
import TextareaAutosize from "react-textarea-autosize"
import VerifiedSubmission from "./components/VerifiedSubmission"
import Assignment from "./components/Assignment"
import ExampleExamBadge from "./components/ExampleExamBadge"
import ErrorMessage from "./components/ErrorMessage"

function App() {
  const { t, i18n } = useTranslation()

  const {
    openAIAPIKey,
    letter,
    setLetter,
    settingsVisible,
    setSettingsVisible,
    setOriginalSentences,
    setVerifiedSentences,
    setWelcomeBannerCopy,
    userLanguage,
    emailLanguage,
    showWelcomeBanner,
    showWelcomePopup,
    showExampleExamBadge,
    errorMessage,
    showErrorMessage,
    generatingExam,
    processingSubmission,
    setProcessingSubmission,
    setShowWelcomePopup
  } = useAppStore()

  const handleFormSubmit = async () => {
    if (!letter) {
      console.log("--> empty handleFormSubmit")
      return
    }

    setProcessingSubmission(true)

    setOriginalSentences([])
    setVerifiedSentences([])

    setOriginalSentences(splitIntoSentences(letter))

    verifyEmailSubmission({
      apiKey: openAIAPIKey,
      letter,
      emailLanguage: t(`languages.${emailLanguage}`)
    })
      .then((verifiedEmail) => {
        const fixedSentences = splitIntoSentences(verifiedEmail as string)
        setVerifiedSentences(fixedSentences)
      })
      .finally(() => {
        setProcessingSubmission(false)
      })
  }

  useEffect(() => {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLAnchorElement
      const hash = target.hash

      if (hash === "#settings") {
        event.preventDefault()
        setShowWelcomePopup(false)
        setSettingsVisible(true)
      }
    })

    i18n.changeLanguage(userLanguage)
  }, [])

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/lingo-letter/i18n/welcome_banner/${userLanguage}.md`)
        const markdown = await response.text()

        setWelcomeBannerCopy(markdown)
      } catch (error) {
        console.error("Error loading translations", error)
      }
    }

    loadTranslations()
  }, [userLanguage])

  const submitButtonDisabled = () => {
    if (!letter) {
      return true
    }

    return generatingExam || processingSubmission || !openAIAPIKey
  }
  return (
    <div className="px-2 md:px-8 overflow-x-hidden">
      {settingsVisible && <Settings />}

      {showWelcomePopup && <WelcomePopup />}

      {errorMessage && showErrorMessage && <ErrorMessage />}

      <Navbar />

      <div className="container px-4 pb-24">
        {showWelcomeBanner && (
          <div className="mb-12">
            <WelcomeBanner />
          </div>
        )}

        <Assignment />

        <div className="relative mb-12">
          {showExampleExamBadge && (
            <div className="absolute top-4 -right-8 rotate-[30deg]">
              <ExampleExamBadge />
            </div>
          )}

          <TextareaAutosize
            className="mb-3 p-4 text-lg w-full shadow-sm leading-10 focus:outline-none focus:ring-2 focus:ring-sky-500 ring-1 ring-gray-300 rounded-md font-serif"
            value={letter}
            minRows={8}
            onChange={(e) => setLetter(e.target.value)}
          />

          <div className="flex justify-end">
            <div className="relative tooltip-wrapper">
              <Button
                className="px-8 py-4 text-xl"
                disabled={submitButtonDisabled()}
                onClick={handleFormSubmit}
              >
                {processingSubmission ? t("processing_submission") : t("submit")}
              </Button>

              {!openAIAPIKey && (
                <div className="tooltip absolute z-10 inline-block px-3 py-2 text-sm font-medium  bg-yellow-300	rounded-lg shadow-sm -bottom-1 left-1/2 translate-y-full -translate-x-1/2	 whitespace-nowrap">
                  {t("set_api_key")}
                  <div className="tooltip-arrow border-[4px] border-solid border-transparent border-t-0 border-b-yellow-300"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          {showExampleExamBadge && (
            <div className="absolute top-12 -right-4 rotate-[30deg]">
              <ExampleExamBadge />
            </div>
          )}

          <VerifiedSubmission />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
