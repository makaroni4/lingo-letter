import { splitWithPunctuation } from "./split-with-punctuation"

describe('splitWithPunctuation', () => {
  describe('when a sentence does NOT have punctuation', () => {
    test('splits it into array of words with dot as a final string', () => {
      const sentence = "I went for a walk."

      const result = splitWithPunctuation(sentence)

      console.log("--> result: ", result)

      expect(result).toEqual([
        "I",
        "went",
        "for",
        "a",
        "walk",
        "."
      ])
    });
  })
})
