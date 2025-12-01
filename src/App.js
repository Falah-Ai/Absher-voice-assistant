import React from 'react';
import './App.css';
import VoiceAssistant from './components/VoiceAssistant/VoiceAssistant';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Absher Voice Assistant</h1>
      </header>
      <main>
        <VoiceAssistant />
      </main>
    </div>
  );
}

export default App;
