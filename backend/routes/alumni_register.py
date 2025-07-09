from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel, EmailStr
from typing import Optional


router = APIRouter()


# Route for Alumni Registration
@router.post("/api/alumni/register")
async def register_alumni(data: AlumniData):
    if collection.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="User already registered.")
    collection.insert_one(data.dict())
    return {"message": "Alumni registration successful"}
