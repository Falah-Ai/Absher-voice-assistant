import React, { useState, useEffect, useRef } from ‘react’;
import { Mic, MicOff, Volume2, VolumeX } from ‘lucide-react’;
import ‘./VoiceAssistant.css’;

const VoiceAssistant = () => {
const [isListening, setIsListening] = useState(false);
const [isSpeaking, setIsSpeaking] = useState(false);
const [transcript, setTranscript] = useState(’’);
const [response, setResponse] = useState(’’);
const [conversationHistory, setConversationHistory] = useState([]);
const recognitionRef = useRef(null);
const synthRef = useRef(window.speechSynthesis);

// تهيئة Web Speech API
useEffect(() => {
if (‘webkitSpeechRecognition’ in window || ‘SpeechRecognition’ in window) {
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
recognitionRef.current = new SpeechRecognition();
recognitionRef.current.continuous = false;
recognitionRef.current.interimResults = false;
recognitionRef.current.lang = ‘ar-SA’; // اللغة العربية السعودية


  recognitionRef.current.onresult = (event) => {
    const userSpeech = event.results[0][0].transcript;
    setTranscript(userSpeech);
    handleUserQuery(userSpeech);
  };

  recognitionRef.current.onerror = (event) => {
    console.error('خطأ في التعرف على الصوت:', event.error);
    setIsListening(false);
  };

  recognitionRef.current.onend = () => {
    setIsListening(false);
  };
} else {
  alert('المتصفح لا يدعم خاصية التعرف على الصوت');
}

return () => {
  if (recognitionRef.current) {
    recognitionRef.current.stop();
  }
};


}, []);

// بدء الاستماع
const startListening = () => {
if (recognitionRef.current && !isListening) {
setTranscript(’’);
setResponse(’’);
recognitionRef.current.start();
setIsListening(true);
}
};

// إيقاف الاستماع
const stopListening = () => {
if (recognitionRef.current && isListening) {
recognitionRef.current.stop();
setIsListening(false);
}
};

// معالجة استفسار المستخدم
const handleUserQuery = async (query) => {
// إضافة الرسالة إلى السجل
const newMessage = { role: ‘user’, content: query };
setConversationHistory(prev => […prev, newMessage]);


try {
  // استدعاء API الذكاء الاصطناعي
  const aiResponse = await getAIResponse(query, conversationHistory);
  
  // إضافة رد الذكاء الاصطناعي إلى السجل
  const assistantMessage = { role: 'assistant', content: aiResponse };
  setConversationHistory(prev => [...prev, assistantMessage]);
  
  setResponse(aiResponse);
  speakResponse(aiResponse);
} catch (error) {
  console.error('خطأ في الحصول على الرد:', error);
  const errorMsg = 'عذراً، حدث خطأ في معالجة طلبك';
  setResponse(errorMsg);
  speakResponse(errorMsg);
}


};

// الحصول على رد من الذكاء الاصطناعي
const getAIResponse = async (query, history) => {
// يجب استبدال هذا بمفتاح API الخاص بك
const API_KEY = ‘YOUR_ANTHROPIC_API_KEY’;


const messages = [
  ...history,
  { role: 'user', content: query }
];

const systemPrompt = `أنت مساعد صوتي ذكي متخصص في خدمات أبشر الحكومية السعودية. 


مهامك:

- الرد على الاستفسارات عن خدمات أبشر
- شرح كيفية استخدام الخدمات المختلفة
- الإجابة عن الأسئلة المتعلقة بـ:
  - المخالفات المرورية
  - تجديد رخصة القيادة
  - تجديد جواز السفر
  - الاستعلام عن الهوية الوطنية
  - تصاريح السفر
  - الاستعلام عن المركبات

قواعد الرد:

- استخدم اللغة العربية الفصحى البسيطة
- كن مختصراً ومفيداً (2-3 جمل كحد أقصى)
- قدم معلومات دقيقة وحديثة
- اقترح الخطوات التالية إن أمكن`;
  
  try {
  const response = await fetch(‘https://api.anthropic.com/v1/messages’, {
  method: ‘POST’,
  headers: {
  ‘Content-Type’: ‘application/json’,
  ‘x-api-key’: API_KEY,
  ‘anthropic-version’: ‘2023-06-01’
  },
  body: JSON.stringify({
  model: ‘claude-sonnet-4-20250514’,
  max_tokens: 1000,
  system: systemPrompt,
  messages: messages
  })
  });
  
  
  if (!response.ok) {
    throw new Error('فشل الاتصال بخدمة الذكاء الاصطناعي');
  }
  
  const data = await response.json();
  return data.content[0].text;
  
  
  } catch (error) {
  console.error(‘خطأ في API:’, error);
  return getOfflineResponse(query);
  }
  };
  
  // ردود جاهزة في حالة عدم توفر الاتصال
  const getOfflineResponse = (query) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes(‘مخالف’) || lowerQuery.includes(‘مخالفة’)) {
  return ‘يمكنك الاستعلام عن المخالفات المرورية من خلال تطبيق أبشر أو موقع أبشر الإلكتروني باستخدام رقم الهوية أو رقم لوحة المركبة.’;
  }
  
  if (lowerQuery.includes(‘رخصة’) || lowerQuery.includes(‘قيادة’)) {
  return ‘لتجديد رخصة القيادة، ادخل على أبشر، اختر خدمات المرور، ثم اختر تجديد رخصة القيادة. ستحتاج إلى فحص طبي ساري المفعول.’;
  }
  
  if (lowerQuery.includes(‘جواز’) || lowerQuery.includes(‘سفر’)) {
  return ‘يمكنك تجديد جواز السفر من خلال منصة أبشر أفراد. الخدمة متاحة للمواطنين، وتحتاج إلى رفع صورة شخصية حديثة.’;
  }
  
  if (lowerQuery.includes(‘تصريح’)) {
  return ‘تصاريح السفر متاحة للمقيمين من خلال منصة أبشر. يمكنك طلب التصريح من قسم الخدمات الإلكترونية في أبشر مقيم.’;
  }
  
  return ‘أنا مساعدك الصوتي لخدمات أبشر. يمكنني مساعدتك في الاستعلام عن المخالفات، تجديد الرخص والجوازات، والعديد من الخدمات الأخرى. كيف يمكنني مساعدتك؟’;
  };
  
  // نطق الرد
  const speakResponse = (text) => {
  if (‘speechSynthesis’ in window) {
  // إيقاف أي كلام سابق
  synthRef.current.cancel();
  
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  
  utterance.onstart = () => setIsSpeaking(true);
  utterance.onend = () => setIsSpeaking(false);
  utterance.onerror = () => setIsSpeaking(false);
  
  synthRef.current.speak(utterance);
  
  
  }
  };
  
  // إيقاف النطق
  const stopSpeaking = () => {
  if (synthRef.current) {
  synthRef.current.cancel();
  setIsSpeaking(false);
  }
  };
  
  return (
  
    <div className="voice-assistant-container">
      <div className="assistant-header">
        <h1>مساعد أبشر الصوتي</h1>
        <p>اسألني عن أي خدمة في أبشر</p>
      </div>
  
  
  <div className="assistant-visual">
    <div className={`voice-circle ${isListening ? 'listening' : ''} ${isSpeaking ? 'speaking' : ''}`}>
      {isListening ? (
        <Mic size={64} />
      ) : isSpeaking ? (
        <Volume2 size={64} />
      ) : (
        <MicOff size={64} />
      )}
    </div>
    
    <div className="status-text">
      {isListening && <p>🎤 أنا أستمع إليك...</p>}
      {isSpeaking && <p>🔊 أنا أتحدث...</p>}
      {!isListening && !isSpeaking && <p>اضغط على الميكروفون للبدء</p>}
    </div>
  </div>
  
  <div className="controls">
    <button
      className={`mic-button ${isListening ? 'active' : ''}`}
      onClick={isListening ? stopListening : startListening}
      disabled={isSpeaking}
    >
      {isListening ? <MicOff size={32} /> : <Mic size={32} />}
      <span>{isListening ? 'إيقاف الاستماع' : 'ابدأ التحدث'}</span>
    </button>
    
    {isSpeaking && (
      <button className="stop-button" onClick={stopSpeaking}>
        <VolumeX size={32} />
        <span>إيقاف الصوت</span>
      </button>
    )}
  </div>
  
  {transcript && (
    <div className="transcript-box">
      <h3>ما قلته:</h3>
      <p>{transcript}</p>
    </div>
  )}
  
  {response && (
    <div className="response-box">
      <h3>الرد:</h3>
      <p>{response}</p>
    </div>
  )}
  
  <div className="conversation-history">
    <h3>سجل المحادثة:</h3>
    <div className="history-items">
      {conversationHistory.map((msg, idx) => (
        <div key={idx} className={`history-item ${msg.role}`}>
          <strong>{msg.role === 'user' ? 'أنت:' : 'المساعد:'}</strong>
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  </div>
  
  <div className="quick-questions">
    <h3>أسئلة سريعة:</h3>
    <div className="question-buttons">
      <button onClick={() => handleUserQuery('كيف أستعلم عن مخالفاتي المرورية؟')}>
        المخالفات المرورية
      </button>
      <button onClick={() => handleUserQuery('كيف أجدد رخصة القيادة؟')}>
        تجديد رخصة القيادة
      </button>
      <button onClick={() => handleUserQuery('كيف أجدد جواز السفر؟')}>
        تجديد جواز السفر
      </button>
      <button onClick={() => handleUserQuery('ما هي خدمات أبشر المتاحة؟')}>
        خدمات أبشر
      </button>
    </div>
  </div>
  
  
    </div>
  );

};

export default VoiceAssistant;
