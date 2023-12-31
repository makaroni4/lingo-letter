import { splitWithPunctuation } from "./split-with-punctuation"

describe("splitWithPunctuation", () => {
  describe("when a sentence does NOT have punctuation", () => {
    test("splits it into array of words with dot as a final string", () => {
      const sentence = "I went for a walk."

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual(["I", "went", "for", "a", "walk", "."])
    })
  })

  describe("when a sentence contains a comma", () => {
    test("splits commas into separate words", () => {
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
        "."
      ])
    })
  })

  describe("when a sentence contains a semicolon", () => {
    test("splits a semicolon into a separate word", () => {
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
        "."
      ])
    })
  })

  describe("when a sentence contains a hyphen", () => {
    test("does NOT split a hyphen into a separate word", () => {
      const sentence = "The well-known actor starred brilliantly."

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual(["The", "well-known", "actor", "starred", "brilliantly", "."])
    })
  })

  describe("when a sentence contains a colon", () => {
    test("splits a colon into a separate word", () => {
      const sentence = "The recipe requires the following ingredients: flour, sugar."

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual([
        "The",
        "recipe",
        "requires",
        "the",
        "following",
        "ingredients",
        ":",
        "flour",
        ",",
        "sugar",
        "."
      ])
    })
  })

  describe("when a sentence contains non-latin letters", () => {
    test("does NOT split words in halfs by non-latic letters", () => {
      const sentence = "Das war großartig!"

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual(["Das", "war", "großartig", "!"])
    })
  })

  describe("when a sentence contains numbers", () => {
    test("splits numbers to individual words", () => {
      const sentence = "3 of them were born in 1968."

      const result = splitWithPunctuation(sentence)

      expect(result).toEqual(["3", "of", "them", "were", "born", "in", "1968", "."])
    })
  })
})
