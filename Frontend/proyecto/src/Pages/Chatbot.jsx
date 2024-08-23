import React, { useState } from 'react';
import './Styles/Chatbot.css';
import { FaPaperPlane, FaEllipsisV } from 'react-icons/fa';
import Navbar from '../Components/Navbar';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'Bot response', user: false }]);
      }, 1000);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="chatbot">
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-container ${msg.user ? 'user' : 'bot'}`}>
              <div className={`message ${msg.user ? 'user' : 'bot'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="chatbot-input">
          <div className="input-container">
            <span className="text-icon">T</span>
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type a message..." 
              className="input-field" 
            />
            <FaPaperPlane onClick={handleSend} className="icon send-icon" />
            <FaEllipsisV className="icon options-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;