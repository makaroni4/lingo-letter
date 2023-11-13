export const splitIntoSentences = (text: string): string[] => {
  return text
    .split(/(?<=[.!?])\s*/)
    .filter(sentence => sentence.trim() !== "")
}
