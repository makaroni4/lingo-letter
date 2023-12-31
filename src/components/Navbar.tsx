import { useAppStore } from "../store"
import { useEffect, useState } from "react"
import { Cog6ToothIcon } from "@heroicons/react/24/solid"
import { generateIncomingEmail } from "../utils/generate-incoming-email"
import { useTranslation } from "react-i18next"
import Button from "./Button"
import Logo from "./Logo"

export default function Navbar() {
  const { t } = useTranslation()
  const HALF_AN_HOUR = 30 * 60 // seconds
  const [timerIsOn, setTimerIsOn] = useState(false)
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(HALF_AN_HOUR)

  const {
    openAIAPIKey,
    setLetter,
    incomingEmail,
    setIncomingEmail,
    setResponseTopics,
    settingsVisible,
    setSettingsVisible,
    setOriginalSentences,
    setVerifiedSentences,
    emailLanguage,
    showExampleExamBadge,
    setShowExampleExamBadge,
    setErrorMessage,
    setShowErrorMessage,
    generatingExam,
    setGeneratingExam,
    setShowWelcomeBanner
  } = useAppStore()

  useEffect(() => {
    let timerId: number

    if (timerIsOn && timerSecondsLeft > 0) {
      timerId = window.setInterval(() => {
        setTimerSecondsLeft((prevTime) => prevTime - 1)
      }, 1000)
    }

    return () => {
      window.clearInterval(timerId)
    }
  }, [timerIsOn, timerSecondsLeft])

  const timeInMinutes = (seconds: number): number => {
    const minutes = Math.ceil(seconds / 60)

    return minutes
  }

  const handleRestart = async () => {
    const result = showExampleExamBadge ? true : window.confirm(t("restart_alert_question"))

    if (!openAIAPIKey) {
      alert(t("set_api_key"))
      return
    }

    if (result) {
      setLetter("")
      setOriginalSentences([])
      setVerifiedSentences([])
      setIncomingEmail("")
      setResponseTopics([])
      setShowExampleExamBadge(false)
      setTimerIsOn(false)

      try {
        setGeneratingExam(true)

        const { email, topics } = await generateIncomingEmail({
          apiKey: openAIAPIKey,
          emailLanguage: t(`languages.${emailLanguage}`)
        })

        setIncomingEmail(email)
        setResponseTopics(topics)

        setTimerSecondsLeft(HALF_AN_HOUR)
        setTimerIsOn(true)
        setShowWelcomeBanner(false)
      } catch (error) {
        setErrorMessage(t("cant_generate_exam"))
        setShowErrorMessage(true)
      } finally {
        setGeneratingExam(false)
      }
    }
  }

  const startCTACopy = () => {
    if (generatingExam) {
      return t("starting_exam")
    }

    if (showExampleExamBadge) {
      return t("start_exam")
    }

    return t("reset_exam")
  }

  return (
    <nav className="container px-4 py-8 flex items-center justify-between">
      <div>
        <Logo />
      </div>

      <div className="flex items-center">
        {timerIsOn && (
          <div className="mr-8">
            {timeInMinutes(timerSecondsLeft)}{" "}
            {t("minuteWithCount", { count: timeInMinutes(timerSecondsLeft) })}
          </div>
        )}

        <div className="relative tooltip-wrapper mr-8">
          <Button
            className="js-start-exam"
            onClick={handleRestart}
            disabled={generatingExam || !openAIAPIKey}
          >
            {startCTACopy()}
          </Button>

          {!openAIAPIKey && (
            <div className="tooltip absolute z-10 inline-block px-3 py-2 text-sm font-medium  bg-yellow-300	rounded-lg shadow-sm -bottom-1 left-1/2 translate-y-full -translate-x-1/2 whitespace-nowrap">
              {t("set_api_key")}
              <div className="tooltip-arrow border-[4px] border-solid border-transparent border-t-0 border-b-yellow-300"></div>
            </div>
          )}
        </div>

        <a
          href="https://github.com/makaroni4/email_simulator"
          target="_blank"
          rel="noreferrer"
        >
          <img className="w-7 mr-8" src="/lingo-letter/github.svg" alt="Github repo" />
        </a>
        {!settingsVisible && (
          <Cog6ToothIcon
            className="w-8 cursor-pointer hover:opacity-70 js-settings-icon"
            onClick={() => setSettingsVisible(true)}
          />
        )}
      </div>
    </nav>
  )
}
