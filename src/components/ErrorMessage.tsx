import { useAppStore } from "../store"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Markdownify from "./Markdownify"
import { useEffect } from "react"

export default function ErrorMessage() {
  const { errorMessage, setShowErrorMessage } = useAppStore()

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element

    if (target.closest(".js-start-exam")) {
      return
    } else if (!target.closest(".js-error-message")) {
      setShowErrorMessage(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-start justify-center z-40 overflow-scroll md:overflow-auto md:items-center">
      <div className="absolute top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-50 opacity-90"></div>
      <div className="container px-4 md:p-12">
        <div className="js-error-message p-8 bg-gradient-to-r from-red-50 to-orange-100 rounded-md relative opacity-100 z-50">
          <XMarkIcon
            onClick={() => {
              setShowErrorMessage(false)
            }}
            className="w-8 absolute right-2 top-2 cursor-pointer hover:opacity-70 hover:scale-105"
          />

          <div className="flex">
            <Markdownify className="mr-2 font-bold text-xl">💥</Markdownify>
            <span className="text-xl font-medium">{errorMessage}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
