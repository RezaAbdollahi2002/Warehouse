import os
from fastapi_mail import ConnectionConfig
from dotenv import load_dotenv

load_dotenv()

def require_env(key: str) -> str:
    val = os.getenv(key)
    if not val:
        raise RuntimeError(f"Missing environment variable: {key}")
    return val

conf = ConnectionConfig(
    MAIL_USERNAME=require_env("MAIL_USERNAME"),
    MAIL_PASSWORD=require_env("MAIL_PASSWORD"),
    MAIL_FROM=require_env("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", "587")),
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)
