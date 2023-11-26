import { Fragment } from 'react';
import { useAppStore } from '../store';
import { useTranslation } from "react-i18next";
import { XMarkIcon } from '@heroicons/react/24/solid';
import Markdown from 'react-markdown';
import twemoji from "twemoji";
import rehypeRaw from 'rehype-raw';

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

  const twemojify = (str: string): string => {
    const htmlWithEmojis = twemoji.parse(str, {
      folder: 'svg',
      ext: '.svg'
    });

    return htmlWithEmojis
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30">
      <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-40 opacity-50"></div>
      <div className='p-6 bg-amber-100 rounded-md relative opacity-100 z-50'>
        <XMarkIcon
          onClick={() => { setShowWelcomePopup(false) }}
          className="w-6 absolute right-2 top-2 cursor-pointer hover:opacity-70" />
        <Markdown rehypePlugins={[rehypeRaw]}>
        {twemojify(stripIndent(`## Timer

        **bold**

          ${t("welcome_banner_copy")}
        `))}
        </Markdown>
      </div>
    </div>
  )
}
