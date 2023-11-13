import { compareSentences } from './compare-sentences';

describe('when two sentences match', () => {
  test('the result is an original sentence wrapped into a green bg span', () => {
    const originalSentence = "Despite the unexpected downpour, which had caught us off guard during our outdoor picnic; we decided to make the most of it, embracing the rain-soaked adventure, and, huddling under makeshift shelters, we laughed and created unforgettable memories."

    const result = compareSentences({
      originalSentence,
      fixedSentence: originalSentence
    })

    expect(result).toBe(`<span class="bg-teal-300">${originalSentence}</span>`)
  });
})
