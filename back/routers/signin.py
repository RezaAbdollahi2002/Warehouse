# routers/signin.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from database import get_db
from auth import authenticate_user, create_access_token

router = APIRouter(tags=["auth"])

@router.post("/signin")
def signin(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    username = form_data.username.strip().lower()
    password = form_data.password

    user = authenticate_user(db, username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Best practice: store identity in "sub"
    token = create_access_token({"sub": user.username})

    return {"access_token": token, "token_type": "bearer"}
