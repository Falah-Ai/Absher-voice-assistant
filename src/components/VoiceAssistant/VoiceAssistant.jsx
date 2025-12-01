import React, { useState } from 'react';
import './VoiceAssistant.css';

function VoiceAssistant() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    setResponse('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message }),
      });

      const data = await res.json();
      const fullAnswer = data.answer || 'No response received.';

      // Typing effect: reveal text gradually
      let i = 0;
      const interval = setInterval(() => {
        setResponse((prev) => prev + fullAnswer.charAt(i));
        i++;
        if (i >= fullAnswer.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 40); // speed in ms per character
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your request.');
      setIsTyping(false);
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
      <div className="response">
        {isTyping ? <span className="cursor">▌</span> : null}
        {response}
      </div>
    </div>
  );
}

export default VoiceAssistant;
