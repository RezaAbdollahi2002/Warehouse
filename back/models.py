import enum
from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float, Enum
from sqlalchemy.orm import relationship
from database import Base


# -------------------------
# User
# -------------------------
class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(60), unique=True, index=True, nullable=False)
    hashed_password = Column(String(100), nullable=False)

    info = relationship(
        "UserInfo",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan",
    )

    documentation = relationship(
        "Documentation",
        back_populates="user",
        uselist=False,  # one user -> one documentation row
        cascade="all, delete-orphan",
    )

    companies = relationship(
        "Company",
        back_populates="user",
        cascade="all, delete-orphan",
    )


# -------------------------
# User Info (1-1 with User)
# -------------------------
class UserInfo(Base):
    __tablename__ = "user_info"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(50), nullable=True)
    last_name = Column(String(50), nullable=True)
    dob = Column(Date, nullable=True)
    phone_number = Column(String(20), unique=True, index=True, nullable=True)
    address = Column(String(100), nullable=True)

    user_id = Column(Integer, ForeignKey("user.id"), unique=True, nullable=False, index=True)
    user = relationship("User", back_populates="info")


# -------------------------
# Documentation (1-1 with User)
# -------------------------
class Documentation(Base):
    __tablename__ = "documentation"

    id = Column(Integer, primary_key=True, index=True)
    primary_resume = Column(String, nullable=True)
    secondary_resume = Column(String, nullable=True)
    primary_cover_letter = Column(String, nullable=True)
    secondary_cover_letter = Column(String, nullable=True)
    profile_picture = Column(String, nullable=True)

    user_id = Column(Integer, ForeignKey("user.id"), unique=True, nullable=False, index=True)
    user = relationship("User", back_populates="documentation")


# -------------------------
# Company (many per User)
# -------------------------
class Company(Base):
    __tablename__ = "company"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(60), index=True, nullable=False)
    address = Column(String(70), nullable=False)
    logo = Column(String, nullable=True)

    user_id = Column(Integer, ForeignKey("user.id"), nullable=False, index=True)
    user = relationship("User", back_populates="companies")

    positions = relationship(
        "Position",
        back_populates="company",
        cascade="all, delete-orphan",
    )


# -------------------------
# Position (many per Company)
# -------------------------
class PositionStatus(str, enum.Enum):
    not_applied = "draft"
    applied = "submitted"
    interview = "interviewing"
    accepted = "accepted"
    rejected = "rejected"


class PositionRemoteType(str, enum.Enum):
    onsite = "on-site"
    hybrid = "hybrid"
    remote = "remote"


class PositionExperienceLevel(str, enum.Enum):
    full_time = "full_time"
    part_time = "part_time"
    internship = "internship"
    contract = "contract"
    temporary = "temporary"


class Accomodation(str, enum.Enum):
    default = "provided"
    required = "not provided"


class Position(Base):
    __tablename__ = "position"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(50), nullable=False)

    experience_level = Column(Enum(PositionExperienceLevel), nullable=False)
    remote_type = Column(Enum(PositionRemoteType), default=PositionRemoteType.onsite, nullable=False)

    date_posted = Column(Date, nullable=False)
    department = Column(String(50), nullable=True)
    compensation = Column(Float, nullable=False)
    accomodation = Column(Enum(Accomodation),  default=Accomodation.default, nullable=True)

    status = Column(Enum(PositionStatus), default=PositionStatus.not_applied, nullable=False)

    company_id = Column(Integer, ForeignKey("company.id"), nullable=False, index=True)
    company = relationship("Company", back_populates="positions")
