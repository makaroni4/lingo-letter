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
    }
  }

  return (
    <nav className="flex items-center justify-between	p-12 pt-8">
      <div>
        <Logo />
      </div>

      <div className="flex items-center">
        <Button
          className="mr-8"
          onClick={handleRestart}>
          { incomingEmail ? t("reset_exam") : t("start_exam") }
        </Button>

        { !settingsVisible && (
          <Cog6ToothIcon
            className="w-8 cursor-pointer hover:opacity-70"
            onClick={() => setSettingsVisible(true) } />
        )}
      </div>
    </nav>
  )
}
