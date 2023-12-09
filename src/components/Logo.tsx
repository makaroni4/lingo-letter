import { useAppStore } from "../store"

export default function Logo() {
  const { setShowWelcomePopup } = useAppStore()

  return (
    <div className="js-open-welcome-popup -rotate-12">
      <img
        className="block w-12 cursor-pointer"
        src="/lingo-email/logo.svg"
        alt="Email Simulator"
        onClick={() => {
          setShowWelcomePopup(true)
        }}
      />
    </div>
  )
}
