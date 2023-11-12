import './App.css';
import { useAppStore } from './store';
import { useEffect, useState } from 'react';
import OpenAI from 'openai';

function App() {
  const { openAIAPIKey, setOpenAIAPIKey } = useAppStore();
  const { letter, setLetter } = useAppStore();
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false)
  const [originalSentences, setOriginalSentences] = useState<string[]>([])
  const [verifiedSentences, setVerifiedSentences] = useState<string[]>([])

  useEffect(() => {
    if(openAIAPIKey) {
      setApiKeySubmitted(true)
    }
  }, [])

  const splitTextIntoSentences = (text: string): string[] => {
    let sentences = text.match(/[^\.!\?]+[\.!\?]+/g)?.filter(function(sentence) {
      return sentence.trim() !== '';
    });

    if(!sentences) return []

    return sentences;
  }

  const handleApiKeySubmit = () => {
    setApiKeySubmitted(true)
  }

  const handleFormSubmit = async () => {
    if(!letter) {
      console.log("--> empty handleFormSubmit")
      return;
    }

    setOriginalSentences(splitTextIntoSentences(letter))

    const message = `
      Fix German grammar in the following text:

      ${letter}
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    const responseText = chatCompletion.choices[0].message.content || ""

    const fixedSentences = splitTextIntoSentences(responseText)

    setVerifiedSentences(fixedSentences)
  }

  const openai = new OpenAI({
    apiKey: openAIAPIKey,
    dangerouslyAllowBrowser: true
  });

  return (
    <div className="App">
      <header className="App-header">
        {apiKeySubmitted && (
          <div>
            <button onClick={() => setApiKeySubmitted(false)}>Reset API token</button>
          </div>
        )}

        {!apiKeySubmitted && (
          <div>
            <input
              onChange={(e) => setOpenAIAPIKey(e.target.value) }
              type="text" />

            <button onClick={handleApiKeySubmit}>SUBMIT</button>
          </div>
        )}

        <div>
          <textarea
            defaultValue={letter}
            onChange={(e) => setLetter(e.target.value) }
            name="" id="" cols={30} rows={10}></textarea>

          <button onClick={handleFormSubmit}>SUBMIT</button>
        </div>

        <div className='flex flex-row gap-12'>
          <div className=''>
            <ul>
              { originalSentences && originalSentences.map((sentence, index) => {
                return (<li>{sentence}</li>)
              })}
            </ul>
          </div>
          <div>
            <ul>
              { verifiedSentences && verifiedSentences.map((sentence, index) => {
                return (<li className={`${ sentence === originalSentences[index] ? 'bg-teal-400' : 'bg-rose-400' }`}>{sentence}</li>)
              })}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
