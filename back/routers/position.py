from fastapi import APIRouter, Depends, HTTPException, status, staticfiles, UploadFile, File
from sqlalchemy.orm import Session
import os
from database import get_db
from models import Documentation, User, Company, Position
from auth import get_password_hash, get_current_user, get_company_by_id
import schemas
from uuid import uuid4
import shutil
from typing import List
from sqlalchemy import desc

router = APIRouter(prefix="/position", tags=["Positions"])

# Post positions
# Create position
@router.post("", status_code=status.HTTP_201_CREATED)
def create_position(
    data: schemas.PositionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    position_exist = db.query(db.query(Position).filter(
        Position.title == data.title,
        Position.company_id == data.company_id,
        Position.job_number == data.job_number
    ).exists()).scalar()
    if position_exist:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="This position already exits.")

    position = Position(
            title=data.title,
            job_number = data.job_number,
            experience_level=data.experience_level,
            remote_type=data.remote_type,
            date_posted=data.date_posted,
            department=data.department,
            compensation=data.compensation,
            accommodation=data.accommodation,
            status=data.status,
            company_id=data.company_id, 
        )

    db.add(position)
    db.commit()
    db.refresh(position)

    return position

#  Put position
# Update title
@router.put("/update/title")
def update_title(data: schemas.PositionTitle, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Empty title.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.title = data.title
    db.commit()
    db.refresh(position)
    return {"detail" : f"Title was updated to {position.title}."}
# Update job number
@router.put("/update/job_number")
def update_job_number(data: schemas.PositionJobNumber, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.job_number:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Empty job number.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.job_number = data.job_number
    db.commit()
    db.refresh(position)
    return {"detail" : f"Job number was updated to {position.job_number}."}

# Update experience level
@router.put("/update/experience_level")
def update_experience_level(data: schemas.PositionExperienceLevel, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Empty experience level.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.experience_level = data.experience_level
    db.commit()
    db.refresh(position)
    return {"detail" : f"Experience level was updated to {position.experience_level}."}

# Update remote type
@router.put("/update/remote_type")
def update_remote_type(data: schemas.PositionRemoteType, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Remote type level.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.remote_type = data.remote_type
    db.commit()
    db.refresh(position)
    return {"detail" : f"Remote type was updated to {position.remote_type}."}

# Update date posted
@router.put("/update/date_posted")
def update_date_posted(data: schemas.PositionDatePosted, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Date posted level.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.date_posted = data.date_posted
    db.commit()
    db.refresh(position)
    return {"detail" : f"Remote type was updated to {position.date_posted}."}

# Update date posted
@router.put("/update/department")
def update_department(data: schemas.PositionDepartment, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Department level.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.department = data.department
    db.commit()
    db.refresh(position)
    return {"detail" : f"Department was updated to {position.department}."}

# Update date posted
@router.put("/update/compensation")
def update_compensation(data: schemas.PositionCompensation, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Compensation level.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.compensation = data.compensation
    db.commit()
    db.refresh(position)
    return {"detail" : f"Compensation was updated to {position.compensation}."}

# Update accommodation
@router.put("/update/accommodation")
def update_accommodation(data: schemas.PositionAccommodation, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Accommodation level.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.accommodation = data.accommodation
    db.commit()
    db.refresh(position)
    return {"detail" : f"Accommodation was updated to {position.accommodation}."}

# Update status
@router.put("/update/status")
def update_status(data: schemas.PositionStatus, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.title:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Status level.")
    position = db.query(Position).filter(Position.company_id == data.company_id, Position.id == data.position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    position.status = data.status
    db.commit()
    db.refresh(position)
    return {"detail" : f"Accommodation was updated to {position.status}."}

# Get position
# Get all position for a company
@router.get("/get_all_positions/{company_id}", response_model=list[schemas.PositionRead])
def get_all_positions_of_a_company(company_id: int, user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not company_id:
        raise HTTPException(status_code= status.HTTP_400_BAD_REQUEST, detail="Empty company id.")
    positions = db.query(Position).filter(Position.company_id == company_id).order_by(desc(Position.id)).all()
    return positions
# Get all positions for this user
@router.get("/get_all__user_positions/", response_model=List[schemas.PositionRead])
def get_all__user_positions(current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    positions = db.query(Position).join(Company).filter(Company.user_id == current_user.id).order_by(desc(Position.id)).all()
    return positions

    
# Delete positions
@router.delete("/remove/position")
def remove_position(position_id:int,current_user:User=Depends(get_db),db:Session=Depends(get_db)):
    if not position_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty position id.")
    position = db.query(Position).filter(Position.id == position_id).first()
    if not position:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No position was found.")
    db.delete(position)
    db.commit()
    return {"detail" : "Position was removed."}

        