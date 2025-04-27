# backend/app/services/chatbot_service.py

import requests
import json
import os

# Load your OpenRouter API key from environment or just paste it here (for now hardcode for testing)
OPENROUTER_API_KEY = "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"

def generate_chatbot_response(user_message: str) -> str:
    url = "https://openrouter.ai/api/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",  # Your frontend URL if any
        "X-Title": "RetailChatbot",               # Just a name for OpenRouter rankings
    }
    
    payload = {
        "model": "deepseek/deepseek-r1:free",  # Or any other model you prefer
        "messages": [
            {"role": "user", "content": user_message}
        ],
    }

    try:
        response = requests.post(url, headers=headers, data=json.dumps(payload))
        response.raise_for_status()
        data = response.json()

        # Extract the assistant reply
        reply = data['choices'][0]['message']['content']
        return reply

    except Exception as e:
        print(f"Error contacting OpenRouter: {e}")
        return "Sorry, I'm having trouble answering right now."
