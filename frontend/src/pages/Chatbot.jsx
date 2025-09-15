import React, { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react'; // Ensure lucide-react is installed or substitute icons

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello! I'm EcoBot, your friendly environmental assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const botResponses = [
    "That's a great question! I'd be happy to help you with environmental tips.",
    "Sustainability is so important! Let me share some insights with you.",
    "I love discussing eco-friendly solutions! What specific area interests you?",
    "Thank you for caring about our planet! Here's what I recommend...",
    "Wonderful! Every small action makes a difference for our environment."
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setTimeout(() => {
      const botReply = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botReply]);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-4 sm:right-[-4px] bottom-2 right-[6px] z-50">
      {/* Chat Window */}
      <div
        className={`mb-4 w-80 sm:w-80 w-[calc(100vw-2rem)] max-w-80 h-96 max-h-[calc(100vh-8rem)] rounded-2xl shadow-lg border overflow-hidden transition-all duration-300 ease-linear ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
        style={{ background: '#23A455', borderColor: '#17993b', borderStyle: 'solid' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4"
          style={{ background: '#17993b', color: '#ffffff' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
              🤖
            </div>
            <div>
              <h3 className="font-semibold text-sm">EcoBot</h3>
              <p className="text-xs opacity-90">Online now</p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200"
            style={{ color: '#ffffff' }}
          >
            <X size={16} />
          </button>
        </div>
        {/* Messages Area */}
        <div
          className="flex-1 h-64 overflow-y-auto p-4 space-y-3"
          style={{ background: '#F3F5F9', color: '#333333' }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                  message.isUser
                    ? 'rounded-br-md'
                    : 'rounded-bl-md'
                }`}
                style={{
                  backgroundColor: message.isUser ? '#4CAF50' : '#DDEEDD',
                  color: message.isUser ? '#fff' : '#333'
                }}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <div
          className="p-4 border-t"
          style={{ background: '#E1ECDF', borderColor: '#23A455', borderStyle: 'solid' }}
        >
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 transition-colors duration-200"
              style={{ backgroundColor: '#FAFAFA', borderColor: '#23A455', color: '#333' }}
            />
            <button
              onClick={sendMessage}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: inputMessage.trim() ? '#23A455' : '#A5D6A7',
                color: '#fff'
              }}
              disabled={!inputMessage.trim()}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Floating Robot Button */}
      <button
        onClick={toggleChat}
        className={`w-20 h-20 rounded-full shadow-lg flex items-center justify-center text-2xl transition-all duration-300 ease-linear hover:scale-110 active:scale-95 ${
          isOpen ? 'rotate-180' : 'hover:animate-bounce'
        }`}
        style={{ backgroundColor: '#23A455', color: '#fff', border: '2px solid #17993b' }}
      >
        {isOpen ? <X size={30} /> : '🤖'}
      </button>
    </div>
  );
};

export default Chatbot;
