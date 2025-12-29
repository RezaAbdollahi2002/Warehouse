# routers/signup.py
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from auth import get_password_hash

router = APIRouter(prefix="/signup", tags=["signup"])


@router.post("", status_code=status.HTTP_201_CREATED)   # POST /signup
def signup(data: schemas.userLoginAndSignup, db: Session = Depends(get_db)):
    username = data.username.strip().lower()

    if not username or not data.password:
        raise HTTPException(status_code=400, detail="Missing username or password")

    existing = db.query(models.User).filter(models.User.username == username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")

    user = models.User(
        username=username,
        hashed_password=get_password_hash(data.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "User created successfully", "user_id": user.id}
    