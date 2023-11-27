import { useAppStore } from '../store';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Markdownify from './Markdownify';
import { useEffect, useState } from 'react';

export default function WelcomeBanner() {
  const [welcomeBannerCopy, setWelcomeBannerCopy] = useState("");

  const {
    setShowWelcomeBanner,
    userLanguage
  } = useAppStore();

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/i18n/welcome_banner/${userLanguage}.md`);
        const markdown = await response.text();

        setWelcomeBannerCopy(markdown);
      } catch (error) {
        console.error('Error loading translations', error);
      }
    };

    loadTranslations();
  }, [userLanguage]);

  return (
    <div className='p-6 bg-amber-100 rounded-md relative'>
      <XMarkIcon
        onClick={() => { setShowWelcomeBanner(false) }}
        className="w-6 absolute right-2 top-2 cursor-pointer hover:opacity-70" />
      <Markdownify>
        { welcomeBannerCopy }
      </Markdownify>
    </div>
  )
}
