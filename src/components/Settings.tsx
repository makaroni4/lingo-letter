import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import Twemoji from './Twemoji';
import { useTranslation } from "react-i18next";

export default function Settings() {
  const { t } = useTranslation();

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
          Open AI API Key
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
          I know { t(`languages.${userLanguage}`) }
        </div>
        <div className="flex items-center p-1 border-[1px] border-slate-200 rounded-md cursor-pointer">
          <Twemoji
            className="mr-3"
            countryCode={userLanguage} />

          <ChevronDownIcon className='w-4 '/>
        </div>
      </div>

      <div className="flex items-center">
        <div
          className="font-bold mb-1 block mr-4">
          I learn { t(`languages.${emailLanguage}`) }
        </div>

        <div className="flex items-center p-1 border-[1px] border-slate-200 rounded-md cursor-pointer">
          <Twemoji
            className="mr-3"
            countryCode={emailLanguage} />
          <ChevronDownIcon className='w-4 '/>
        </div>
      </div>
    </div>
  )
}
