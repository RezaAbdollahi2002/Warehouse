from fastapi import APIRouter, Depends, HTTPException, status, staticfiles, UploadFile, File
from sqlalchemy.orm import Session
import os
from database import get_db
from models import Documentation, User
from auth import get_password_hash, get_current_user, verify_password
import schemas
from uuid import uuid4
import shutil
from typing import Optional

BASE_DIR = os.path.dirname(os.path.dirname(__file__))     
PRIMARY_RESUME_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads/documentation/primary_resume")            
SECONDARY_RESUME_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads/documentation/secondary_resume")            
PRIMARY_COVER_LETTER_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads/documentation/primary_cover_letter")            
SECONDARY_COVER_LETTER_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads/documentation/secondary_cover_letter")
PROFILE_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads/documentation/profile_picture")
            
os.makedirs(PRIMARY_RESUME_UPLOAD_DIR, exist_ok=True)
os.makedirs(SECONDARY_RESUME_UPLOAD_DIR, exist_ok=True)
os.makedirs(PRIMARY_COVER_LETTER_UPLOAD_DIR, exist_ok=True)
os.makedirs(SECONDARY_COVER_LETTER_UPLOAD_DIR, exist_ok=True)
os.makedirs(PROFILE_UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/documentation", tags=["Documentations"])

def save_file(file: UploadFile | None, upload_dir: str) -> str | None:
    if not file:
        return None

    os.makedirs(upload_dir, exist_ok=True)

    ext = os.path.splitext(file.filename)[1]
    safe_filename = f"{uuid4()}{ext}"
    file_path = os.path.join(upload_dir, safe_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path.replace(BASE_DIR + "/", "")

# Create Documentation
@router.post("", status_code=status.HTTP_201_CREATED)
def create_documentation(
    primary_resume: UploadFile = File(None),
    secondary_resume: UploadFile = File(None),
    primary_cover_letter: UploadFile = File(None),
    secondary_cover_letter: UploadFile = File(None),
    profile_picture: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    documentation = (
        db.query(Documentation)
        .filter(Documentation.user_id == current_user.id)
        .first()
    )

    if not documentation:
        documentation = Documentation(user_id=current_user.id)

    documentation.primary_resume = save_file(primary_resume, PRIMARY_RESUME_UPLOAD_DIR)
    documentation.secondary_resume = save_file(secondary_resume, SECONDARY_RESUME_UPLOAD_DIR)
    documentation.primary_cover_letter = save_file(primary_cover_letter, PRIMARY_COVER_LETTER_UPLOAD_DIR)
    documentation.secondary_cover_letter = save_file(secondary_cover_letter, SECONDARY_COVER_LETTER_UPLOAD_DIR)
    documentation.profile_picture = save_file(profile_picture, PROFILE_UPLOAD_DIR)

    db.add(documentation)
    db.commit()
    db.refresh(documentation)

    return {"detail": "Documentation saved successfully"}

# Put Documentation
# primary resume
@router.put("/change/primary_resume")
def update_primary_resume(primary_resume: UploadFile = File(None),current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not primary_resume:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Primary resume cannot be empty.")
    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Primary resume was not found.")
    documentation.primary_resume = save_file(primary_resume, PRIMARY_RESUME_UPLOAD_DIR)
    db.commit()
    db.refresh(documentation)
    return {"detail": "Primary resume has been updated successfully."}

# secondary resume
@router.put("/change/secondary_resume")
def update_secondary_resume(secondary_resume: UploadFile = File(None),current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not secondary_resume:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Secondary resume cannot be empty.")
    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Secondary resume was not found.")
    documentation.secondary_resume = save_file(secondary_resume, SECONDARY_RESUME_UPLOAD_DIR)
    db.commit()
    db.refresh(documentation)
    return {"detail": "Secondary resume has been updated successfully."}

# primary cover letter
@router.put("/change/primary_cover_letter")
def update_primary_cover_letter(primary_cover_letter: UploadFile = File(None),current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not primary_cover_letter:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Primary cover letter cannot be empty.")
    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Primary cover letter was not found.")
    documentation.primary_cover_letter = save_file(primary_cover_letter, PRIMARY_COVER_LETTER_UPLOAD_DIR)
    db.commit()
    db.refresh(documentation)
    return {"detail": "Primary cover letter has been updated successfully."}
# secondary cover letter
@router.put("/change/secondary_cover_letter")
def update_secondary_cover_letter(secondary_cover_letter: UploadFile = File(None),current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not secondary_cover_letter:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Secondary cover letter cannot be empty.")
    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Secondary cover letter was not found.")
    documentation.secondary_cover_letter = save_file(secondary_cover_letter, SECONDARY_COVER_LETTER_UPLOAD_DIR)
    db.commit()
    db.refresh(documentation)
    return {"detail": "Secondary cover letter has been updated successfully."}

# profile picture
@router.put("/change/profile_picture")
def update_profile_picture(profile_picture: UploadFile = File(None),current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not profile_picture:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Profile picture cannot be empty.")
    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile picture was not found.")
    documentation.profile_picture = save_file(profile_picture, PROFILE_UPLOAD_DIR)
    db.commit()
    db.refresh(documentation)
    return {"detail": "Profile picture has been updated successfully."}


# Get Documentation
# Primary Resume
@router.get("/get/primary_resume")
def get_primary_resume(current_user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user was found!")
    primary_resume_url = db.query(Documentation).filter(Documentation.user_id == current_user.id).first().primary_resume
    if not primary_resume_url:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No resume was found!")
    return {"primary_resume": primary_resume_url}

# Secondary Resume
@router.get("/get/secondary_resume")
def get_secondary_resume(current_user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user was found!")
    secondary_resume_url = db.query(Documentation).filter(Documentation.user_id == current_user.id).first().secondary_resume
    if not secondary_resume_url:
        return {"secondary_resume" : "None"}
    return {"secondary_resume": secondary_resume_url}

# Primary Cover Letter
@router.get("/get/primary_cover_letter")
def get_primary_cover_letter(current_user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user was found!")
    primary_rcover_letter_url = db.query(Documentation).filter(Documentation.user_id == current_user.id).first().primary_cover_letter
    if not primary_rcover_letter_url:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No primary cover letter was found!")
    return {"primary_resume_url": primary_rcover_letter_url}

# Secondary Cover Letter
@router.get("/get/secondary_cover_letter")
def get_secondary_cover_letter(current_user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user was found!")
    secondary_cover_letter = db.query(Documentation).filter(Documentation.user_id == current_user.id).first().secondary_cover_letter
    if not secondary_cover_letter:
        return {"secondary_cover_letter": "None"}
    return {"secondary_cover_letter": secondary_cover_letter}
# Profile Picture
@router.get("/get/profile_picture")
def get_profile_picture(current_user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No user was found!")
    profile_picture = db.query(Documentation).filter(Documentation.user_id == current_user.id).first().profile_picture
    if not profile_picture:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No profile picture was found!")
    return {"profile_picture": profile_picture}


# Remove Documents
# primary resume
@router.delete("/remove/primary_resume")
def remove_primary_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=404, detail="No user found.")

    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation or not documentation.primary_resume:
        return {"primary_resume": "None"}

    # Delete file from disk if exists
    file_path = os.path.join(BASE_DIR, documentation.primary_resume)
    if os.path.exists(file_path):
        os.remove(file_path)

    # Remove reference from DB
    documentation.primary_resume = None
    db.add(documentation)
    db.commit()
    db.refresh(documentation)

    return {"primary_resume": "Primary resume has been deleted successfully."}

# secondary resume
@router.delete("/remove/secondary_resume")
def remove_secondary_resume(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=404, detail="No user found.")

    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation or not documentation.secondary_resume:
        return {"secondary_resume": "None"}

    # Delete file from disk if exists
    file_path = os.path.join(BASE_DIR, documentation.secondary_resume)
    if os.path.exists(file_path):
        os.remove(file_path)

    # Remove reference from DB
    documentation.secondary_resume = None
    db.add(documentation)
    db.commit()
    db.refresh(documentation)

    return {"secondary_resume": "secondary resume has been deleted successfully."}

# primary cover letter 
@router.delete("/remove/primary_cover_letter")
def remove_primary_cover_letter(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=404, detail="No user found.")

    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation or not documentation.primary_cover_letter:
        return {"primary_cover_letter": "None"}

    # Delete file from disk if exists
    file_path = os.path.join(BASE_DIR, documentation.primary_cover_letter)
    if os.path.exists(file_path):
        os.remove(file_path)

    # Remove reference from DB
    documentation.primary_cover_letter = None
    db.add(documentation)
    db.commit()
    db.refresh(documentation)

    return {"primary_cover_letter": "primary cover letter has been deleted successfully."}

# secondary cover letter 
@router.delete("/remove/secondary_cover_letter")
def remove_secondary_cover_letter(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=404, detail="No user found.")

    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation or not documentation.secondary_cover_letter:
        return {"secondary_cover_letter": "None"}

    # Delete file from disk if exists
    file_path = os.path.join(BASE_DIR, documentation.secondary_cover_letter)
    if os.path.exists(file_path):
        os.remove(file_path)

    # Remove reference from DB
    documentation.secondary_cover_letter = None
    db.add(documentation)
    db.commit()
    db.refresh(documentation)

    return {"secondary_cover_letter": "secondary cover letter has been deleted successfully."}

# profile picture
@router.delete("/remove/profile_picture")
def remove_profile_picture(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=404, detail="No user found.")

    documentation = db.query(Documentation).filter(Documentation.user_id == current_user.id).first()
    if not documentation or not documentation.profile_picture:
        return {"profile_picture": "None"}

    # Delete file from disk if exists
    file_path = os.path.join(BASE_DIR, documentation.profile_picture)
    if os.path.exists(file_path):
        os.remove(file_path)

    # Remove reference from DB
    documentation.profile_picture = None
    db.add(documentation)
    db.commit()
    db.refresh(documentation)

    return {"profile_picture": "profile picture has been deleted successfully."}