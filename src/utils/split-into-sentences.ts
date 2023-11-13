export const splitIntoSentences = (text: string): string[] => {
  return text
    .split(/[.!?]/)
    .filter(sentence => sentence.trim() !== "")
}
