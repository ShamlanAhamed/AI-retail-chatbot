// frontend/src/components/ChatWindow.jsx

import React, { useState, useEffect, useRef } from 'react';
import { sendChatMessage } from '../services/chatService';

function ChatWindow() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me about a product or chat normally." }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botReplyText = await sendChatMessage(input);
      const botMessage = { sender: "bot", text: botReplyText };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput(""); // Clear input box
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid gray', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
            <div key={index} style={{
            textAlign: msg.sender === "bot" ? "left" : "right",
            margin: '10px 0',
            display: 'flex',
            justifyContent: msg.sender === "bot" ? "flex-start" : "flex-end"
            }}>
            <div style={{
                backgroundColor: msg.sender === "bot" ? "#e0e0e0" : "#c8f7c5",
                color: "black",
                padding: '10px 15px',
                borderRadius: '18px',
                maxWidth: '70%',
                wordWrap: 'break-word'
            }}>
                <b>{msg.sender === "bot" ? "Bot" : "You"}:</b> {msg.text}
            </div>
            </div>
        ))}
        <div ref={chatEndRef} />
        </div>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        style={{ width: '80%', padding: '10px' }}
      />
      <button onClick={handleSend} style={{ padding: '10px', marginLeft: '10px' }}>Send</button>
    </div>
  );
}

export default ChatWindow;
