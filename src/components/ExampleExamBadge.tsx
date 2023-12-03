import { useTranslation } from "react-i18next";

export default function ExampleExamBadge() {
  const { t } = useTranslation();
  return (
    <div className="py-4 px-8 text-lg font-bold uppercase tracking-widest bg-yellow-200	rounded-md">
      { t("example") }
    </div>
  )
}
