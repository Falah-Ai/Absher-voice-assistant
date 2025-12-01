import React, { useState } from 'react';
import { Mic, Send } from 'lucide-react'; // استيراد أيقونة المايكروفون
import './VoiceAssistant.css';

// 1. تحديد نقطة النهاية ومفتاح API
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

function VoiceAssistant() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // **** وظيفة إضافة الدعم الصوتي (Voice Input) ****
  const handleVoiceInput = () => {
    // يجب إضافة منطق متصفح Web Speech API هنا
    // حالياً، سنكتفي بإظهار رسالة بسيطة
    alert('Voice input feature is under development!'); 
  };
  // *********************

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = async () => {
    if (!message.trim()) return;

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
      const res = await fetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': Bearer ${OPENAI_API_KEY},
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 150,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(API Error: ${res.status} - ${errorData.error.message || 'Unknown API error'});
      }

      const data = await res.json();
      const fullAnswer = data.choices?.[0]?.message?.content || 'No specific answer received from AI.';

      setMessage(''); 

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
    <div className="voice-assistant-container">
      <header className="header">
        <h1>مساعد أبشر الصوتي</h1>
      </header>
      
      <div className="voice-assistant">
        {/* حقل الإدخال وزر الإرسال */}
        <div className="input-area">
          <input
            type="text"
            value={message}
            onChange={handleInputChange}
            placeholder="اكتب استفسارك..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          {/* زر المايكروفون */}
          <button className="mic-button" onClick={handleVoiceInput} aria-label="Voice Input">
            <Mic size={20} />
          </button>
          {/* زر الإرسال */}
          <button onClick={handleSend} aria-label="Send">
            <Send size={20} />
          </button>
        </div>

        <div className="response">
          {isTyping ? <span className="cursor">▌</span> : null}
          {response}
        </div>
      </div>
      
      <footer className="footer">
        هذا الموقع لمنافسة هاكاثون أبشر تويق
      </footer>
    </div>
  );
}

export default VoiceAssistant
