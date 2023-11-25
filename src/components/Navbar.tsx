import { useAppStore } from '../store';
import { useEffect, useState } from 'react';
import Twemoji from './Twemoji';
import { Cog6ToothIcon } from '@heroicons/react/24/solid'
import { generateIncomingEmail } from '../utils/generate-incoming-email';
import { useTranslation } from "react-i18next";

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
    const result = window.confirm("Are you sure you want to clear your text?");

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
    <nav className="flex items-center justify-end	p-8">
      <button
        className="py-2 px-4 bg-indigo-500 text-white rounded-md mr-8"
        onClick={handleRestart}>{ t("reset_exam") }</button>

      { !settingsVisible && (
        <Cog6ToothIcon
          className="w-8 cursor-pointer"
          onClick={() => setSettingsVisible(true) } />
      )}
    </nav>
  )
}
