import { useAppStore } from '../store';
import { useTranslation } from "react-i18next";
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function WelcomeBanner() {
  const { t } = useTranslation();

  const {
    setShowWelcomeBanner
  } = useAppStore();

  return (
    <div className='p-6 bg-amber-100 rounded-md relative'>
      <XMarkIcon
        onClick={() => { setShowWelcomeBanner(false) }}
        className="w-6 absolute right-2 top-2 cursor-pointer hover:opacity-70" />
      <p>
        { t("welcome_banner_copy") }
      </p>
    </div>
  )
}
