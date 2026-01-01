import os
import requests
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from models import User, Documentation
from auth import get_current_user, get_db
import schemas
from .document_reader import read_document
from bot_config import model

router = APIRouter(prefix="/bot", tags=["Documentation_Bot"])

RESUME_PRE_TEXT = "I want you to give me the best suggestions to revise this resume:\n\n"
COVER_LETTER_PRE_TEXT = "I want you to give me the best suggestions to reviese this cover letter:\n\n"


# Primary resume
@router.post("/primary_resume/suggestions")
def revise_resume(
    data: schemas.DocumentationBotBase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    doc = (
        db.query(Documentation)
        .filter(
            Documentation.id == data.id,
            Documentation.user_id == current_user.id,
        )
        .first()
    )

    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documentation does not exist.",
        )

    if not doc.primary_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file not attached.",
        )

    resume_path = doc.primary_resume
    if not resume_path:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No document was found.")
    if not os.path.exists(resume_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file not found on server.",
        )

    resume_text = read_document(resume_path)

    try:
        response = model(RESUME_PRE_TEXT + resume_text)
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )

    return response
# Secondary resume

@router.post("/secondary_resume/suggestions")
def revise_resume(
    data: schemas.DocumentationBotBase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    doc = (
        db.query(Documentation)
        .filter(
            Documentation.id == data.id,
            Documentation.user_id == current_user.id,
        )
        .first()
    )

    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documentation does not exist.",
        )

    if not doc.primary_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file not attached.",
        )

    resume_path = doc.secondary_resume
    if not resume_path:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No document was found.")

    if not os.path.exists(resume_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume file not found on server.",
        )

    resume_text = read_document(resume_path)

    try:
        response = model(RESUME_PRE_TEXT + resume_text)
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )

    return response

# Primary cover letter
@router.post("/primary_cover_letter/suggestions")
def revise_resume(
    data: schemas.DocumentationBotBase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    doc = (
        db.query(Documentation)
        .filter(
            Documentation.id == data.id,
            Documentation.user_id == current_user.id,
        )
        .first()
    )

    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documentation does not exist.",
        )

    if not doc.primary_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cover letter file not attached.",
        )

    cover_letter_path = doc.primary_cover_letter
    if not cover_letter_path:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No document was found.")
    if not os.path.exists(cover_letter_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cover letter file not found on server.",
        )

    cover_letter_text = read_document(cover_letter_path)

    try:
        response = model(COVER_LETTER_PRE_TEXT + cover_letter_text)
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )

    return response
# Secondary cover letter
@router.post("/secondary_cover_letter/suggestions")
def revise_resume(
    data: schemas.DocumentationBotBase,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    doc = (
        db.query(Documentation)
        .filter(
            Documentation.id == data.id,
            Documentation.user_id == current_user.id,
        )
        .first()
    )

    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Documentation does not exist.",
        )

    if not doc.primary_resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Secondary cover letter file not attached.",
        )

    cover_letter_path = doc.secondary_cover_letter
    if not cover_letter_path:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No document was found.")
    if not os.path.exists(cover_letter_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Secondary cover file not found on server.",
        )

    cover_letter_text = read_document(cover_letter_path)

    try:
        response = model(COVER_LETTER_PRE_TEXT + cover_letter_text)
    except requests.RequestException as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"AI service error: {str(e)}",
        )

    return response