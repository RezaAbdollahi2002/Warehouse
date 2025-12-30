from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import User,Recruiter,Position
from auth import get_password_hash, get_current_user, verify_password
import schemas
from typing import List
router = APIRouter(prefix="/recruiter", tags=["Recruiter"])

# Post recruiter
@router.post("", status_code=status.HTTP_201_CREATED)
def create_recruiter(
    data: schemas.RecruiterCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    recruiter_exists = db.query(
        db.query(Recruiter)
        .filter(
            Recruiter.first_name == data.first_name,
            Recruiter.last_name == data.last_name,
            Recruiter.email == data.email,
            Recruiter.phone_number == data.phone_number,
            Recruiter.position_id == data.position_id
        )
        .exists()
    ).scalar()

    if recruiter_exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Recruiter already exists."
        )

    recruiter = Recruiter(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        phone_number=data.phone_number,
        position_id=data.position_id
    )

    db.add(recruiter)
    db.commit()
    db.refresh(recruiter)

    return recruiter

# Put recruiters
# change first name
@router.put("/change/first_name")
def recruiter_update_first_name(data: schemas.RecruiterFirstName,current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty first name.")
    recruiter = db.query(Recruiter).filter(Recruiter.id == data.recruiter_id).first()
    if not recruiter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No recruiter was found.")
    recruiter.first_name = data.first_name
    db.commit()
    db.refresh(recruiter)
    return {"detail" : f"First name was updated to {recruiter.first_name}"}
# change last name
@router.put("/change/last_name")
def recruiter_update_last_name(data: schemas.RecruiterLastName,current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty last name.")
    recruiter = db.query(Recruiter).filter(Recruiter.id == data.recruiter_id).first()
    if not recruiter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No recruiter was found.")
    recruiter.last_name = data.last_name
    db.commit()
    db.refresh(recruiter)
    return {"detail" : f"Last name was updated to {recruiter.last_name}"}
# change email
@router.put("/change/email")
def recruiter_update_email(data: schemas.RecruiterEmail,current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty first name.")
    recruiter = db.query(Recruiter).filter(Recruiter.id == data.recruiter_id).first()
    if not recruiter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No recruiter was found.")
    recruiter.email = data.email
    db.commit()
    db.refresh(recruiter)
    return {"detail" : f"Email was updated to {recruiter.email}"}
# change phone number
@router.put("/change/phone_number")
def recruiter_update_phone_number(data: schemas.RecruiterPhoneNumber,current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty first name.")
    recruiter = db.query(Recruiter).filter(Recruiter.id == data.irecruiter_idd).first()
    if not recruiter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No recruiter was found.")
    recruiter.phone_number = data.phone_number
    db.commit()
    db.refresh(recruiter)
    return {"detail" : f"Phone number was updated to {recruiter.phone_number}"}

# Get recruiters
# GET all recruiters based on the postion_id
@router.get("/position_reqruiter_rid/{recruiter_id}")
def get_reqruiter_By_RecruiterID(recruiter_id:int, current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not recruiter_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
            detail="No recruiter found for this position")
    recruiter = db.query(Recruiter).filter(Recruiter.id == recruiter_id).first()
    return recruiter
# GET recruiter based on the recruiter_id
@router.get("/all_position_reqruiters_pid/{postion_id}", response_model=List[schemas.RecruiterRead])
def get_all_recruiters_by_position_id(
    postion_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    recruiters = db.query(Recruiter).filter(Recruiter.position_id == postion_id).all()

    if not recruiters:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No recruiters found for this position"
        )

    return recruiters

# Delete
@router.delete("/remove/recruiter")
def remove_recruiter(data: schemas.RecruiterRemoveId,current_user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty id.")
    recruiter = db.query(Recruiter).filter(Recruiter.id == data.recruiter_id).first()
    db.delete(recruiter)
    db.commit()
    return {"detail" : "Recruiter has been removed"}
    