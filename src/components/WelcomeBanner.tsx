import { useAppStore } from '../store';
import { XMarkIcon } from '@heroicons/react/24/solid';
import Markdownify from './Markdownify';

export default function WelcomeBanner() {
  const {
    welcomeBannerCopy,
    setShowWelcomeBanner
  } = useAppStore();


  return (
    <div className='p-6 bg-gradient-to-r from-yellow-50 to-sky-100 rounded-md relative'>
      <XMarkIcon
        onClick={() => { setShowWelcomeBanner(false) }}
        className="w-8 absolute right-2 top-2 cursor-pointer hover:opacity-70 hover:scale-105" />
      <Markdownify>
        { welcomeBannerCopy }
      </Markdownify>
    </div>
  )
}
