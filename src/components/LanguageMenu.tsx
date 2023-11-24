import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Twemoji from './Twemoji';
import { useTranslation } from "react-i18next";
import EmojiCountryCodes from '../data/interface';

export default function LanguageMenu({ excludeLanguage, languageSelected }: { excludeLanguage: string, languageSelected: (language: keyof EmojiCountryCodes) => void }) {
  const { t } = useTranslation();

  const {
    openAIAPIKey, setOpenAIAPIKey,
    setSettingsVisible,
    userLanguage, setUserLanguage,
    emailLanguage, setEmailLanguage
  } = useAppStore();

  return (
    <div>
      { Object.keys(t("languages", { returnObjects: true })).filter(l => l !== excludeLanguage).map(languageCode => (
        <div>
          <Twemoji
            className="mb-3"
            countryCode={languageCode as keyof EmojiCountryCodes}
            onClick={() => { languageSelected(languageCode as keyof EmojiCountryCodes) }} />
        </div>
      )) }
    </div>
  )
}
