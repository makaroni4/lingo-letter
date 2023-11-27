import { useAppStore } from '../store';
import { useEffect, useState } from 'react';
import Twemoji from './Twemoji';
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { generateIncomingEmail } from '../utils/generate-incoming-email';
import { useTranslation } from "react-i18next";
import Button from './Button';
import Logo from './Logo';

export default function Navbar() {
  const { t } = useTranslation();
  const HALF_AN_HOUR = 30 * 60 // seconds
  const [timerIsOn, setTimerIsOn] = useState(false)
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(HALF_AN_HOUR)

  const {
    openAIAPIKey, setOpenAIAPIKey,
    letter, setLetter,
    incomingEmail, setIncomingEmail,
    responseTopics, setResponseTopics,
    settingsVisible, setSettingsVisible,
    originalSentences, setOriginalSentences,
    verifiedSentences, setVerifiedSentences,
    topicsVerification, setTopicsVerification,
    userLanguage,
    emailLanguage
  } = useAppStore();

  useEffect(() => {
    let timerId: number;

    if (timerIsOn && timerSecondsLeft > 0) {
      timerId = window.setInterval(() => {
        setTimerSecondsLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      window.clearInterval(timerId);
    };
  }, [timerIsOn, timerSecondsLeft]);

  const timeInMinutes = (seconds: number): number => {
    const minutes = Math.ceil(seconds / 60);

    return minutes;
  };

  const handleRestart = async () => {
    const result = incomingEmail ? window.confirm("Are you sure you want to clear your text?") : true;

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
      setTopicsVerification({})

      const { email, topics } = await generateIncomingEmail({
        apiKey: openAIAPIKey,
        emailLanguage: t(`languages.${emailLanguage}`)
      })

      setIncomingEmail(email)
      setResponseTopics(topics)

      setTimerSecondsLeft(HALF_AN_HOUR)
      setTimerIsOn(true)
    }
  }

  return (
    <nav className="flex items-center justify-between	p-12 pt-8">
      <div>
        <Logo />
      </div>

      <div className="flex items-center">
        { timerIsOn && (
          <div className='mr-8'>
            { timeInMinutes(timerSecondsLeft) } { t("minuteWithCount", { count: timeInMinutes(timerSecondsLeft) })}
          </div>
        )}
        <Button
          className="mr-8"
          onClick={handleRestart}
          disabled={ !openAIAPIKey }>
          { incomingEmail ? t("reset_exam") : t("start_exam") }
        </Button>

        <a href="https://github.com/makaroni4/email_simulator" target="_blank" rel="noreferrer">
          <img className="w-7 mr-8" src="./github.svg" alt="Github repo" />
        </a>
        { !settingsVisible && (
          <Cog6ToothIcon
            className="w-8 cursor-pointer hover:opacity-70"
            onClick={() => setSettingsVisible(true) } />
        )}
      </div>
    </nav>
  )
}
