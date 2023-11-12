import './App.css';
import { useAppStore } from './store';
import { useEffect, useState } from 'react';
import OpenAI from 'openai';

function App() {
  const { openAIAPIKey, setOpenAIAPIKey } = useAppStore();
  const { letter, setLetter } = useAppStore();
  const [checkedLetter, setCheckedLetter] = useState("")
  const [apiKeySubmitted, setApiKeySubmitted] = useState(false)

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

    const message = `
      Fix German grammar in the following text:

      ${letter}
    `;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'gpt-3.5-turbo',
    });

    const responseText = chatCompletion.choices[0].message.content || ""

    setCheckedLetter(responseText)
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
              { splitTextIntoSentences(letter).map(sentence => {
                return (<li>{sentence}</li>)
              })}
            </ul>
          </div>
          <div>
            <ul>
              { checkedLetter && splitTextIntoSentences(checkedLetter).map(sentence => {
                return (<li>{sentence}</li>)
              })}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
