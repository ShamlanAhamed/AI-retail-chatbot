// frontend/src/services/chatService.js

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const sendChatMessage = async (userMessage) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat`, {
      message: userMessage,
    });
    return response.data.reply;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return "Sorry, something went wrong.";
  }
};
