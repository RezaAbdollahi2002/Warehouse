import shutil
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, status, staticfiles, UploadFile, File
from fastapi.params import Form
from sqlalchemy import desc
from sqlalchemy.orm import Session
import os
from database import get_db
from models import User, Company
from auth import get_password_hash, get_current_user, verify_password
import schemas
from typing import List, Optional


BASE_DIR = os.path.dirname(os.path.dirname(__file__))     
COMPANY_LOGO_UPLOAD_DIR = os.path.join(BASE_DIR, "uploads/companies/logo") 
os.makedirs(COMPANY_LOGO_UPLOAD_DIR, exist_ok=True)

router = APIRouter(prefix="/company", tags=["Comapny"])


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

# Post company
@router.post("")
def create_company(
    name: str = Form(...),
    address: str = Form(...),
    url: str = Form(...),
    logo: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not name or not address or not url:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Empty name or address or url"
        )

    company_exists = (
        db.query(Company)
        .filter(
            Company.name == name,
            Company.address == address
        )
        .first()
    )

    if company_exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"{name} already exists."
        )

    logo_path = save_file(logo, COMPANY_LOGO_UPLOAD_DIR) if logo else None

    company = Company(
        name=name,
        address=address,
        logo=logo_path,
        url=url,
        user_id=current_user.id
    )

    try:
        db.add(company)
        db.commit()
        db.refresh(company)
    except Exception:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create company"
        )

    return {
        "detail": f"{name} has been successfully created.",
        "company_id": company.id
    }
    
# Put company
# change name 
@router.put("/update/name")
def update_name(data:schemas.CompanyUpdateName,current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.name:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty name.")
    company = db.query(Company).filter(Company.user_id == current_user.id, Company.id == data.id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No company was found.")
    company.name = data.name 
    db.commit()
    db.refresh(company)
    return {"detail" : f"The name of the company successfully updated to {company.name}"}

# change address
@router.put("/update/address")
def update_name(data:schemas.CompanyUpdateAddress,current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not data.address:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty address.")
    company = db.query(Company).filter(Company.user_id == current_user.id, Company.id == data.id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No company was found.")
    company.address = data.address 
    db.commit()
    db.refresh(company)
    return {"detail" : f"The address of the company successfully updated to {company.address}"}

# change logo
@router.put("/update/logo")
def update_logo(id:int=Form(...), logo: UploadFile = File(None),current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not logo:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty address.")
    company = db.query(Company).filter(Company.user_id == current_user.id, Company.id == id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No company was found.")
    company.logo = save_file(logo,COMPANY_LOGO_UPLOAD_DIR) 
    db.commit()
    db.refresh(company)
    return {"detail" : f"The logo of the company successfully updated to {company.logo}"}

# change url
@router.put("/update/url")
def update_logo(id:int, url: str,current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not url:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty address.")
    company = db.query(Company).filter(Company.user_id == current_user.id, Company.id == id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No company was found.")
    company.url = save_file(url,COMPANY_LOGO_UPLOAD_DIR) 
    db.commit()
    db.refresh(company)
    return {"detail" : f"The url of the company successfully updated to {company.url}"}


# Get companies

# All companies of the info
@router.get("/all", response_model=List[schemas.CompanyGetAll])
def get_name_and_address(current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    companies = db.query(Company).filter(Company.user_id == current_user.id).order_by(desc(Company.id)).all()
    return companies

# Remove company
@router.delete("/remove/companies")
def remove_companies(company_id: int, current_user:User=Depends(get_current_user), db:Session=Depends(get_db)):
    if not company_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Empty company id")
    company = db.query(Company).filter(Company.user_id == current_user.id, company_id == company_id).first()
    if not company:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="No company was found.")
    db.delete(company)
    db.commit()
    return {"detail": "The company was successfully removed."}



    