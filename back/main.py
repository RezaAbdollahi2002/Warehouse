# main.py
import os
import asyncio
from dotenv import load_dotenv

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import models
from database import engine

from routers.email import router as email_router, cleanup_otps
from routers.signin import router as signin
from routers.user import router as user
from routers.userinfo import router as userinfo
from routers.signup import router as signup
from routers.documentation import router as documentation
from routers.company import router as company


load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

app.include_router(email_router)
app.include_router(signin)
app.include_router(signup)
app.include_router(user)
app.include_router(userinfo)
app.include_router(documentation)
app.include_router(company)

@app.on_event("startup")
async def _startup():
    asyncio.create_task(cleanup_otps())

