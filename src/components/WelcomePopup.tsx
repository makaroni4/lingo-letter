import { useAppStore } from "../store"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Markdownify from "./Markdownify"
import { useEffect } from "react"

export default function WelcomePopup() {
  const { welcomeBannerCopy, showWelcomePopup, setShowWelcomePopup } = useAppStore()

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Element

    if (target.closest(".js-open-welcome-popup")) {
      return
    } else if (!target.closest(".js-welcome-popup")) {
      setShowWelcomePopup(false)
    }
  }

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setShowWelcomePopup(false)
    }
  }

  useEffect(() => {
    if (showWelcomePopup) {
      document.querySelector("body")?.classList.add("overflow-hidden")

      document.addEventListener("keydown", handleEsc)
      document.addEventListener("click", handleClickOutside)

      return () => {
        document.removeEventListener("keydown", handleEsc)
        document.removeEventListener("click", handleClickOutside)
        document.querySelector("body")?.classList.remove("overflow-hidden")
      }
    }
  }, [showWelcomePopup])

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-start justify-center z-30 md:overflow-auto md:items-start overflow-scroll md:scroll-auto">
      <div className="fixed top-0 left-0 w-screen h-screen bg-white flex items-center justify-center z-40 opacity-80"></div>
      <div className="js-welcome-popup container px-4 md:p-12 overflow-scroll">
        <div className="p-6 bg-gradient-to-r from-yellow-50 to-sky-100 rounded-md relative opacity-100 z-50">
          <XMarkIcon
            onClick={() => {
              setShowWelcomePopup(false)
            }}
            className="w-8 absolute right-2 top-2 cursor-pointer hover:opacity-70 hover:scale-105"
          />
          <Markdownify>{welcomeBannerCopy}</Markdownify>
        </div>
      </div>
    </div>
  )
}
