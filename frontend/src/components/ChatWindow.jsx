// frontend/src/components/ChatWindow.jsx

import React, { useState } from 'react';
import axios from 'axios';

function ChatWindow({ messages, addMessage }) {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    addMessage({ sender: "user", text: input });

    try {
      const response = await axios.get('http://127.0.0.1:8000/');
      addMessage({ sender: "bot", text: response.data.message });
    } catch (error) {
      console.error(error);
      addMessage({ sender: "bot", text: "Sorry, something went wrong." });
    }

    setInput(""); // Clear input
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid gray', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '10px', marginTop: '10px' }}
      />
      <button onClick={handleSend} style={{ padding: '10px' }}>Send</button>
    </div>
  );
}

export default ChatWindow;
