import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Twemoji from './Twemoji';
import { useTranslation } from "react-i18next";
import LanguageMenu from './LanguageMenu';
import EmojiCountryCodes from '../data/interface';
import DropdownMenu from './DropdownMenu';

export default function Settings() {
  const { t, i18n } = useTranslation();

  const [userLanguageMenuVisible, setUserLanguageMenuVisible] = useState(false)
  const [emailLanguageMenuVisible, setEmailLanguageMenuVisible] = useState(false)

  const {
    openAIAPIKey, setOpenAIAPIKey,
    setSettingsVisible,
    userLanguage, setUserLanguage,
    emailLanguage, setEmailLanguage
  } = useAppStore();

  return (
    <div className="fixed h-full top-0 right-0 bg-white w-1/3 z-30 pt-16 px-4 border-l-4 border-indigo-500">
      <XMarkIcon
        className="w-8 cursor-pointer absolute top-4 right-4 hover:opacity-70"
        onClick={ () => setSettingsVisible(false) } />

      <div className="mb-6">
        <label
          htmlFor=""
          className="font-bold mb-1 block">
          { t("open_ai_api_key") }
        </label>
        <input
          className='w-full rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700'
          onChange={(e) => setOpenAIAPIKey(e.target.value) }
          value={openAIAPIKey}
          placeholder='sk-XXXXXXXXXX...'
          type="text" />
      </div>

      <div className="flex items-center mb-6">
        <div
          className="font-bold mb-1 block mr-4">
          { t("i_know") }
        </div>

        <div>
          <DropdownMenu
            excludeLanguage={userLanguage}
            languageSelected={(language: keyof EmojiCountryCodes) => setUserLanguage(language)} />
        </div>
      </div>

      <div className="flex items-center">
        <div
          className="font-bold mb-1 block mr-4">
          { t("i_learn") }
        </div>

        <div>
          <DropdownMenu
            excludeLanguage={emailLanguage}
            languageSelected={(language: keyof EmojiCountryCodes) => setEmailLanguage(language)} />
        </div>
      </div>
    </div>
  )
}
