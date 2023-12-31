import { useTranslation } from "react-i18next"
import Markdownify from "./Markdownify"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="container px-4">
      <hr className="mb-4" />

      <div className="flex flex-col md:flex-row justify-between py-6 text-lg text-slate-600">
        <div className="mb-4 md:mb-0">
          <a
            className="flex mb-3 mr-4 underline"
            href="https://github.com/makaroni4/lingo-letter"
          >
            <img className="w-4 mr-2" src="/lingo-letter/github.svg" alt="Github repo" />
            {t("source_code")}
          </a>
          <a
            className="block underline"
            href="https://github.com/makaroni4/lingo-letter/issues"
          >
            {t("feedback")}
          </a>
        </div>

        <div>
          <Markdownify>{t("made_with_love")}</Markdownify>
        </div>
      </div>
    </footer>
  )
}
