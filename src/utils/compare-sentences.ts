import { splitWithPunctuation } from "./split-with-punctuation";

export const compareSentences = ({ originalSentence, fixedSentence }: { originalSentence: string, fixedSentence: string }): string => {
  const PUNCTUATION_SYMBOLS = [",", ":", ";"]
  const originalWords = splitWithPunctuation(originalSentence)
  const correctedWords = splitWithPunctuation(fixedSentence)

  let result = '';
  let i = 0;
  let j = 0;

  while (i < originalWords.length || j < correctedWords.length) {
    const originalWord = originalWords[i]?.trim()
    const correctedWord = correctedWords[j]?.trim()

    if (originalWord && correctedWord) {
      if(PUNCTUATION_SYMBOLS.includes(originalWord) && !PUNCTUATION_SYMBOLS.includes(correctedWord)) {
        result += '<span class="bg-amber-300">&nbsp;</span>';
        i++;
      } else if (originalWord === correctedWord) {
        result += '<span class="bg-teal-300">' + correctedWord + '</span>';
        i++;
        j++;
      } else {
        result += '<span class="bg-amber-300">' + correctedWord + '</span>';
        i++;
        j++;
      }
    } else {
      i++;
      j++;
    }
  }

  return result;
}
