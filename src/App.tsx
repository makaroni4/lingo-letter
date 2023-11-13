import './App.css';
import { useAppStore } from './store';
import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { splitWithPunctuation } from './utils/split-with-punctuation';
import { compareSentences } from './utils/compare-sentences';
import { splitIntoSentences } from './utils/split-into-sentences';

function App() {
  const { openAIAPIKey, setOpenAIAPIKey } = useAppStore();
  const { letter, setLetter } = useAppStore();
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false)
  const [originalSentences, setOriginalSentences] = useState<string[]>([])
  const [verifiedSentences, setVerifiedSentences] = useState<string[]>([])

  const highlightErrorsInSentece = (original: string, corrected: string): { __html: string } => {
    return {
      __html: compareSentences({
        originalSentence: original,
        fixedSentence: corrected
      })
    }
  }

  useEffect(() => {
    if(openAIAPIKey) {
      setApiKeySubmitted(true)
    }
  }, [])

  const handleApiKeySubmit = () => {
    setApiKeySubmitted(true)
  }

  const handleClear = () => {
    const result = window.confirm("Are you sure you want to clear your text?");

    if (result) {
      setLetter("")
      setOriginalSentences([])
      setVerifiedSentences([])
    }
  }

  const handleFormSubmit = async () => {
    if(!letter) {
      console.log("--> empty handleFormSubmit")
      return;
    }

    setOriginalSentences(splitIntoSentences(letter))

    const message = `
      Fix German grammar in the following text. If a sentence is grammatically correct, leave it as is.

      ${letter}
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    const responseText = chatCompletion.choices[0].message.content || ""

    const fixedSentences = splitIntoSentences(responseText)

    setVerifiedSentences(fixedSentences)
  }

  const openai = new OpenAI({
    apiKey: openAIAPIKey,
    dangerouslyAllowBrowser: true
  });

  return (
    <div className="App py-24 px-12">
      {apiKeySubmitted && (
        <div>
          <button
            className="py-2 px-4 bg-indigo-500 rounded-md fixed right-4 top-4"
            onClick={() => setApiKeySubmitted(false)}>Reset API token</button>
        </div>
      )}

      {!apiKeySubmitted && (
        <div>
          <input
            onChange={(e) => setOpenAIAPIKey(e.target.value) }
            type="text" />

          <button
            className="py-2 px-4 bg-indigo-500 rounded-md"
            onClick={handleApiKeySubmit}>SUBMIT</button>
        </div>
      )}

      <div className='mb-12'>
        <textarea
          className="p-4 text-base w-full border-2 border-indigo-500 radius-4 rounded-md	"
          value={letter}
          onChange={(e) => setLetter(e.target.value) }
          name="" id="" cols={30} rows={10}></textarea>

        <button
          className="py-2 px-4 bg-indigo-500 rounded-md mr-4"
          onClick={handleFormSubmit}>SUBMIT</button>
        <button
          className="py-2 px-4 bg-indigo-500 rounded-md"
          onClick={handleClear}>CLEAR</button>
      </div>

      <div className=''>
        { verifiedSentences && verifiedSentences.map((verifiedSentence, index) => (
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div
              key={originalSentences[index]}
              className='text-left w-50'>
              {originalSentences[index]}
            </div>
            <div
              key={verifiedSentence}
              className='text-left w-50 corrected-sentence flex flex-wrap'
              dangerouslySetInnerHTML={highlightErrorsInSentece(originalSentences[index], verifiedSentence)} ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
