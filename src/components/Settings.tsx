import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Twemoji from './Twemoji';
import { useTranslation } from "react-i18next";
import LanguageMenu from './LanguageMenu';
import EmojiCountryCodes from '../data/interface';

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
        className="w-8 cursor-pointer absolute top-4 right-4"
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
          placeholder='sk-K8x7I4PX2R8HHkEEehV3AZZ3TIhi1WAdZT7oRzxGbbtlasTZ'
          type="text" />
      </div>

      <div className="flex items-center mb-6">
        <div
          className="font-bold mb-1 block mr-4">
          { t("i_know") }
        </div>
        <div
          className="flex items-center p-1 border-[1px] border-slate-200 rounded-md cursor-pointer relative"
          onClick={ () => setUserLanguageMenuVisible(!userLanguageMenuVisible) }>
          <Twemoji
            className="mr-3"
            countryCode={userLanguage} />

          <ChevronDownIcon className='w-4 '/>

          { userLanguageMenuVisible && (
            <div
              className="absolute top-full left-0 flex items-center p-1 border-[1px] border-slate-200 rounded-md
              bg-white z-30 mt-[-4px] border-t-0">
              <LanguageMenu
                excludeLanguage={userLanguage}
                languageSelected={(language: keyof EmojiCountryCodes) => { setUserLanguage(language); i18n.changeLanguage(language); }} />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div
          className="font-bold mb-1 block mr-4">
          { t("i_learn") }
        </div>

        <div
          className="flex items-center p-1 border-[1px] border-slate-200 rounded-md cursor-pointer relative"
          onClick={ () => setEmailLanguageMenuVisible(!emailLanguageMenuVisible) }>
          <Twemoji
            className="mr-3"
            countryCode={emailLanguage} />
          <ChevronDownIcon className='w-4 '/>

          { emailLanguageMenuVisible && (
            <div className="absolute top-full left-0 flex items-center p-1 border-[1px] border-slate-200 rounded-md
            bg-white z-30 mt-[-4px] border-t-0">
              <LanguageMenu
                excludeLanguage={emailLanguage}
                languageSelected={(language: keyof EmojiCountryCodes) => setEmailLanguage(language)} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
