// frontend/src/App.js

import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me about a product or chat normally." }
  ]);

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="App">
      <h1>Retail Chatbot 🛒</h1>
      <ChatWindow messages={messages} addMessage={addMessage} />
    </div>
  );
}

export default App;
