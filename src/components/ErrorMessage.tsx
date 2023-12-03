import { useAppStore } from '../store';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ErrorMessage() {
  const {
    errorMessage,
    setShowErrorMessage
  } = useAppStore();

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-start justify-center z-40 overflow-scroll md:overflow-auto md:items-center">
      <div className="absolute top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50 opacity-50"></div>
      <div className="container md:p-12">
        <div className="p-6 bg-gradient-to-r from-red-50 to-orange-100 rounded-md relative opacity-100 z-50">
          <XMarkIcon
            onClick={() => { setShowErrorMessage(false) }}
            className="w-8 absolute right-2 top-2 cursor-pointer hover:opacity-70 hover:scale-105" />
          <span className="text-xl font-bold">
          { errorMessage }
          </span>
        </div>
      </div>
    </div>
  )
}
