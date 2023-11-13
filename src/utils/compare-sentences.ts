import { splitWithPunctuation } from "./split-with-punctuation";

export const compareSentences = ({ originalSentence, fixedSentence }: { originalSentence: string, fixedSentence: string }): string => {
  const originalWords = splitWithPunctuation(originalSentence)
  const correctedWords = splitWithPunctuation(fixedSentence)

  let result = '';
  let i = 0;

  while (i < originalWords.length || i < correctedWords.length) {
    if (originalWords[i] && correctedWords[i]) {
      if (originalWords[i].trim() === correctedWords[i].trim()) {
        result += '<span class="bg-teal-300">' + correctedWords[i].trim() + '</span>';
      } else {
        result += '<span class="bg-amber-300">' + correctedWords[i].trim() + '</span>';
      }
    }

    i++;
  }

  return result;
}
