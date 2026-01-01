import os
import requests
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from models import User, Company, Position
from auth import get_current_user, get_db
import schemas
from .document_reader import read_document
from bot_config import model
from typing import Optional
from .scrape_website import fetch_website_text

router = APIRouter(prefix="/bot", tags=["Company_Bot"])

def position_prompt_helper(name:str,info:str,position:str,request:str)->str:
    return f"""You are a professional in summarizing information. 
               I want you to explore {name}, and provide 
               me with the most import information about {name}.
               Please, let me know everything that I 
               need to know about {position}. {info}. {request}
            """

def company_prompt_helper(name:str,info:str,request:str)->str:
    return f"""You are a professional in summarizing information. 
               I want you to explore {name}, and provide 
               me with the most import information about {name}. {info}. {request} 
            """

# Position prompt 
@router.post("/position/suggestions")
def create_suggestions(
    company_id: int,
    position_id: int,
    prompt: Optional[str] = "",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Fetch company + position in ONE query
    result = (
        db.query(Company, Position)
        .join(Position, Position.company_id == Company.id)
        .filter(
            Company.id == company_id,
            Position.id == position_id,
            Company.user_id == current_user.id,
        )
        .first()
    )

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company or position not found.",
        )

    company, position = result

    if not company.url:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company URL was not found.",
        )

    if not company.name:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Company name was not found.",
        )
    
    company_info = fetch_website_text(company.url)
    if not company_info:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT,detail="No text was scraped.")

    request_prompt = position_prompt_helper(
        company.name,
        company_info,
        position.title,
        prompt,
    )

    if not request_prompt:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate suggestion.",
        )

    suggestion = model(request_prompt)
    if not suggestion:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate suggestion.",
        )
    return suggestion
# Company prompt
@router.post("/company/suggestions")
def create_suggestions(company_id: int,
                       prompt:Optional[str] = "", 
                       current_user:User=Depends(get_current_user),
                       db:Session=Depends(get_db)):
    
    if not company_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="Empty compant id.")
    company = db.query(Company).filter(Company.id == company_id, Company.user_id == current_user.id).first()
    url = company.url
    if not url:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Url was not found.")
    name = company.name
    if not name:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Name was not found.")
    
    company_info = fetch_website_text(company.url)
    if not company_info:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT,detail="No text was scraped.")
    company_info = fetch_website_text(company.url)
    if not company_info:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT,detail="No text was scraped.")
    request_prompt = company_prompt_helper(name,company_info, prompt)
    if not request_prompt:
        raise HTTPException(status_code=status.HTTP_204_NO_CONTENT, detail="No response was created.")
    
    suggestion = model(request_prompt)
    if not suggestion:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to generate suggestion.",
        )
    
    return suggestion