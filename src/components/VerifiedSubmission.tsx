import { useAppStore } from "../store"
import { useTranslation } from "react-i18next"
import diff from "fast-diff"

export default function VerifiedSubmission() {
  const { t } = useTranslation()

  const { originalSentences, verifiedSentences } = useAppStore()

  const highlightedOriginalSentence = (
    original: string,
    corrected: string
  ): { __html: string } => {
    const sentenceDiff = diff(original, corrected)
    const sentence = sentenceDiff
      .filter((d) => d[0] === 0 || d[0] === -1)
      .map((d) => {
        const className = d[1] !== "\n" && d[0] === -1 ? "bg-red-300 mistake-highlight" : ""
        return `<span class="${className}">${d[1].replace("\n", "<br>")}</span>`
      })
      .join("")

    return {
      __html: sentence
    }
  }

  const highlightedFixedSentence = (
    original: string,
    corrected: string
  ): { __html: string } => {
    const sentenceDiff = diff(original, corrected)
    const sentence = sentenceDiff
      .filter((d) => d[0] === 0 || d[0] === 1)
      .map((d) => {
        const className = d[0] === 1 ? "bg-red-300 mistake-highlight" : ""
        return `<span class="${className}">${d[1].replace("\n", "<br>")}</span>`
      })
      .join("")

    return {
      __html: sentence
    }
  }

  return (
    <>
      {verifiedSentences.length > 0 && (
        <div className="mb-16">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-3 mt-8">{t("original_sentences")}</h2>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3 mt-8">{t("fixed_sentences")}</h2>
            </div>
          </div>

          {verifiedSentences.map((verifiedSentence, index) => (
            <div
              key={`original-sentence-${originalSentences[index]}`}
              className="grid grid-cols-2 gap-4 mb-4 text-lg leading-10 font-serif"
            >
              <div
                className="w-50"
                dangerouslySetInnerHTML={highlightedOriginalSentence(
                  originalSentences[index],
                  verifiedSentence
                )}
              ></div>

              <div>
                <div
                  className="w-50 corrected-sentence"
                  dangerouslySetInnerHTML={highlightedFixedSentence(
                    originalSentences[index],
                    verifiedSentence
                  )}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
