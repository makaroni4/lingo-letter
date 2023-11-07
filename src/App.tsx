import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useAppStore } from './store';

function App() {
  const { openAIAPIKey, setOpenAIAPIKey } = useAppStore();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          Key: {openAIAPIKey}
        </div>

        <input
          onChange={(e) => setOpenAIAPIKey(e.target.value) }
          type="text" />

      </header>
    </div>
  );
}

export default App;
