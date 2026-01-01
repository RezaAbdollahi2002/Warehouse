from enum import Enum
from datetime import time
import models
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
from models import PositionExperienceLevel,PositionRemoteType,PositionStatus,Accommodation
# Login and Signup
class userLoginAndSignup(BaseModel):
    username: str
    password: str
class UserRead(BaseModel):
    username:str
class SignupVerify(BaseModel):
    username: str
    token: int

class SignupRequestOTP(BaseModel):
    email: EmailStr
    username: str
    password: str

class SignupComplete(BaseModel):
    email: EmailStr
    otp: str
    
# User Schemas

##### Password
class ChangePasswordEmail(BaseModel):
    username: str
    password: str
class ChangePasswordUserId(BaseModel):
    password: str

# UserInfo
class UserInfoBase(BaseModel):
      first_name: str
      last_name: str
      dob: Optional[date] = None
      phone_number: Optional[str] = None
      address: Optional[str] = None
class UserInfoCreate(UserInfoBase):
    pass
class UserInfoRead(UserInfoBase):
    user_id: int
    id:int
# first name
class UserFirstName(BaseModel):
    first_name: str
# last name
class UserLastName(BaseModel):
    last_name: str
# date of birth
class UserDob(BaseModel):
    dob: date
# phone number
class UserPhoneNumber(BaseModel):
    phone_number: str
# address
class UserAddress(BaseModel):
    address: str

# User remove 
class UserRemove(BaseModel):
    username: str
    password: str

# Company
class CompanyCreate(BaseModel):
    name: str
    address: str
    url: Optional[str] = None
  
class CompanyGetAll(BaseModel):
    id: int
    name: str
    address: str
    logo: Optional[str] = None
    url: Optional[str]
    model_config = {
        "from_attributes": True  
    }
# Company name
class CompanyUpdateName(BaseModel):
    id: int
    name: str
# Company address
class CompanyUpdateAddress(BaseModel):
    id: int
    address: str
# Company logo
class CompanyUpdateLogo(BaseModel):
    id: int
    logo: str
class CompanyUpdateUrl(BaseModel):
    id: int
    url: str
    
# Position
# create
class PositionBase(BaseModel):
    title: str
    job_number: str
    experience_level: PositionExperienceLevel = Accommodation.default
    remote_type: PositionRemoteType = PositionRemoteType.default
    date_posted: Optional[date] = "2025-05-02"
    department: Optional[str] 
    compensation: Optional[float]
    accommodation: Accommodation = Accommodation.default 
    status: PositionStatus = PositionStatus.default
    company_id: int
class PositionCreate(PositionBase):
    pass
class PositionRead(PositionBase):
    id:int
    # model_config = {
    #     "from_attributes": True  
    # }
class PositionTitle(BaseModel):
    company_id:int
    position_id: int
    title: str
class PositionJobNumber(BaseModel):
    company_id:int
    position_id: int
    job_number: str
class PositionExperienceLevel(BaseModel):
    company_id:int
    position_id: int
    experience_level: PositionExperienceLevel = Accommodation.default
class PositionRemoteType(BaseModel):
    company_id:int
    position_id: int
    remote_type: PositionRemoteType = PositionRemoteType.default
class PositionDatePosted(BaseModel):
    company_id:int
    position_id: int
    date_posted: Optional[date] = ""
class PositionDepartment(BaseModel):
    company_id:int
    position_id: int
    department: Optional[str] 
class PositionCompensation(BaseModel):
    company_id:int
    position_id: int
    compensation: Optional[float]
class PositionAccommodation(BaseModel):
    company_id:int
    position_id: int
    accomodation: Accommodation = Accommodation.default 
class PositionStatus(BaseModel):
    company_id:int
    position_id: int
    status: PositionStatus = PositionStatus.default

# Recruiter
class RecruiterBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone_number: Optional[str]
    
class RecruiterCreate(RecruiterBase):
    position_id:int
    pass 
class RecruiterFirstName(BaseModel):
    recruiter_id: int
    first_name:str
class RecruiterLastName(BaseModel):
    recruiter_id: int
    last_name:str
class RecruiterEmail(BaseModel):
    recruiter_id: int
    email:str
class RecruiterPhoneNumber(BaseModel):
    recruiter_id: int
    phone_number:str
class RecruiterRemoveId(BaseModel):
    recruiter_id: int
class RecruitersGetByRecruiterId(BaseModel):
    recruiter_id:int
class RecruitersGetByPositionId(BaseModel):
    postion_id:int
class RecruiterRead(RecruiterBase):
    id: int
    position_id:int
# Bot 
class DocumentationBotBase(BaseModel):
    id: int
