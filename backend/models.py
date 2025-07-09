from typing import Optional
from datetime import date
from pydantic import BaseModel, EmailStr
from pydantic import BaseModel, Field, EmailStr, validator
from bson import ObjectId
from pydantic import GetJsonSchemaHandler
from pydantic.json_schema import JsonSchemaValue
from pydantic import BaseModel, EmailStr, Field


# ✅ Custom ObjectId type compatible with Pydantic v2
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls, core_schema, handler: GetJsonSchemaHandler
    ) -> JsonSchemaValue:
        return {"type": "string", "format": "objectid"}


# ✅ Student Registration Model
class StudentRegisterModel(BaseModel):
    first_name: str = Field(..., min_length=2)
    last_name: str = Field(..., min_length=2)
    email: EmailStr
    roll_number: str
    password: str = Field(..., min_length=6)
    confirm_password: str
    date_of_birth: date
    gender: str
    student_contact_number: str
    address: str
    state: str
    city: str
    institute_name: str
    course: str
    department: str

    @validator("confirm_password")
    def passwords_match(cls, v, values, **kwargs):
        if "password" in values and v != values["password"]:
            raise ValueError("Passwords do not match")
        return v


# ✅ Login Model
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ✅ Student Profile Model
class Student(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")
    first_name: str
    last_name: str
    email: EmailStr
    roll_number: str
    date_of_birth: str
    gender: str
    student_contact_number: str
    address: str
    state: str
    city: str
    institute_name: str
    course: str
    department: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


# ✅ Alumni Registration Model
class AlumniRegisterModel(BaseModel):
    name: str = Field(..., example="Manavi")
    lastName: str = Field(..., example="Jadhav")
    email: EmailStr = Field(..., example="manavi@example.com")
    contact: str = Field(..., min_length=10, max_length=10, example="9876543210")
    password: str = Field(..., min_length=6, example="strongpassword")
    confirmPassword: str = Field(..., min_length=6, example="strongpassword")
    university: str = Field(..., example="Mumbai University")
    year: Optional[str] = Field(None, example="2023")
    marks: Optional[str] = Field(None, example="85.6")
    department: Optional[str] = Field(None, example="Computer Science")
    company: Optional[str] = Field(None, example="TCS")
    companyLocation: Optional[str] = Field(None, example="Mumbai")
    skills: Optional[str] = Field(None, example="React, Python")
    experience: Optional[str] = Field(None, example="2 years")
    position: Optional[str] = Field(None, example="Software Developer")


# ✅ Event Model
class EventModel(BaseModel):
    title: str
    date: str  # 'YYYY-MM-DD'
    location: str
    description: str
    image: Optional[str] = ""
    category: str
    featured: Optional[bool] = False
    type: str
    status: str


# ✅ Mentorship Offer Model
class MentorshipOffer(BaseModel):
    area_of_expertise: str
    availability: str
    communication_method: str
    additional_info: Optional[str] = None


# ✅ Forum Post Model
class PostCreate(BaseModel):
    title: str
    author: str
    content: str


# ✅ Forum Comment Model
class CommentCreate(BaseModel):
    post_id: str  # MongoDB ObjectId as string
    author: str
    content: str


class JobModel(BaseModel):
    title: str
    company: str
    location: str
    description: str
    posted_by: str
    salary: Optional[str] = None
    deadline: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Admin Login & registration

class AdminUserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    full_name: str
    phone_number: str
    department: str
    role_level: str = Field(default="moderator")

class AdminUserLogin(BaseModel):
    email: EmailStr
    password: str

class admin_Student_display(BaseModel):
    id: str
    name: str
    email: EmailStr
    department: Optional[str]
    status: Optional[str]
    profile: Optional[str]

class admin_Alumni_display(BaseModel):
    id: str
    first_name: Optional[str]
    last_name: Optional[str]
    email: EmailStr
    graduation_year: Optional[int]
    employment_status: Optional[str]
    status: Optional[str]
    profile: Optional[str]

class admin_Admin_display(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: str
    phone_number: str
    department: str
    role_level: str
    status: Optional[str] = "Active"
    profile: Optional[str]
