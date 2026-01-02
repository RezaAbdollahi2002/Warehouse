from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User
from auth import get_password_hash, get_current_user, verify_password
import schemas

router = APIRouter(prefix="/user", tags=["users"])

# Change Password Using username(email)
@router.put("/passwordemail", status_code=status.HTTP_200_OK)
def change_password(data: schemas.ChangePasswordEmail, 
                    db: Session = Depends(get_db),
                    current_user:User=Depends(get_current_user)):
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

    current_user.hashed_password = get_password_hash(new_password)

    db.commit()
    db.refresh(current_user)

    return {"message": f"{current_user.username}'s password updated successfully!"}

# Changing password using user_id
@router.put("/passwordid", status_code=status.HTTP_200_OK)
def change_password(data: schemas.ChangePasswordUserId, db: Session = Depends(get_db), curent_user:User=Depends(get_current_user)):
    new_password = (data.password or "").strip()

    if not curent_user.id or not new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty username or password!"
        )

    user = db.query(User).filter(User.id == curent_user.id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user.hashed_password = get_password_hash(new_password)

    db.commit()
    db.refresh(user)

    return {"message": "Password updated successfully!"}

# Changing password forget password 
@router.put("/forget-password", status_code=status.HTTP_200_OK)
def change_password(data: schemas.ChangePasswordEmail, db: Session = Depends(get_db)):
    new_password = (data.password or "").strip()
    if not new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty password!"
        )
    user = db.query(User).filter(User.username == data.username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    user.hashed_password = get_password_hash(new_password)

    db.commit()
    db.refresh(user)

    return {"message": "Password updated successfully!"}

# Get User
@router.get("/me", response_model=schemas.UserRead)
def get_username(current_user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    user = db.query(User).filter(User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User was not found.")
    return user

# Delete User
@router.delete("/remove")
def remove_user(
    data: schemas.UserRemove,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not data.username or not data.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username and password are required"
        )

    username = data.username.strip().lower()

    # Ensure user can only delete their own account
    if current_user.username != username:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this user"
        )

    if not verify_password(data.password, current_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Wrong password"
        )

    db.delete(current_user)
    db.commit()

    return {"detail": f"User '{username}' has been removed"}
