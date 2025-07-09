from fastapi import FastAPI, HTTPException, APIRouter, status, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from auth import hash_password, verify_password
from models import (
    LoginRequest, StudentRegisterModel, Student,
    AlumniRegisterModel, EventModel, MentorshipOffer,
    PostCreate, CommentCreate, JobModel
)
from database import (
    students_collection, alumni_collection, alumni_event_collection,
    mentorship_offer_collection, posts_collection, comments_collection, jobs_collection
)
from passlib.context import CryptContext
from datetime import datetime
from bson import ObjectId
import traceback
from models import AdminUserRegister, AdminUserLogin ,admin_Student_display, admin_Alumni_display
from database import admin_users
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import List



app = FastAPI()
router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Utility to convert ObjectId to string
def fix_id(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

# ========================== STUDENT AUTH ==========================

@app.post("/api/students")
async def register_student(student: StudentRegisterModel):
    student_data = student.dict()
    student_data["date_of_birth"] = datetime.combine(student.date_of_birth, datetime.min.time())
    student_data["password"] = hash_password(student_data["password"])
    student_data.pop("confirm_password", None)

    existing = await students_collection.find_one({"email": student.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    await students_collection.insert_one(student_data)
    return {"message": "Student registered successfully"}

@app.post("/api/login")
async def login_student(login_data: LoginRequest):
    student = await students_collection.find_one({"email": login_data.email})
    if not student or not verify_password(login_data.password, student["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful", "student_id": str(student["_id"])}

@app.get("/api/student/{email}", response_model=Student)
async def get_student_by_email(email: str):
    student = await students_collection.find_one({"email": email})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    student["id"] = str(student.pop("_id"))
    return Student(**student)

@app.put("/api/student/{email}", response_model=Student)
async def update_student_by_email(email: str, updated: Student):
    existing = await students_collection.find_one({"email": email})
    if not existing:
        raise HTTPException(status_code=404, detail="Student not found")
    await students_collection.update_one({"email": email}, {"$set": updated.dict(exclude_unset=True)})
    updated_doc = await students_collection.find_one({"email": email})
    updated_doc["id"] = str(updated_doc.pop("_id"))
    return Student(**updated_doc)

# ========================== ALUMNI REGISTER & LOGIN ==========================

@app.post("/api/alumni/register", status_code=status.HTTP_201_CREATED)
async def register_alumni(data: AlumniRegisterModel):
    existing = await alumni_collection.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered.")
    if data.password != data.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match.")

    alumni_data = data.dict()
    alumni_data["password"] = hash_password(alumni_data["password"])  # ✅ HASH the password
    alumni_data.pop("confirmPassword")

    await alumni_collection.insert_one(alumni_data)
    return {"message": "Alumni registered successfully."}


@app.post("/api/alumni/login")
async def alumni_login(login_data: LoginRequest):
    alumni = await alumni_collection.find_one({"email": login_data.email})
    if not alumni or not verify_password(login_data.password, alumni["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful", "email": alumni["email"]}

@app.get("/api/alumni/profile/{email}")
async def get_profile(email: str):
    alumni = await alumni_collection.find_one({"email": email})
    if not alumni:
        raise HTTPException(status_code=404, detail="Alumni not found")
    alumni["_id"] = str(alumni["_id"])
    return alumni

@app.put("/api/alumni/profile/{email}")
async def update_alumni_profile(email: str, updated: dict):
    existing = await alumni_collection.find_one({"email": email})
    if not existing:
        raise HTTPException(status_code=404, detail="Alumni not found")
    await alumni_collection.update_one({"email": email}, {"$set": updated})
    return {"message": "Profile updated successfully"}


# ========================== EVENTS ==========================

@app.post("/api/events/create")
async def create_event(event: EventModel):
    try:
        event_dict = event.dict()
        event_dict["date"] = datetime.strptime(event.date, "%Y-%m-%d")
        result = await alumni_event_collection.insert_one(event_dict)
        return {"message": "Event created successfully!", "event_id": str(result.inserted_id)}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to create event.")
    
from fastapi.responses import JSONResponse

@app.get("/api/events")
async def get_all_events():
    try:
        events = []
        async for event in alumni_event_collection.find():
            event["id"] = str(event["_id"])
            event.pop("_id", None)
            events.append(event)
        return JSONResponse(content=events)
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Failed to fetch events", "error": str(e)})


# ========================== MENTORSHIP ==========================

@app.post("/mentorship/offer")
async def offer_mentorship(offer: MentorshipOffer):
    try:
        result = await mentorship_offer_collection.insert_one(offer.dict())
        return {"message": "Mentorship offer submitted successfully!", "offer_id": str(result.inserted_id)}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Failed to submit mentorship offer.")

@app.get("/mentorship/offers")
async def get_mentorship_offers():
    offers = []
    async for doc in mentorship_offer_collection.find():
        doc["id"] = str(doc["_id"])
        doc.pop("_id", None)
        offers.append(doc)
    return offers

# ========================== FORUM POSTS & COMMENTS ==========================

@app.post("/posts/")
async def create_post(post: PostCreate):
    post_data = post.dict()
    post_data["date"] = datetime.now().strftime("%Y-%m-%d")
    post_data["likes"] = 0
    result = await posts_collection.insert_one(post_data)
    return {**post_data, "id": str(result.inserted_id), "comments": []}

@app.get("/alumni_forum_posts/")
async def get_all_posts():
    posts = []
    async for post in posts_collection.find():
        post_id = str(post["_id"])
        comments = []
        async for c in comments_collection.find({"post_id": post_id}):
            comments.append({
                "id": str(c["_id"]),
                "author": c["author"],
                "content": c["content"],
                "date": c["date"],
            })
        posts.append({
            "id": post_id,
            "title": post["title"],
            "author": post["author"],
            "content": post["content"],
            "date": post["date"],
            "likes": post.get("likes", 0),
            "comments": comments,
        })
    return posts

@app.post("/alumni_forum_comments/")
async def add_comment(comment: CommentCreate):
    if not ObjectId.is_valid(comment.post_id):
        raise HTTPException(status_code=400, detail="Invalid post ID")
    comment_data = comment.dict()
    comment_data["date"] = datetime.now().strftime("%Y-%m-%d")
    result = await comments_collection.insert_one(comment_data)
    return {**comment_data, "id": str(result.inserted_id)}

# ========================== JOBS ==========================

@app.post("/alumni_jobs")
async def create_job(job: dict = Body(...)):
    try:
        job["posted_date"] = datetime.now().strftime("%Y-%m-%d")
        job["applicants"] = 0
        result = await jobs_collection.insert_one(job)
        job["id"] = str(result.inserted_id)
        return job
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create job")

@app.get("/alumni_jobs")
async def get_jobs():
    jobs = []
    async for job in jobs_collection.find():
        job["id"] = str(job["_id"])
        job.pop("_id", None)
        jobs.append(job)
    return jobs

@app.put("/alumni_jobs/{job_id}")
async def update_job(job_id: str, job: dict = Body(...)):
    result = await jobs_collection.update_one({"_id": ObjectId(job_id)}, {"$set": job})
    if result.modified_count == 1:
        job["id"] = job_id
        return job
    raise HTTPException(status_code=404, detail="Job not found")

@app.delete("/alumni_jobs/{job_id}")
async def delete_job(job_id: str):
    result = await jobs_collection.delete_one({"_id": ObjectId(job_id)})
    if result.deleted_count == 1:
        return {"message": "Job deleted"}
    raise HTTPException(status_code=404, detail="Job not found")

# ========================== Admin Registration & Login ==========================
    
@app.post("/api/admin_register")
async def register_user(user: AdminUserRegister):
    existing_user = await admin_users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = pwd_context.hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_pw

    await admin_users.insert_one(user_dict)
    return {"message": "Registration successful"}

@app.post("/api/admin_login")
async def login_user(credentials: AdminUserLogin):
    user = await admin_users.find_one({"email": credentials.email})
    if not user or not pwd_context.verify(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # ✅ Create access token
    access_token = create_access_token(data={"sub": credentials.email})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Login successful",
        "full_name": user.get("full_name"),
        "email": user.get("email"),
        "role_level": user.get("role_level")
    }


# Accoutn info 


# ✅ JWT and Password Setup
SECRET_KEY = "RdNbJVBj3Dp67ecTw70APisHkYnNe0oTcZVHChlo-dg"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/admin_login")

# ✅ Token Creation
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ✅ Dependency to extract user from token
async def get_current_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if not email:
            raise HTTPException(status_code=401, detail="Invalid token")

        user = await admin_users.find_one({"email": email})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ✅ Profile Route
@app.get("/api/admin_profile")
async def read_admin_profile(current_user: dict = Depends(get_current_admin)):
    return {
        "full_name": current_user.get("full_name"),
        "email": current_user.get("email"),
        "role_level": current_user.get("role_level")
    }

@router.get("/api/admin_profile_full")
async def get_admin_profile_full(current_user: dict = Depends(get_current_admin)):
    return {
        "username": current_user.get("username", "Upload"),
        "email": current_user.get("email", "Upload"),
        "full_name": current_user.get("full_name", "Upload"),
        "phone_number": current_user.get("phone_number", "Upload"),
        "department": current_user.get("department", "Upload"),
        "role_level": current_user.get("role_level", "Upload"),
    }

DEFAULT_PROFILE_BASE = "https://ui-avatars.com/api/?name="
DEFAULT_PROFILE = "https://randomuser.me/api/portraits/lego/3.jpg"

@app.get("/usermanagement/admins")
async def get_admins():
    admins = []
    async for admin in admin_users.find():
        full_name = admin.get("full_name", "")
        profile = admin.get("profile") or f"{DEFAULT_PROFILE_BASE}{'+'.join(full_name.split())}" if full_name else DEFAULT_PROFILE
        admins.append({
            "id": str(admin.get("_id")),
            "username": admin.get("username", ""),
            "email": admin.get("email", ""),
            "full_name": full_name,
            "phone_number": admin.get("phone_number", ""),
            "department": admin.get("department", ""),
            "role_level": admin.get("role_level", "moderator"),
            "status": "Active",  # Static since no status field in Mongo
            "profile": profile
        })
    return admins


@app.get("/usermanagement/alumni", response_model=List[admin_Alumni_display])
async def get_alumni():
    alumni_cursor = alumni_collection.find()
    alumni = []
    async for alumnus in alumni_cursor:
        first = alumnus.get("name", "")
        last = alumnus.get("lastName", "")
        profile = alumnus.get("profile") or f"{DEFAULT_PROFILE_BASE}{first}+{last}" if first else DEFAULT_PROFILE
        alumni.append({
            "id": str(alumnus.get("_id")),
            "first_name": first,
            "last_name": last,
            "email": alumnus.get("email"),
            "graduation_year": int(alumnus.get("year")) if alumnus.get("year") else None,
            "employment_status": alumnus.get("position") or "Unknown",
            "status": alumnus.get("status", "Pending"),
            "profile": profile
        })
    return alumni
@app.get("/usermanagement/students", response_model=List[admin_Student_display])
async def get_students():
    students = []
    async for student in students_collection.find():
        first = student.get("first_name", "")
        last = student.get("last_name", "")
        profile = student.get("profile") or f"{DEFAULT_PROFILE_BASE}{first}+{last}" if first else DEFAULT_PROFILE
        students.append({
            "id": str(student.get("_id")),
            "name": f"{first} {last}".strip(),
            "email": student.get("email"),
            "department": student.get("department", "Unknown"),
            "status": student.get("status", "Pending"),
            "profile": profile
        })
    return students

# student  crud

@app.put("/usermanagement/students/edit/{id}")
async def edit_student(id: str, data: dict = Body(...)):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID")
    result = await students_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.modified_count == 1:
        return {"message": "Student updated successfully"}
    raise HTTPException(status_code=404, detail="Student not found")

@app.delete("/usermanagement/students/delete/{id}")
async def delete_student(id: str):
    result = await students_collection.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 1:
        return {"message": "Student deleted"}
    raise HTTPException(status_code=404, detail="Student not found")

@app.post("/usermanagement/students/approve/{id}")
async def approve_student(id: str):
    result = await students_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": "Approved"}})
    return {"message": "Student approved"} if result.modified_count else HTTPException(status_code=404, detail="Not found")

@app.post("/usermanagement/students/reject/{id}")
async def reject_student(id: str):
    result = await students_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": "Rejected"}})
    return {"message": "Student rejected"} if result.modified_count else HTTPException(status_code=404, detail="Not found")
# alumni crud
@app.put("/usermanagement/alumni/edit/{id}")
async def edit_alumni(id: str, data: dict = Body(...)):
    result = await alumni_collection.update_one({"_id": ObjectId(id)}, {"$set": data})
    return {"message": "Alumni updated"} if result.modified_count else HTTPException(status_code=404, detail="Not found")

@app.delete("/usermanagement/alumni/delete/{id}")
async def delete_alumni(id: str):
    result = await alumni_collection.delete_one({"_id": ObjectId(id)})
    return {"message": "Alumni deleted"} if result.deleted_count else HTTPException(status_code=404, detail="Not found")
@app.post("/usermanagement/alumni/approve/{id}")
async def approve_alumni(id: str):
    result = await alumni_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": "Approved"}})
    return {"message": "Alumni approved"} if result.modified_count else HTTPException(status_code=404, detail="Not found")

@app.post("/usermanagement/alumni/reject/{id}")
async def reject_alumni(id: str):
    result = await alumni_collection.update_one({"_id": ObjectId(id)}, {"$set": {"status": "Rejected"}})
    return {"message": "Alumni rejected"} if result.modified_count else HTTPException(status_code=404, detail="Not found")
# admin crud
@app.put("/usermanagement/admins/edit/{id}")
async def edit_admin(id: str, data: dict = Body(...)):
    result = await admin_users.update_one({"_id": ObjectId(id)}, {"$set": data})
    return {"message": "Admin updated"} if result.modified_count else HTTPException(status_code=404, detail="Not found")

@app.delete("/usermanagement/admins/delete/{id}")
async def delete_admin(id: str):
    result = await admin_users.delete_one({"_id": ObjectId(id)})
    return {"message": "Admin deleted"} if result.deleted_count else HTTPException(status_code=404, detail="Not found")

@app.post("/usermanagement/admins/approve/{id}")
async def approve_admin(id: str):
    result = await admin_users.update_one({"_id": ObjectId(id)}, {"$set": {"status": "Approved"}})
    return {"message": "Admin approved"} if result.modified_count else HTTPException(status_code=404, detail="Not found")

@app.post("/usermanagement/admins/reject/{id}")
async def reject_admin(id: str):
    result = await admin_users.update_one({"_id": ObjectId(id)}, {"$set": {"status": "Rejected"}})
    return {"message": "Admin rejected"} if result.modified_count else HTTPException(status_code=404, detail="Not found")
