import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChatbotPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m Senthoora. Tell me what happened 👮‍♀️..' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); // for typing animation

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/chat', {
        message: input
      });

      const botMessage = { from: 'bot', text: res.data.reply };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: 'Oops! Something went wrong. Please try again.' }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-white flex flex-col font-poppins">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold text-red-600">🤖 Senthoora Chatbot</h1>
        <button
          onClick={() => navigate('/home')}
          className="text-sm text-gray-600 border px-3 py-1 rounded hover:text-red-600 hover:border-red-600"
        >
          ← Go Back
        </button>
      </div>

      {/* Chat Window */}
      <div className="flex-grow overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-xs px-4 py-2 rounded-xl shadow ${
              msg.from === 'user'
                ? 'ml-auto bg-red-500 text-white'
                : 'mr-auto bg-white text-gray-800'
            }`}
          >
            {msg.text}
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mr-auto bg-white text-gray-500 px-4 py-2 rounded-xl shadow max-w-xs italic"
          >
            Senthoora is typing...
          </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-white flex items-center gap-2 sticky bottom-0 z-10">
        <input
          type="text"
          placeholder="Type your issue here..."
          className="flex-grow border border-gray-300 p-2 rounded-xl focus:outline-red-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;
