# backend/app/routes/chat.py

from fastapi import APIRouter
from pydantic import BaseModel
from app.services.chatbot_service import generate_chatbot_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    user_message = request.message
    bot_reply = generate_chatbot_response(user_message)
    return ChatResponse(reply=bot_reply)
