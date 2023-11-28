import { useAppStore } from '../store';
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useTranslation } from "react-i18next";
import EmojiCountryCodes from '../data/interface';
import DropdownMenu from './DropdownMenu';

export default function Settings() {
  const { t } = useTranslation();

  const {
    openAIAPIKey, setOpenAIAPIKey,
    setSettingsVisible,
    userLanguage, setUserLanguage,
    emailLanguage, setEmailLanguage
  } = useAppStore();

  return (
    <div className="fixed h-full top-0 right-0 bg-white w-1/3 z-30 pt-16 px-4 border-l-[1px] border-l-grey-300 shadow-xl">
      <XMarkIcon
        className="w-8 cursor-pointer absolute top-4 right-4 hover:opacity-70 hover:scale-105"
        onClick={ () => setSettingsVisible(false) } />

      <div className="mb-6">
        <label
          className="text-base font-bold mb-1 block">
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
          className="text-base font-bold mb-1 block mr-4">
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
          className="text-base font-bold mb-1 block mr-4">
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
