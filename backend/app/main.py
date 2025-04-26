# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup: allow frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later restrict to frontend URL for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Basic health check route
@app.get("/")
async def root():
    return {"message": "Retail Chatbot Backend Running!"}
  