import React, { useState } from 'react';
import './VoiceAssistant.css';

function VoiceAssistant() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    setResponse('Thinking...');

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message }),
      });

      const data = await res.json();
      setResponse(data.answer || 'No response received.');
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your request.');
    }
  };

  return (
    <div className="voice-assistant">
      <h2>Ask Absher Assistant</h2>
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Type your question..."
      />
      <button onClick={handleSend}>Send</button>
      <div className="response">{response}</div>
    </div>
  );
}

export default VoiceAssistant;
