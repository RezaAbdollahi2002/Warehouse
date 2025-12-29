from pydantic import BaseModel, Field
from enum import Enum
from pydantic import BaseModel, EmailStr, constr, ConfigDict
from typing import Optional, List
from datetime import date, datetime
from datetime import time
import models
from typing import Optional

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
    id: int
    password: str

# UserInfo
class UserInfoCreate(BaseModel):
      first_name: str
      last_name: str
      dob: Optional[date] = None
      phone_number: Optional[str] = None
      address: Optional[str] = None
