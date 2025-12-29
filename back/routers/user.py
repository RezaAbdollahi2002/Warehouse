from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User
from auth import get_password_hash
import schemas

router = APIRouter(prefix="/user", tags=["users"])

# Change Password Using username(email)
@router.put("/passwordemail", status_code=status.HTTP_200_OK)
def change_password(data: schemas.ChangePasswordEmail, db: Session = Depends(get_db)):
    username = (data.username or "").strip().lower()
    new_password = (data.password or "").strip()

    if not username or not new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty username or password!"
        )

    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user.hashed_password = get_password_hash(new_password)

    db.commit()
    db.refresh(user)

    return {"message": "Password updated successfully!"}

# Changing password using user_id
@router.put("/passwordid", status_code=status.HTTP_200_OK)
def change_password(data: schemas.ChangePasswordUserId, db: Session = Depends(get_db)):
    id = data.id or 0
    new_password = (data.password or "").strip()

    if not id or not new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty username or password!"
        )

    user = db.query(User).filter(User.id == id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user.hashed_password = get_password_hash(new_password)

    db.commit()
    db.refresh(user)

    return {"message": "Password updated successfully!"}

