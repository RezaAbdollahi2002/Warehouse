from enum import Enum
from datetime import time
import models
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date
# Login and Signup
class userLoginAndSignup(BaseModel):
    username: str
    password: str

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
class UserInfoCreate(BaseModel):
      first_name: str
      last_name: str
      dob: Optional[date] = None
      phone_number: Optional[str] = None
      address: Optional[str] = None
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
  
class CompanyGetAll(BaseModel):
    id: int
    name: str
    address: str
    logo: Optional[str] = None
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
