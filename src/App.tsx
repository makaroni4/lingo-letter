import './App.css';
import { useAppStore } from './store';
import { useState } from 'react';
import OpenAI from 'openai';

function App() {
  const { openAIAPIKey, setOpenAIAPIKey } = useAppStore();
  const [letter, setLetter] = useState("")
  const [checkedLetter, setCheckedLetter] = useState("")

  const splitTextIntoSentences = (text: string): string[] => {
    let sentences = text.match(/[^\.!\?]+[\.!\?]+/g)?.filter(function(sentence) {
      return sentence.trim() !== '';
    });

    if(!sentences) return []

    return sentences;
  }

  const handleFormSubmit = async () => {
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
        <div>
          Key: {openAIAPIKey}
        </div>

        <input
          onChange={(e) => setOpenAIAPIKey(e.target.value) }
          type="text" />

        <div>
          <textarea
            onChange={(e) => setLetter(e.target.value) }
            name="" id="" cols={30} rows={10}></textarea>

          <button onClick={handleFormSubmit}>SUBMIT</button>
        </div>

        <div>
          {checkedLetter}
        </div>

        <div>
          <div>
            <ul>
              { splitTextIntoSentences(letter).map(sentence => {
                return (<li>{sentence}</li>)
              })}
            </ul>
          </div>
          <div>
            { checkedLetter && splitTextIntoSentences(checkedLetter).map(sentence => {
              return (<li>{sentence}</li>)
            })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
