import { Fragment } from 'react';
import { useAppStore } from '../store';
import { useTranslation } from "react-i18next";
import { XMarkIcon } from '@heroicons/react/24/solid';
import Markdown from 'react-markdown';

export default function WelcomePopup() {
  const { t } = useTranslation();

  const {
    setShowWelcomePopup
  } = useAppStore();

  const stripIndent = (str: string): string => {
    try {
      return str.split("\n").map(l => l.trim()).join('\n')
    } catch {
      return str
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30">
      <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-40 opacity-50"></div>
      <div className='p-6 bg-amber-100 rounded-md relative opacity-100 z-50'>
        <XMarkIcon
          onClick={() => { setShowWelcomePopup(false) }}
          className="w-6 absolute right-2 top-2 cursor-pointer hover:opacity-70" />
        <Markdown>
        {stripIndent(`## Timer

        **bold**

          :sunny:
        `)}
        </Markdown>
        <p>
          { t("welcome_banner_copy") }
        </p>
      </div>
    </div>
  )
}
