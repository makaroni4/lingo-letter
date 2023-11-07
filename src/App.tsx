import React from 'react';
import './App.css';
import { useAppStore } from './store';
import { useState } from 'react';
import OpenAI from 'openai';

function App() {
  const { openAIAPIKey, setOpenAIAPIKey } = useAppStore();
  const [prompt, setPrompt] = useState("")
  const handleFormSubmit = async () => {
    console.log(prompt);

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
    });

    console.log(chatCompletion)
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
            onChange={(e) => setPrompt(e.target.value) }
            name="" id="" cols={30} rows={10}></textarea>
          <button onClick={handleFormSubmit}>SUBMIT</button>
        </div>
      </header>
    </div>
  );
}

export default App;
