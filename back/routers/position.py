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