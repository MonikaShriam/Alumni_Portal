from fastapi import APIRouter
from database import personal_collection
from models import Personal
from fastapi.encoders import jsonable_encoder

router = APIRouter()

@router.post("/personal", summary="Submit personal info")
async def add_personal(data: Personal):
    doc = jsonable_encoder(data)
    res = await personal_collection.insert_one(doc)
    return {"inserted_id": str(res.inserted_id)}
