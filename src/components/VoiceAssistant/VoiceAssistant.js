import React, { useState } from 'react';
import './VoiceAssistant.css';

// 1. تحديد نقطة النهاية ومفتاح API
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

function VoiceAssistant() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

    // فحص المفتاح قبل الإرسال
    if (!OPENAI_API_KEY) {
      setResponse('API Key is missing or was not loaded during build.');
      return;
    }

    setResponse('');
    setIsTyping(true);
    
    // إعداد رسالة النظام ورسالة المستخدم
    const messages = [
      { role: "system", content: "You are Absher Assistant, a helpful assistant for Saudi government services." },
      { role: "user", content: message }
    ];

    try {
      // 2. الاتصال مباشرة بـ OpenAI API
      const res = await fetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer ${OPENAI_API_KEY}, // تمرير المفتاح
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // النموذج المستخدم
          messages: messages,
          max_tokens: 150,
        }),
      });

      // التحقق من حالة الاستجابة (مثل 401)
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(API Error: ${res.status} - ${errorData.error.message || 'Unknown API error'});
      }

      const data = await res.json();
      // استخراج الرد
      const fullAnswer = data.choices?.[0]?.message?.content || 'No specific answer received from AI.';

      // إعادة تعيين رسالة الإدخال
      setMessage(''); 

      // تأثير الكتابة (Typing effect)
      let i = 0;
      const interval = setInterval(() => {
        setResponse((prev) => prev + fullAnswer.charAt(i));
        i++;
        if (i >= fullAnswer.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 40); 

    } catch (error) {
      console.error('Error:', error);
      setResponse(Error: ${error.message || 'An error occurred while processing your request.'});
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

export default VoiceAssistantimport React, { useState } from 'react';
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
