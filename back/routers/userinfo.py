# routers/userinfo.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models import User, UserInfo
import schemas
from auth import get_current_user

router = APIRouter(prefix="/userinfo", tags=["userinfo"])

# create user info
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
    # Check if the userinfo already exists
    userinfo_exit = db.query(db.query(UserInfo).filter(
        UserInfo.first_name == data.first_name,
        UserInfo.last_name == data.last_name,
        
    ).exists()).scalar()
    if userinfo_exit:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User info already exists.")

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


# Put userinfo
# Change first name
@router.put("/update/first_name")
def change_first_name(
    data: schemas.UserFirstName,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not data.first_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="First name cannot be empty."
        )
    
    user_info = db.query(UserInfo).filter(UserInfo.user_id == current_user.id).first()
    
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User info not found."
        )
    
    user_info.first_name = data.first_name
    db.commit()
    db.refresh(user_info)
    
    return {
        "detail": f"First name updated successfully to '{user_info.first_name}'",
        "user": {
            "first_name": user_info.first_name
        }
    }

# Change Last Name
@router.put("/update/last_name")
def change_last_name(
    data: schemas.UserLastName,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not data.last_name:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Last name cannot be empty."
        )
    
    user_info = db.query(UserInfo).filter(UserInfo.user_id == current_user.id).first()
    
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User info not found."
        )
    
    user_info.last_name = data.last_name
    db.commit()
    db.refresh(user_info)
    
    return {
        "detail": f"Last name updated successfully to '{user_info.last_name}'",
        "user": {
            "last_name": user_info.last_name
        }
    }

# Change Date of Birth
@router.put("/update/dob")
def change_dob(
    data: schemas.UserDob,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not data.dob:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Date of birth cannot be empty."
        )
    
    user_info = db.query(UserInfo).filter(UserInfo.user_id == current_user.id).first()
    
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User info not found."
        )
    
    user_info.dob = data.dob
    db.commit()
    db.refresh(user_info)
    
    return {
        "detail": f"Last name updated successfully to '{user_info.dob}'",
        "user": {
            "dob": user_info.dob
        }
    }

# Change Phone Number
@router.put("/update/phone_number")
def change_phone_number(
    data: schemas.UserPhoneNumber,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not data.phone_number:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone Number cannot be empty."
        )
    
    user_info = db.query(UserInfo).filter(UserInfo.user_id == current_user.id).first()
    
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User info not found."
        )
    
    user_info.phone_number = data.phone_number
    db.commit()
    db.refresh(user_info)
    
    return {
        "detail": f"Phone number updated successfully to '{user_info.phone_number}'",
        "user": {
            "phone_number": user_info.phone_number
        }
    }
    
# Change Address
@router.put("/update/address")
def change_dob(
    data: schemas.UserAddress,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not data.address:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Address cannot be empty."
        )
    
    user_info = db.query(UserInfo).filter(UserInfo.user_id == current_user.id).first()
    
    if not user_info:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User info not found."
        )
    
    user_info.address = data.address
    db.commit()
    db.refresh(user_info)
    
    return {
        "detail": f"Last name updated successfully to '{user_info.address}'",
        "user": {
            "address": user_info.address
        }
    }

# Remove
# Remove all user info
@router.delete("/remove/all")
def remove_all_user_info(curent_user: User=Depends(get_current_user),db:Session=Depends(get_db)):
    user_info = db.query(UserInfo).filter(UserInfo.user_id == curent_user.id).first()
    if not user_info:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail="User info not found.")
    db.delete(user_info)
    db.commit()
    return {"detail" : "All of the information have been removed."}