# routers/userinfo.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User, UserInfo
import schemas
from auth import get_current_user

router = APIRouter(prefix="/userinfo", tags=["userinfo"])

@router.post("", status_code=status.HTTP_201_CREATED)
def create_all_info(
    data: schemas.UserInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if not data.first_name or not data.last_name:
        raise HTTPException(status_code=400, detail="First and last name are required.")

    if current_user.info:
        raise HTTPException(status_code=409, detail="User info already exists.")

    userinfo = UserInfo(
        first_name=data.first_name,
        last_name=data.last_name,
        dob=data.dob,
        phone_number=data.phone_number,
        address=data.address,
        user_id=current_user.id,
    )

    db.add(userinfo)
    db.commit()
    db.refresh(userinfo)
    return userinfo
