import { useAppStore } from '../store';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useTranslation } from "react-i18next";
import EmojiCountryCodes from '../data/interface';
import DropdownMenu from './DropdownMenu';
import { useEffect } from 'react';

export default function Settings() {
  const { t } = useTranslation()

  const {
    openAIAPIKey, setOpenAIAPIKey,
    settingsVisible, setSettingsVisible,
    userLanguage, setUserLanguage,
    emailLanguage, setEmailLanguage
  } = useAppStore();

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element

    if(target.closest(".js-settings-icon")) {
      return
    } else if (!target.closest(".js-settings")) {
      setSettingsVisible(false);
    }
  };

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSettingsVisible(false)
    }
  }

  useEffect(() => {
    if (settingsVisible) {
      document.addEventListener('keydown', handleEsc)
      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('keydown', handleEsc)
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [settingsVisible])

  return (
    <div
      className="fixed h-full top-0 right-0 bg-white w-1/3 z-30 pt-16 px-4 border-l-[1px] border-l-grey-300 shadow-xl js-settings">
      <XMarkIcon
        className="w-8 cursor-pointer absolute top-4 right-4 hover:opacity-70 hover:scale-105"
        onClick={ () => setSettingsVisible(false) } />

      <div className="mb-6">
        <label
          className="text-base font-medium mb-1 block">
          { t("open_ai_api_key") }
        </label>
        <input
          className='mt-2 appearance-none text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-md focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-gray-300'
          onChange={(e) => setOpenAIAPIKey(e.target.value) }
          value={openAIAPIKey}
          placeholder='sk-XXXXXXXXXX...'
          type="text" />
      </div>

      <div className="flex items-center mb-6">
        <div
          className="text-base font-medium mb-1 block mr-4">
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
          className="text-base font-medium mb-1 block mr-4">
          { t("i_learn") }
        </div>

        <div>
          <DropdownMenu
            excludeLanguage={emailLanguage}
            languageSelected={(language: keyof EmojiCountryCodes) => setEmailLanguage(language)} />
        </div>
      </div>

      <div className='absolute bottom-6 right-6 flex'>
        <a
          className="underline mr-6 font-medium"
          target="_blank" rel="noreferrer"
          href="https://github.com/makaroni4/lingo-email/issues">Feedback</a>
        <a
          className="underline flex items-center font-medium"
          target="_blank" rel="noreferrer"
          href="https://github.com/makaroni4/lingo-email">
          <img className="w-5 mr-2" src="./github.svg" alt="Github repo" />
          Source code
        </a>
      </div>
    </div>
  )
}
