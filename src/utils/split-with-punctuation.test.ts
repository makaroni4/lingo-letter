import { splitWithPunctuation } from "./split-with-punctuation"

describe('splitWithPunctuation', () => {
  describe('when a sentence does NOT have punctuation', () => {
    test('splits it into array of words with dot as a final string', () => {
      const sentence = "I went for a walk."

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual([
        "I",
        "went",
        "for",
        "a",
        "walk",
        "."
      ])
    })
  })

  describe('when a sentence contains a comma', () => {
    test('splits commas into separate words', () => {
      const sentence = "The sun was setting, casting a warm glow."

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual([
        "The",
        "sun",
        "was",
        "setting",
        ",",
        "casting",
        "a",
        "warm",
        "glow",
        ".",
      ])
    })
  })

  describe('when a sentence contains a semicolon', () => {
    test('splits a semicolon into a separate word', () => {
      const sentence = "She finished her work; then, she left the office."

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual([
        "She",
        "finished",
        "her",
        "work",
        ";",
        "then",
        ",",
        "she",
        "left",
        "the",
        "office",
        ".",
      ])
    })
  })
})
