import { compareSentences } from './compare-sentences';

const replaceSpans = (sentence: string): string => {
  return sentence
    .replaceAll('<span class="bg-teal-300">', '++')
    .replaceAll('<span class="bg-amber-300">', '--')
    .replaceAll('</span>', ']]')
}

describe('when two sentences match', () => {
  test('the result is an original sentence wrapped into a green bg span', () => {
    const originalSentence = "What a day!"

    const result = replaceSpans(compareSentences({
      originalSentence,
      fixedSentence: originalSentence
    }))

    expect(result).toBe(`++What]]++a]]++day]]++!]]`)
  });
})

describe('when two sentences do NOT match', () => {
  describe('when only the first word had a mistake', () => {
    test('only wraps the first word in a red bg span', () => {
      const originalSentence = "Yu are the best!"
      const fixedSentence = "You are the best!"

      const result = replaceSpans(compareSentences({
        originalSentence,
        fixedSentence
      }))

      expect(result).toBe(`--You]]++are]]++the]]++best]]++!]]`)
    });
  })
})
